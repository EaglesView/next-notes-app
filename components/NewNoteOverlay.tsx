import React, { useState } from 'react';

interface NewNoteOverlayProps {
    onClose: () => void;
    onSave: (title: string, content: string) => void;
}

const NewNoteOverlay: React.FC<NewNoteOverlayProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = () => {
        onSave(title, content);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
                <h2 className="text-xl mb-4">Add New Note</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full mb-2 p-2 border"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="block w-full mb-2 p-2 border"
                ></textarea>
                <button
                    onClick={handleSave}
                    className="bg-emerald-600 text-white px-4 py-2 rounded mr-2"
                >
                    Save
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default NewNoteOverlay;
