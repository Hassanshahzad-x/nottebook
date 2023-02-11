import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {
   const host = "http://localhost:3001"
   const notesinitial = []
   const [notes, setNotes] = useState(notesinitial)

   const getNotes = async () => {

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNTIwMDE2Y2Q2MmVmOGE1NTA1ZTAxIn0sImlhdCI6MTY3NTk2MjE1NX0.yywIJU21KGn0V2ibo6qmKrsqvsiibULmtAGQTFqeQwo"
         }
      });
      const json = await response.json();
      setNotes(json)
   }

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
   }

   const deleteNote = (id) => {
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
   }

   const editNote = async (id, title, description, tag) => {

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
         method: 'PUT',
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
      <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</noteContext.Provider>
   )
}

export default NoteState