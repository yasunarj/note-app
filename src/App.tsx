import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import "./App.css";
import { useState, useEffect } from "react";
import uuid from "react-uuid";

interface NoteState {
  id: string;
  title: string;
  content: string;
  modDate: number;
}

export type Note = NoteState[];

const App = () => {
  const [notes, setNotes] = useState<Note>(JSON.parse(localStorage.getItem("notes")!) || []);
  const [activeNote, setActiveNote] = useState<string>("");

  useEffect(() => {
    if(notes.length === 0) {
      return;
    }
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes]);

  useEffect(() => {
    setActiveNote(notes[0].id);
  }, []);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "",
      modDate: Date.now(),
    };
    setNotes((prev) => {
      return [...prev, newNote];
    });
    setActiveNote(newNote.id);
  };

  const handleDelete = (id: string) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  }

  const getActiveNote = () => {
    return notes.find((note) => {
      return note.id === activeNote;
    });
  }

  const onUpdateNote = (newNote: NoteState) => {
    const newNotes = notes.map((note) => {
      if(note.id === newNote.id) {
        return newNote;
      } else {
        return note;
      }
    });
    setNotes(newNotes);
  }

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        deleteNote={handleDelete}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
      />
    </div>
  );
};

export default App;
