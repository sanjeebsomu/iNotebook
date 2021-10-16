import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';


const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context;//destructering delete note function from context
    const {note, updateNote}=props;//Let's note is equal to props(what we recive from the props). destracturing(reciving notes as props and store it into note variable
    return (
        <div className="col-md-3">
            <div className="card my-3">
            <div className="card-body">

                <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                {/* here we dont have to do {props.note.title}, just for we declared props into note variable, we dont need to write props here */}
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert('This Note has been Deleted', 'success')}}></i>
                {/* i put arrow function inside onclick delete, because i wanna pass a argurment(id) */}
                <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
            </div>
        </div>
    )
}

export default NoteItem
