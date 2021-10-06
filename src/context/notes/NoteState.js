import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) =>{
  const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      //Get All Note
      const getNotes= async()=>{//this will be pass to the AddNote.js  
        // console.log("adding a new note");
          //Api call
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NjkwODFlYTJhZmUzYmZiODQ1MzI4In0sImlhdCI6MTYzMzA2MzA3M30.iaNdWYzyQk-yfcVKnh84o1wNfQIKhDShsmnxjPGgGX4'
            },
          });
          const json = await response.json()
          console.log(json);
          setNotes(json);
      }     
      //Add Note
      const addNote= async(title, description, tag)=>{//this will be pass to the AddNote.js  
        // console.log("adding a new note");
          //API call
          const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NjkwODFlYTJhZmUzYmZiODQ1MzI4In0sImlhdCI6MTYzMzA2MzA3M30.iaNdWYzyQk-yfcVKnh84o1wNfQIKhDShsmnxjPGgGX4'
            },
        
            body: JSON.stringify({title, description, tag})
          });
          // const json = await response.json();
          // console.log(json);

        const note=        
              {
            "_id": "615690caea2afe3bfb84537c2d",
            "user": "61569081ea2afe3bfb845328",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-10-01T04:38:34.604Z",
            "__v": 0
          };
          setNotes(notes.concat(note))
      }
      //Edit Note
      const editNote= async(id, title, description, tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MTYzNjk4Y2QyMWNiYTcwNjgzMTVkIn0sImlhdCI6MTYzMjcyMzg0NH0.kjA36C9Prc0WpOTNVDv71Nn6rcfvBK3fiVxCYtB6YHo'
          },
      
          body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
      

        //this for loop is for to indentify index of the note to be edited.
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
          
        }
      }

      //Delete Note
      const deleteNote= async(id)=>{
                //API call
                const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NjkwODFlYTJhZmUzYmZiODQ1MzI4In0sImlhdCI6MTYzMzA2MzA3M30.iaNdWYzyQk-yfcVKnh84o1wNfQIKhDShsmnxjPGgGX4'
                  },       
                });
                const json = response.json();
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