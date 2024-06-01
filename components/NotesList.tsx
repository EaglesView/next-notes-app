"use client";

import React, { useState, useEffect } from 'react';
import RoundPlusButton from './buttons/RoundPlusBtn';
import NewNoteOverlay from './NewNoteOverlay';
import { useSession } from 'next-auth/react';

interface Note {
    id: string;
    note_title: string;
    note_content: string;
}

const NotesList: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchNotes = async () => {
            if (!session) {
                console.error('No session found');
                setLoading(false);
                return;
            }
            try {
                const response = await fetch('/api/dashboard/notes');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched notes:', data);
                setNotes(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notes:', error);
                setLoading(false);
            }
        };

        fetchNotes();
    }, [session]);

    const handleSaveNote = async (note_title: string, note_content: string) => {
        try {
            const response = await fetch('/api/dashboard/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note_title, note_content }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newNote = await response.json();
            console.log('Created note:', newNote);
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
