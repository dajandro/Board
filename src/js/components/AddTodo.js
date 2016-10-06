import React from 'react';

export const AddTodo = ({ onAddTodo, children }) => {
  let input;

  return (

    <div class="row">
      <div class="col-sm-12">
        <div class="input-group">            
          <input 
            type="text"
            class="form-control"
            placeholder="Add To Do..."
            ref={node => {
              input = node
            }}
          />
          <span class="input-group-btn">
            <button 
              class="btn btn-primary"
              type="submit"
              id="note"
              name="note_btn"
              onClick={
                () => { 
                  onAddTodo(input.value);
                  input.value = "";
                }
              }
            >{ children }
            <span class="glyphicon glyphicon-plus-sign">
            </span>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;