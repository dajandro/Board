import React from 'react';

export const Note = ({ note, onUpdateNote }) => {
  let input;
  return (
    <textarea
      class="form-control note-body"
      rows="5"
      defaultValue={ note.text }
      ref={ node => input = node }
      onChange={ () => onUpdateNote(note.id, input.value) }
    />
  );
}

export default Note;