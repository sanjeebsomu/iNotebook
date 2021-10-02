import React from 'react'

const NoteItem = (props) => {
    const {note}=props;//Let's note is equal to props(what we recive from the props). destracturing(reciving notes as props and store it into note variable
    return (
        <div className="col-md-3">
            <div className="card my-3">
            <div className="card-body">

                <div className="d-flex align-items-center justify-content-center">
                <h5 className="card-title">{note.title}</h5>
                {/* here we have to do {props.note.title}, just for we declared props into note variable, we dont need to write props here */}
                <i className="far fa-trash-alt mx-2"></i>
                <i className="far fa-edit mx-2"></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
            </div>
        </div>
    )
}

export default NoteItem
