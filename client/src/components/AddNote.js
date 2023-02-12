import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
   const context = useContext(noteContext)
   const { addNote } = context
   const [note, setNote] = useState({ title: "", description: "", tag: "" })

   const handleClick = (e) => {
      e.preventDefault()
      addNote(note.title, note.description, note.tag)
      setNote({ title: "", description: "", tag: "" })
   }
   const handleChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })

   }

   return (
      <div>
         <div className='container my-3'>
            <h1>add a notte</h1>
            <form className='my-3'>
               <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={handleChange} value={note.title} />
               </div>
               <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name='description' onChange={handleChange} minLength={5} required value={note.description} />
               </div>
               <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange} minLength={5} required value={note.tag} />
               </div>
               <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
         </div>
      </div>
   )
}

export default AddNote
