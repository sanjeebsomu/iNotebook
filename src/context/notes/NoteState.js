import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) =>{
  const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      //Get All Note
      const getNotes= async()=>{//this will be pass to the AddNote.js  
          //Api call
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const json = await response.json()
          setNotes(json);
      }     
      //Add Note
      const addNote= async(title, description, tag)=>{//this will be pass to the AddNote.js  
          //API call
          const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
        
            body: JSON.stringify({title, description, tag})
          });
          const note = await response.json();
          setNotes(notes.concat(note))
      }
      //Edit Note
      const editNote= async(id, title, description, tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
      
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();  
        console.log(json);    
        let newNotes = JSON.parse(JSON.stringify(notes))//deep copying, because simple js object can't change its state in react (frontend)
        //this for loop is for to indentify index of the note to be edited.
        for (let index = 0; index < newNotes.length; index++) {
          const element = notes[index];
          if(element._id===id){
            newNotes[index].title=title;//here we can't use element.title, because element is a constant variable
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setNotes(newNotes)
      }

      //Delete Note
      const deleteNote= async(id)=>{
                //API call
                const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                  },       
                });
                const json = await response.json();
                console.log(json);
        const newNote = notes.filter((note)=>{return note._id !== id})//which id is not same as the provided id, store them all.
        setNotes(newNote)
      }

    return(
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;