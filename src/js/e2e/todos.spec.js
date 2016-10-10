import {todos} from '../reducers/todos';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testAddTodo = () => {
  const stateBefore = [];

  const action = {
    type: 'ADD_TODO',
    payload: {
      id: 0,
      text: 'Revisar proyectos'
    }
  }

  const stateAfter = [{
    id: 0,
    text: 'Revisar proyectos',
    completed: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Revisar proyectos',
      completed: false
    },
    {
      id: 1,
      text: 'Comprar dulces',
      completed: false
    }
  ];

  const action = {
    type: 'TOGGLE_TODO',
    payload: {
      id: 1
    }
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Revisar proyectos',
      completed: false
    },
    {
      id: 1,
      text: 'Comprar dulces',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddTodo();
testToggleTodo();
console.log("All To Do's tests passed!");