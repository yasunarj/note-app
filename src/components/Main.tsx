import "./Main.css";
import  ReactMarkdown from "react-markdown";

interface Note {
  id: string;
  title: string;
  content: string;
  modDate: number;
}

interface MainProps {
  activeNote?: Note;
  onUpdateNote: (newNote: Note) => void;
}

const Main: React.FC<MainProps> = ({ activeNote, onUpdateNote }) => {
  //onEditNote
  
  const onEditNote = (key: string, value: string) => {
    if(!activeNote) return;
    const upDateNote = {
      ...activeNote,
      [key]: value,
      modDate: Date.now()
    } as Note
    onUpdateNote(upDateNote);
  }

  if (!activeNote) {
    return <div className="no-active-note">ノートが選択されていません</div>;
  }

  return (
    <div className="main">
      <div className="main-note-edit">
        <input
          id="title"
          type="text"
          value={activeNote.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onEditNote("title", e.target.value)
          }
        />
        <textarea
          id="content"
          value={activeNote.content}
          placeholder="ノートの内容を記入"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onEditNote("content", e.target.value)
          }
        ></textarea>
      </div>
      <div className="main-note-preview">
        <h2 className="preview-title">{activeNote.title}</h2>
        <ReactMarkdown className="markdown-preview">{activeNote.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
