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

    const getNote = async () => {
        const response = await fetch(`${host}/getnote`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json();
        setNotes(json);
    }

    const addNote = async (content) => {
        // console.log(content)
        const response = await fetch(`${host}/savenote`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(content)
        })
        const note = await response.json();
        // console.log(json)
        setNotes(notes.concat(note));

    }
    const updateNote = async (id, content) => {

        const response = await fetch(`${host}/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(content)
        })
        const json = await response.json();
        // console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes));
        setNotes(newNotes);
    }
    const deleteNote = async (id) => {
        // console.log(content)
        const response = await fetch(`${host}/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = response.json();
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);

    }


    return (
        <NoteContext.Provider value={{ notes, addNote, getNote, deleteNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}


