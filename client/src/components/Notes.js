import React, { useContext, useEffect, useRef, useState } from 'react'
import Note from "./Note"
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'

const Notes = () => {
   const context = useContext(noteContext)
   const { notes, getNotes, editNote } = context
   const ref = useRef(null)
   const refClose = useRef(null)
   const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

   const handleClick = (e) => {
      e.preventDefault()
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click()
   }
   const handleChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
   }
   useEffect(() => {
      getNotes()
      // eslint-disable-next-line
   }, [])

   const updateNote = (currentNote) => {
      ref.current.click()
      setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
   }

   return (
      <div>
         <AddNote />
         <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
         </button>

         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">

                  <div className="modal-header">
                     <h1 className="modal-title fs-5" id="exampleModalLabel">edit notte</h1>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body">
                     <form className='my-3'>
                        <div className="mb-3">
                           <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                           <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={handleChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                           <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                           <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={handleChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                           <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                           <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleChange} minLength={1} required />
                        </div>

                     </form>
                  </div>

                  <div className="modal-footer">
                     <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">update notte</button>
                  </div>
               </div>
            </div>
         </div>

         <div className='container row my-3'>
            <h1>your nottes</h1>
            <div className='container'>
               {notes.length === 0 && 'no nottes to display'}
            </div>
            {notes.map((note) => {
               return <Note note={note} updateNote={updateNote} key={note._id} />
            })}
         </div>
      </div>
   )
}

export default Notes