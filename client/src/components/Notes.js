import React, { useContext } from 'react'
import Note from "./Note"
import noteContext from '../context/notes/noteContext'

const Notes = () => {
   const context = useContext(noteContext)
   const { notes, setNotes } = context
   return (
      <div className='row my-3'>
         <h1>Your nottes</h1>
         {notes.map((note) => {
            return <Note note={note} key={note._id} />
         })}
      </div>
   )
}

export default Notes