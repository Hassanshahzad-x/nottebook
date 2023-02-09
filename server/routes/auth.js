import express from "express"
import User from '../models/User.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"
import fetchuser from "../middleware/fetchuser.js"


const router = express.Router()
const JWT_SECRET = "hassanshahzad3513"

router.post('/createuser',
   [body("name", "Enter a valid name").isLength({ min: 3 }),
   body("email", "Enter a valid email").isEmail(),
   body("password", "Enter correct password").isLength({ min: 5 })],
   async (req, res) => {
      const error = validationResult(req)
      if (!error.isEmpty()) {
         return res.status(400).json({ error: error.array() })
      }

      try {
         let user = await User.findOne({ email: req.body.email })
         if (user) {
            res.json({ error: "Please enter a unique email", message: error.message })
         }
         const salt = await bcrypt.genSalt(10)
         var securedPassword = await bcrypt.hash(req.body.password, salt)
         user = await User.create({
            name: req.body.name,
            password: securedPassword,
            email: req.body.email
         })
         const data = {
            user: {
               id: user.id
            }
         }
         const jwtData = jwt.sign(data, JWT_SECRET)

         res.json({ jwtData })
      } catch (error) {
         console.log(error.message)
         res.status(500).send("ERROR")
      }
   })


router.post('/login',
   body("email", "Enter a valid email").isEmail(),
   body("password", "Enter correct password").isLength({ min: 4 }),
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: "Enter correct email or password" }).status(500)
      }

      const { email, password } = req.body

      try {
         let user = await User.findOne({ email })
         if (!user) {
            return res.status(400).json({ error: "No user" })
         }

         const comparePassword = await bcrypt.compare(password, user.password)
         if (!comparePassword) {
            return res.status(400).json({ errors: "Try to login with correct password" })
         }

         const data = {
            user: {
               id: user.id
            }
         }

         const authToken = jwt.sign(data, JWT_SECRET)
         res.json({ authToken })

      } catch (error) {
         console.log(error.message)
         res.status(500).send("error")
      }
   })

router.post('/getuser', fetchuser, async (req, res) => {

   try {
      let userId = req.user.id
      let user = await User.findById(userId).select("-password")
      res.send(user)
   } catch (error) {
      console.log(error.message)
      res.status(500).send("error")
   }
})

export default router
