import React, { useState } from 'react';

export const NotesSection: React.FC = () => {
  const [noteText, setNoteText] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Notes</h3>
      <p className="text-sm text-gray-500">
        Feel free to add a private note for this patient. Only you will be able to view it.
      </p>
      <textarea
        placeholder="Type your note..."
        className="min-h-[100px] w-full p-2 shadow-md bg-[#F5F7F9] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
    </div>
  );
};