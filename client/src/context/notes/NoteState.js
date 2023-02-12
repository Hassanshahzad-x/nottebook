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
            'auth-token': localStorage.getItem("token")
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
            'auth-token': localStorage.getItem("token")
         },
         body: JSON.stringify(data)
      });

      const note = await response.json()
      setNotes(notes.concat(note))
   }

   const deleteNote = async (id) => {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
         }
      });
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
   }

   const editNote = async (id, title, description, tag) => {
      const data = { id, title, description, tag };
      await fetch(`${host}/api/notes/updatenote/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
         },
         body: JSON.stringify(data)
      })

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