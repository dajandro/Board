import React from 'react';

export const Header = ({element, onUpdateTitle}) => {
  let input;
  return (
    <div>
      <input
        class="form-control element-header"
        placeholder='Título'
        defaultValue={ element.title }
        ref={ node => input = node }
        onChange={ () => onUpdateTitle(element.id, input.value) }
      />

    </div>
  );
}

export default Header;