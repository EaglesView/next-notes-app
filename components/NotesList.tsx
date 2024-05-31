"use client";
import React, { useState, useEffect } from 'react';
import { RoundPlusButton } from './buttons';
import NewNoteOverlay from './NewNoteOverlay';

interface Note {
    id: string;
    title: string;
    content: string;
}

const NotesList: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/notes?userId=your-user-id');
                const data = await response.json();
                setNotes(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notes:', error);
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    const handleSaveNote = async (title: string, content: string) => {
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, userId: 'your-user-id' }),
            });
            const newNote = await response.json();
            setNotes([...notes, newNote]);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    if (loading) {
        return <p>Loading notes...</p>;
    }

    return (
        <div>
            <div className="notes-container">
                {notes.map((note) => (
                    <NoteCard key={note.id} title={note.title} content={note.content} />
                ))}
            </div>
            <RoundPlusButton onClick={() => setShowOverlay(true)} />
            {showOverlay && (
                <NewNoteOverlay
                    onClose={() => setShowOverlay(false)}
                    onSave={handleSaveNote}
                />
            )}
        </div>
    );
};

interface NoteCardProps {
    title: string;
    content: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content }) => {
    return (
        <div className="note-card">
            <h2>{title}</h2>
            <div>{content}</div>
        </div>
    );
};

export default NotesList;
