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
      const data = { title, description, tag }
      const response = await fetch(`${host}/api/notes/addnote`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNTIwMDE2Y2Q2MmVmOGE1NTA1ZTAxIn0sImlhdCI6MTY3NTk2MjE1NX0.yywIJU21KGn0V2ibo6qmKrsqvsiibULmtAGQTFqeQwo"
         },
         body: JSON.stringify(data)
      });

      const note = {
         "_id": "63e7e746d6571664dc687f60",
         "user": "63e520016cd62ef8a5505e01",
         "title": title,
         "description": description,
         "tag": tag,
         "date": "2023-02-11T19:06:46.680Z",
         "__v": 0
      }
      setNotes(notes.concat(note))
   }

   const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNTIwMDE2Y2Q2MmVmOGE1NTA1ZTAxIn0sImlhdCI6MTY3NTk2MjE1NX0.yywIJU21KGn0V2ibo6qmKrsqvsiibULmtAGQTFqeQwo"
         }
      });
      const json = await response.json();
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
   }

   const editNote = async (id, title, description, tag) => {
      const data = { id, title, description, tag };
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNTIwMDE2Y2Q2MmVmOGE1NTA1ZTAxIn0sImlhdCI6MTY3NTk2MjE1NX0.yywIJU21KGn0V2ibo6qmKrsqvsiibULmtAGQTFqeQwo"
         },
         body: JSON.stringify(data)
      })

      const json = await response.json()
      try {
         let newNotes = JSON.parse(JSON.stringify(notes))
         for (let index = 0; index < notes.length; index++) {
            const element = notes[index]
            if (element._id === id) {
               newNotes[index].title = title
               newNotes[index].description = description
               newNotes[index].tag = tag
               break
            }
         }
         setNotes(newNotes)
      }
      catch (error) {
         console.log('Error parsing JSON:', error);
      }

   }

   return (
      <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</noteContext.Provider>
   )
}

export default NoteState