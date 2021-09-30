import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) =>{
    const s1 =  {
        "name":"Sanjeeb",
        "class":"3a"
    }
    const [state, setstate] = useState(s1)
    const update=()=>{
        setTimeout(() => {
            setstate({
                "name":"Somu",
                "class":"1a"
            })
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;