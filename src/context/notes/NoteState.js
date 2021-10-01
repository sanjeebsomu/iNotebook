import NoteContext from "./NoteContext";

const NoteState = (props) =>{
    const s1 =  {
        "name":"Sanjeeb",
        "class":"3a"
    }
    return(
        <NoteContext.Provider value={{s1}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;