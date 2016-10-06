import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import v4 from 'uuid-v4';
import '../styles/index.scss';

import Header from './components/Header';
import ElementsFooter from './components/ElementsFooter';
import FilterLink from './components/FilterLink';
import AddElement from './components/AddElement';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import AddTodo from './components/AddTodo';
import Note from './components/Note';
import GeneralHeader from './components/GeneralHeader';
import Colors from './components/Colors';

import { todos } from './reducers/todos';
import { elements } from './reducers/elements';
import { visibilityFilterElements } from './reducers/visibility';

//import {} from './e2e/todos.spec';

const { Component } = React;

const todoApp = combineReducers({
  elements,
  visibilityFilterElements,
});

const loadState = () => {
  try{
    let result = JSON.parse(localStorage.getItem('state'));
    return result ? result : undefined;
  }
  catch(err){
    return undefined;
  }
}

const saveState = (state) => {
  try{
    localStorage.setItem('state',JSON.stringify(state));
  }
  catch(err){

  }
}

const store = createStore(todoApp, loadState());

const getVisibleElements = (elements, visibilityFilter) => {
  if(visibilityFilter === 'SHOW_ALL_ELEMENTS')
    return elements.filter(t => !t.archived);

  if(visibilityFilter === 'SHOW_NOTES')
    return elements.filter(t => t.isNote).filter(t => !t.archived);
  

  if(visibilityFilter === 'SHOW_TODOS')
    return elements.filter(t => !t.isNote).filter(t => !t.archived);
}

const getVisibleTodos = (todos, visibilityFilter) => {
  if(visibilityFilter === 'SHOW_ALL'){
    return todos;
  }

  if(visibilityFilter === 'SHOW_COMPLETED'){
    return todos.filter(t => t.completed);
  }

  if(visibilityFilter === 'SHOW_ACTIVE'){
    return todos.filter(t => !t.completed);
  }
}

const TodosApp = ({ todos, visibilityFilter, elementId }) => (
  <div>
    <AddTodo
      class="element"
      onAddTodo={
        (text) => {
          store.dispatch({
            type: 'ADD_TODO',
            payload: {
              id: v4(),
              text,
              elementId
            }
          });
        }
      }></AddTodo>

    <TodoList
      todos={ getVisibleTodos(todos, visibilityFilter) }
      onTodoClicked={
        (todo) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            payload: {
              id: todo.id,
              elementId
            }
          });
        }
      }
      onRemoveTodo={
        (todo) => {
          store.dispatch({
            type: 'REMOVE_TODO',
            payload: {
              id: todo.id,
              elementId
            }
          });
        }
      }
      onUpdateTodo={
        (todo, text) => {
          store.dispatch({
            type: 'UPDATE_TODO',
            payload: {
              id: todo.id,
              elementId,
              text
            }
          })
        }
      }
       />
  
    <Footer
      currentVisibilityFilter={ visibilityFilter }
      onFilterClicked={
        (filter) => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: { 
              visibilityFilter: filter, 
              elementId }
          });
        }
      } />
      
  </div>
);

const ElementList = ({ elements, colors }) => (
  <div>
    {
      elements.map(element => (
        <Element
          key={ element.id }
          element={ element }
          colors={ colors }
        />
        
      ))
    }
  </div>
);

const Element = ({ element, colors}) => {
  let value;
  switch(element.isNote) {
    case true:
      value =
        <Note
          note={ element }
          onUpdateNote={
            (elementId, text) => {
              store.dispatch({
                type: 'UPDATE_NOTE',
                payload: {
                  elementId,
                  text
                }
              });
            }
          }
        />
      break;
    default:
      value = <TodosApp
        todos={ element.todolist }
        visibilityFilter={ element.visibilityFilter }
        elementId={ element.id }
        />
      break;
  }
  return (
    <div
      style={{
      background: element.color
      }}
      class="element col-md-3"
    >
      <Header
        element={ element }
        onUpdateTitle={
          (elementId, text) => {
            store.dispatch({
              type: 'UPDATE_TITLE',
              payload: {
                elementId,
                text
              }
            });
          }
        } 
      />
      { value }        
      <div class="form-group element-color">
        <label>Color</label>
        <div class="form-control">
        {colors.map(color => (
          <button
            class="color-picker"
            key={ colors.indexOf(color) }
            style={{ background: color }}
            onClick={
              () => {
                store.dispatch({
                  type: 'CHANGE_COLOR',
                  payload: {
                    elementId: element.id,
                    color
                  }
                })
              }
            }
            ></button>
          ))
        }
        </div>
      </div>
      <label>Create: {element.create_date}</label>
      <br></br>
      <label>Last update: {element.update_date}</label>
    </div>
  );
}

const ElementsApp = ({ elements, visibilityFilterElements }) => (
  <div>
    <GeneralHeader/>    
      <AddElement
        onAddNote={
          (text) => {
            store.dispatch({
              type: 'ADD_NOTE',
              payload: {
                id: v4(),
                text,
                color: Colors[0]
              }
            });
          }
        }
        onAddTodoList={
          (text) => {
            store.dispatch({
              type: 'ADD_TODO_LIST',
              payload: {
                id: v4(),
                color: Colors[0],
                title: text
              }
            });
          }
        }
        />
        

        <ElementList
        elements={ getVisibleElements(elements, visibilityFilterElements) }
        colors={ Colors }
        />
      
      <ElementsFooter
      currentVisibilityFilter={ visibilityFilterElements }
      onFilterClicked={
        (filter) => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER_ELEMENTS',
            payload: { visibilityFilter: filter }
          });
        }
      } />


  </div>
);

const render = () => {
  ReactDOM.render(
     <ElementsApp
      { ...store.getState() } />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
store.subscribe( () => {
  saveState(store.getState());
});

/* Tests

testAddTodo();
testToggleTodo();
console.log("All todo tests passed!");
*/