import React from 'react';

export const Todo = ({ todo, onTodoClicked, onRemoveTodo, onUpdateTodo}) => {
  let input;
  return (    
    <div class="row todo-list-container">
      <div class="col-sm-12">
        <div class="input-group">
          <span class="input-group-btn">
            <button 
              class="btn btn-primary"
              type="submit"
              id="note"
              name="note_btn"
              onClick={onTodoClicked}
            >
            <span class="glyphicon glyphicon-pushpin">
            </span>
            </button>            
          </span>          
          <input
            type="text"
            class="form-control"
            style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
            }}
            defaultValue={ todo.text }
            ref={ node => input = node }
            onChange={ () => onUpdateTodo(todo, input.value) }
          />          
          <span class="input-group-btn">
            <button 
              class="btn btn-danger"
              type="submit"
              id="note"
              name="note_btn"
              onClick={onRemoveTodo}
            >
            <span class="glyphicon glyphicon-remove">
            </span>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Todo;