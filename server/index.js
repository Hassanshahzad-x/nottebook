import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/auth.js'
import notes from './routes/notes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
const URL = "mongodb+srv://hassanshahzad:hassan3513@atlascluster.0yuzwfw.mongodb.net/test"
const port = 3001

mongoose.set("strictQuery", false)

mongoose.connect(URL, () => {
   console.log("Database connected")
})

app.use('/api/auth', auth)
app.use('/api/notes', notes)

app.listen(port, () => {
   console.log(`Server connected at http://localhost:${port}`)
})