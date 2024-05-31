"use client";
import React, { useState, useEffect } from 'react';
import RoundPlusButton from '@/components/buttons';
import NewNoteOverlay from './NewNoteOverlay';

interface Note {
    id: string;
    note_title: string;
    note_content: string;
}

const NotesList: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/dashboard/notes?authorID=your-user-id');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched notes:', data); // Log for debugging
                setNotes(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notes:', error);
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    const handleSaveNote = async (note_title: string, note_content: string) => {
        try {
            const response = await fetch('/api/dashboard/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note_title, note_content, authorID: 'your-user-id' }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newNote = await response.json();
            console.log('Created note:', newNote); // Log for debugging
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
                    <NoteCard key={note.id} title={note.note_title} content={note.note_content} />
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