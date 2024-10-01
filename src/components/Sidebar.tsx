import "./Sidebar.css";
import { Note } from "../App";


interface SidebarProps {
  onAddNote: () => void;
  notes: Note;
  deleteNote: (id: string) => void;
  activeNote: string;
  setActiveNote: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  onAddNote,
  notes,
  deleteNote,
  activeNote,
  setActiveNote,
}) => {

  const sortNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>ノート</h2>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div className="sidebar-notes">
        {sortNotes.map((note) => {
          return (
            <div
              key={note.id}
              className={`sidebar-note ${note.id === activeNote && "active"}`}
              onClick={() => {setActiveNote(note.id)}}
            >
              <div className="sidebar-note-title">
                <strong>{note.title}</strong>
                <button
                  onClick={() => {
                    deleteNote(note.id);
                  }}
                >
                  削除
                </button>
              </div>
              <p>{note.content}</p>
              <small>
                最終修正日:{" "}
                {new Date(note.modDate).toLocaleDateString("jp-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
