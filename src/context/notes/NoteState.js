import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "615690b9ea2afe3bfb84532b",
          "user": "61569081ea2afe3bfb845328",
          "title": "Ritika mishra",
          "description": "I am a dancer",
          "tag": "profession",
          "date": "2021-10-01T04:38:17.020Z",
          "__v": 0
        },
        {
          "_id": "615690caea2afe3bfb84532d",
          "user": "61569081ea2afe3bfb845328",
          "title": "Ritika mishra",
          "description": "I am a dancer and a markering expert",
          "tag": "profession",
          "date": "2021-10-01T04:38:34.604Z",
          "__v": 0
        },
                {
          "_id": "615690caea2afe3bfb84532d",
          "user": "61569081ea2afe3bfb845328",
          "title": "Ritika mishra",
          "description": "I am a dancer and a markering expert",
          "tag": "profession",
          "date": "2021-10-01T04:38:34.604Z",
          "__v": 0
        },
                {
          "_id": "615690caea2afe3bfb84532d",
          "user": "61569081ea2afe3bfb845328",
          "title": "Ritika mishra",
          "description": "I am a dancer and a markering expert",
          "tag": "profession",
          "date": "2021-10-01T04:38:34.604Z",
          "__v": 0
        },
                {
          "_id": "615690caea2afe3bfb84532d",
          "user": "61569081ea2afe3bfb845328",
          "title": "Ritika mishra",
          "description": "I am a dancer and a markering expert",
          "tag": "profession",
          "date": "2021-10-01T04:38:34.604Z",
          "__v": 0
        },
                {
          "_id": "615690caea2afe3bfb84532d",
          "user": "61569081ea2afe3bfb845328",
          "title": "Ritika mishra",
          "description": "I am a dancer and a markering expert",
          "tag": "profession",
          "date": "2021-10-01T04:38:34.604Z",
          "__v": 0
        },
                {
          "_id": "615690caea2afe3bfb84532d",
          "user": "61569081ea2afe3bfb845328",
          "title": "Ritika mishra",
          "description": "I am a dancer and a markering expert",
          "tag": "profession",
          "date": "2021-10-01T04:38:34.604Z",
          "__v": 0
        },
                {
          "_id": "615690caea2afe3bfb84532d",
          "user": "61569081ea2afe3bfb845328",
          "title": "Ritika mishra",
          "description": "I am a dancer and a markering expert",
          "tag": "profession",
          "date": "2021-10-01T04:38:34.604Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;