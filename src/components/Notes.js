import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext)
    const {notes, setNotes} = context;//notes and setnotes ke andar context ke notes aa jayenge
  return (
    <div className="row my-3">
      <h2>Your Saved Notes</h2>
      {notes.map((note) => {
        return <NoteItem note={note} key = {note._id}/>//passing the props to the note item
      })}
    </div>
  );
};

export default Notes;
