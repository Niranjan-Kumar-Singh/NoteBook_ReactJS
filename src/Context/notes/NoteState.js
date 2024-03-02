import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes for a user
  const getNotes = async() => {
    // API call to save the new task in database
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNjlmMDAzM2QxYWU4OTYwODU2YTM2In0sImlhdCI6MTcwNzUxNTY4NH0.TswiVPRnRUPCS7joFc9eUe9GfV-ChXpMwr7n0ukfKgQ",
      },
    });
    
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async(title, description, tag) => {
    // API call to save the new task in database
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNjlmMDAzM2QxYWU4OTYwODU2YTM2In0sImlhdCI6MTcwNzUxNTY4NH0.TswiVPRnRUPCS7joFc9eUe9GfV-ChXpMwr7n0ukfKgQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async(id) => {
    // API call to save the new task in database
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNjlmMDAzM2QxYWU4OTYwODU2YTM2In0sImlhdCI6MTcwNzUxNTY4NH0.TswiVPRnRUPCS7joFc9eUe9GfV-ChXpMwr7n0ukfKgQ",
      },
    });
    const json = response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call to save the new task in database
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNjlmMDAzM2QxYWU4OTYwODU2YTM2In0sImlhdCI6MTcwNzUxNTY4NH0.TswiVPRnRUPCS7joFc9eUe9GfV-ChXpMwr7n0ukfKgQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client side only for simplicity purposes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
