import React from 'react'

export default function NoteItem(props) {
    // console.log(props)
    return (
        <>
            <div className="notes">
                <p className="noteTitle">{props.note.elm.content}</p>
                <i className="fa-regular fa-pen-to-square fa-2xs" style={{ color: "#46c22e", marginRight: '15px', cursor: "pointer" }}
                    onClick={() => {
                        // let noteValue = document.getElementsByClassName('noteTitle').innerText
                        // console.log(props.note.index)
                        props.editNote(props.note.elm._id, props.note.index)
                        // console.log(props.note.id)
                    }} ></i>
                <i className="fa-solid fa-trash fa-2xs" style={{ color: "red", cursor: "pointer" }} onClick={() => {
                    props.deleteNote(props.note.elm._id)
                    // console.log(props.note.id)

                }}></i>
            </div>
        </>
    )
}
