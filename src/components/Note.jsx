import React, { useEffect, useState } from 'react'
import { useNoteContext } from '../context/NotesContext'
import NoteItem from './NoteItem'

export default function Note() {
    const { notes, addNote, getNote, deleteNote, updateNote } = useNoteContext();
    const [note, setNote] = useState('')
    const [editBtn, setEditBtn] = useState(false)
    const [editedItem, setEditedItem] = useState(null);

    // console.log(notes)
    const submitHandler = (e) => {
        e.preventDefault()
        if (note == '') {
            alert('Kindly Add Note !!!');
            return false
        }
        else if (note && editBtn) {

            const contentBody = {
                "content": `${note}`
            }
            // console.log(contentBody)
            // setNotes(notes.map((elm) => {
            //     if (elm.id === editedItem) {
            //         return { ...elm, content: note }
            //     }
            //     return elm
            // }))
            updateNote(editedItem, contentBody)
            setNote('')
            setEditBtn(false)


        } else {
            const contentBody = {
                "content": `${note}`
            }
            addNote(contentBody)
            setNote('');
        }

    }
    const editNote = (id, index) => {
        let editItem = notes.find((elm) => {
            return elm._id === id
        })
        setNote(editItem.content)
        setEditBtn(true)
        // console.log(id)
        setEditedItem(id);
    }
    const deleteNotes = (id) => {
        deleteNote(id)
        // console.log(id)
    }
    useEffect(() => {
        getNote();
    }, [notes])
    return (
        <>
            <div className="noteContainer">

                <p className='heading'>Todo List</p>

                <div className="search">
                    <form onSubmit={submitHandler}>
                        <input type="text" name="noteInp" id="noteInp" className='inp' placeholder='Add Notes' style={{ width: '100%' }} value={note} onChange={(e) => {
                            setNote(e.target.value)
                        }} />

                        {
                            editBtn ? <input type='submit' className='inp' id="addBtn" value={'Edit'} /> : <input type='submit' className='inp' id="addBtn" value={'Add'} />
                        }

                    </form>
                </div>

                {
                    notes.map((elm, index) => {
                        // console.log(elm)
                        return <NoteItem note={{ elm, index }} key={elm._id} editNote={editNote} deleteNote={deleteNotes} />
                    })
                }


            </div>
        </>
    )
}
