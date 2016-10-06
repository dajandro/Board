import React from 'react';
import Todo from './Todo';

export const TodoList = ({ todos, onTodoClicked, onRemoveTodo, onUpdateTodo }) => (
  <div>
    {
      todos.map(todo => {
        return(
        <Todo
          key={ todo.id }
          todo={ todo }
          onTodoClicked={ () => onTodoClicked(todo) }
          onRemoveTodo={ () => onRemoveTodo(todo) }
          onUpdateTodo={ onUpdateTodo }
        />
        );
        
    })
    }
  </div>
);

export default TodoList;