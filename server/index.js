import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/auth.js'
import notes from './routes/notes.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

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