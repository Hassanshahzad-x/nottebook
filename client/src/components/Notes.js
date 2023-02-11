import React, { useContext, useEffect } from 'react'
import Note from "./Note"
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'

const Notes = () => {
   const context = useContext(noteContext)
   const { notes, getNotes } = context

   useEffect(() => {
      getNotes()
   }, [])

   return (
      <div>
         <AddNote />
         <div className='row my-3'>
            <h1>your nottes</h1>
            {notes.map((note) => {
               return <Note note={note} key={note._id} />
            })}
         </div>
      </div>
   )
}

export default Notes