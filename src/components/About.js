import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    const a = useContext(NoteContext)
    return (
        <div>
            This is about {a.state.name} and he is from {a.state.class}
            {/* because we put our state inside a state, that's why we have to write like this. */}
        </div>
    )
}

export default About
