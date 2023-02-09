import express from "express"

const router = express.Router()

router.get('/', (req, res) => {
   obj = {
      a: "thios",
      number: 34
   }
   res.json(obj)
})

export default router