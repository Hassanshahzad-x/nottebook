import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {
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
      {
         "_id": "63e7ca321fe1c552d7affc2a",
         "user": "63e520016cd62ef8a5505e01",
         "title": "Note 3",
         "description": "feeling energetic",
         "tag": "professional",
         "date": "2023-02-11T17:02:42.084Z",
         "__v": 0
      }
   ]

   const [notes, setNotes] = useState(notesinitial)

   return (
      <noteContext.Provider value={{ notes, setNotes }}>{props.children}</noteContext.Provider>
   )
}

export default NoteState