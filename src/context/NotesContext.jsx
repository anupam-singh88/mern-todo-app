import React, { createContext, useContext, useState } from 'react'

const NoteContext = createContext(null);

export const useNoteContext = () => {
    return useContext(NoteContext)
}


export const NotesProvider = (props) => {
    // const host = "http://localhost:3000";
    const host = "https://mern-todo-bacnkend.onrender.com";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    const [loading, setLoading] = useState(false);

    const getNote = async () => {
        setLoading(true)
        const response = await fetch(`${host}/getnote`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json();
        setLoading(false)
        setNotes(json);
        console.log('render')
    }

    const addNote = async (content) => {
        setLoading(true)
        const response = await fetch(`${host}/savenote`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(content)
        })
        const note = await response.json();
        setLoading(false)
        setNotes(notes.concat(note));

    }
    const updateNote = async (id, content) => {
        setLoading(true)
        const response = await fetch(`${host}/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(content)
        })
        await response.json();
        setLoading(false)
        getNote()
    }
    const deleteNote = async (id) => {
        setLoading(true)
        const response = await fetch(`${host}/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        })
        // const json = response.json();
        // const newNotes = notes.filter((note) => {
        //     return note._id !== id;
        // });
        // setNotes(newNotes);
        setLoading(false)
        getNote()

    }


    return (
        <NoteContext.Provider value={{ loading, notes, addNote, getNote, deleteNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}


