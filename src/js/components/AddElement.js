import React from 'react';

export const AddElement = ({ onAddTodoList, onAddNote }) => {
  let input;
  return (
    <form class="form-horizontal">
      <div class="row main-input">
        <div class="col-lg-offset-2 col-lg-8">
          <div class="input-group input-group-lg">
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button" 
                onClick = {
                            e => {
                                    e.preventDefault()
                                    if (!input.value.trim()) {
                                      return
                                    }   
                                    onAddNote(input.value);
                                    input.value = "";
                                    input.focus();
                                  }
                          }
              >
                <span>ADD NOTE  </span>
                <span class="main-icon glyphicon glyphicon-plus-sign"></span>
              </button>
            </span>
            <input type="text" class="form-control" placeholder="Type something..." ref={node => {
              input = node
            }} />
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button"
              onClick = {
                            e => {
                                    e.preventDefault()
                                    if (!input.value.trim()) {
                                      return
                                    }
                                    onAddTodoList(input.value);
                                    input.value = ''
                                    input.focus()
                                  }
                          }
              >
                <span>ADD TO DO LIST  </span>
                <span class="main-icon glyphicon glyphicon-th-list"></span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddElement;