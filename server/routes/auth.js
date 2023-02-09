import express from "express"
import User from '../models/User.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"


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
         //console.log(jwtData)

         res.json({ jwtData })
      } catch (error) {
         console.log(error.message)
         res.status(500).send("ERROR")
      }
   })

export default router
