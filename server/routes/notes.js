import express from "express"
import Notes from "../models/Notes.js"
import fetchuser from "../middleware/fetchuser.js"
import { body, validationResult } from "express-validator"

const router = express.Router()

router.get('/fetchallnotes', fetchuser, async (req, res) => {
   const notes = await Notes.find({ user: req.user.id })
   res.json(notes)
})

router.post('/addnote', fetchuser,
   [body("title", "Enter a valid title").isLength({ min: 3 }),
   body("description", "Enter a valid description").isLength({ min: 5 })],
   async (req, res) => {
      try {
         const { title, description, tag } = req.body
         const errors = validationResult(req)

         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Enter correct properties" })
         }

         const note = new Notes({
            title, description, tag, user: req.user.id
         })

         const savedNote = await note.save()
         res.json(savedNote)
      } catch (error) {
         console.log(error.message)
         res.status(500).send("error")
      }
   })

router.put('/updatenote/:id', fetchuser,
   [body("title", "Enter a valid title").isLength({ min: 3 }),
   body("description", "Enter a valid description").isLength({ min: 5 })],
   async (req, res) => {
      try {
         const { title, description, tag } = req.body
         const newNote = {}
         if (title) { newNote.title = title }
         if (description) { newNote.description = description }
         if (tag) { newNote.tag = tag }

         let note = await Notes.findById(req.params.id)
         if (!note) {
            res.status(404).send("Note not found")
         }

         if (note.user.toString() != req.user.id) {
            return res.status(401).json("Access restricted")
         }

         note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
         res.json({ note })

      } catch (error) {
         console.log(error.message)
         res.status(500).send("error")
      }
   })

router.delete('/deletenote/:id', fetchuser,
   [body("title", "Enter a valid title").isLength({ min: 3 }),
   body("description", "Enter a valid description").isLength({ min: 5 })],
   async (req, res) => {
      try {
         let note = await Notes.findById(req.params.id)
         if (!note) {
            res.status(404).send("Note not found")
         }

         if (note.user.toString() != req.user.id) {
            return res.status(401).json("Access restricted")
         }

         note = await Notes.findByIdAndDelete(req.params.id)
         res.json({ "Success": "Deleted" })

      } catch (error) {
         console.log(error.message)
         res.status(500).send("error")
      }
   })


export default router