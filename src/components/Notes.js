import React, {useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import {useHistory} from 'react-router'

const Notes = (props) => {
    const context = useContext(NoteContext)
    const {notes, getNotes, editNote} = context;//notes and getNotes ke andar context ke notes aa jayenge{destrauctering}
    let history = useHistory()
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes()
      }
      else{
        history.push('/login')
      }
      // eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""})

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote=(currentNote)=>{
      ref.current.click()
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
      //update karisarila pare ya value sabu note bhitaraku jiba, and note bhitare jou etitle, edesc, etag achhi, se sabu modals ra value bhitaraku jiba.
      
    }

    const onChange=(e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  const handleClick=(e)=>{
      e.preventDefault(); 
      editNote(note.id, note.etitle, note.edescription, note.etag);//edited title, description, tag
      refClose.current.click();
      props.showAlert('This Note has been Updated', 'success')
    }
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
          <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
            Edit Note
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label"> Title</label>
                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription"  onChange={onChange} minLength={5} required/>
                </div> 
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" value={note.etag} className="form-control" id="etag" name="etag"  onChange={onChange}/>
                </div>
             </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button></div>
          </div>
        </div>
      </div>
    <div className="row my-3">
      <h2>Your Saved Notes</h2>
      <div className="container">
      {notes.length ===0 && 'No Notes To Display'}</div>
      {notes.map((note) => {
        return <NoteItem note={note} updateNote={updateNote} key = {note._id} showAlert={props.showAlert}/>//passing the props to the note item
      })}
    </div>
    </>
  );
};

export default Notes;
