import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {
   const host = "http://localhost:3001"
   const notesinitial = [
      {
         "_id": "63e5371433a64d0bf242a601",
         "user": "63e520016cd62ef8a5505e01",
         "title": "Note 1",
         "description": "Hey wassup",
         "tag": "personal",
         "date": "2023-02-09T18:10:28.168Z",
         "__v": 0
      },
      {
         "_id": "63e7ca201fe1c552d7affc28",
         "user": "63e520016cd62ef8a5505e01",
         "title": "Note 2",
         "description": "feeling sleepy",
         "tag": "personal",
         "date": "2023-02-11T17:02:24.872Z",
         "__v": 0
      },

   ]

   const [notes, setNotes] = useState(notesinitial)

   const addNote = async (title, description, tag) => {

      const response = await fetch(`${host}/api/notes/addnote`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNTIwMDE2Y2Q2MmVmOGE1NTA1ZTAxIn0sImlhdCI6MTY3NTk2MjE1NX0.yywIJU21KGn0V2ibo6qmKrsqvsiibULmtAGQTFqeQwo"
         },
         body: JSON.stringify(title, description, tag)
      });
      const json = response.json();

      const note = {
         "_id": "63e7ca321fe1c552d7affc2a",
         "user": "63e520016cd62ef8a5505e01",
         "title": title,
         "description": description,
         "tag": tag,
         "date": "2023-02-11T17:02:42.084Z",
         "__v": 0
      }
      setNotes(notes.concat(note))
   }

   const deleteNote = (id) => {
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
   }

   const editNote = async (id, title, description, tag) => {

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNTIwMDE2Y2Q2MmVmOGE1NTA1ZTAxIn0sImlhdCI6MTY3NTk2MjE1NX0.yywIJU21KGn0V2ibo6qmKrsqvsiibULmtAGQTFqeQwo"
         },
         body: JSON.stringify(id, title, description, tag)
      });
      const json = response.json();

      for (let index = 0; index < notes.length; index++) {
         const element = notes[index]
         if (element._id === id) {
            element.title = title
            element.description = description
            element.tag = tag
         }
      }
   }

   return (
      <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>{props.children}</noteContext.Provider>
   )
}

export default NoteState