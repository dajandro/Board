import React from 'react'
import FilterLink from './FilterLink'

export const ElementsFooter = ({ currentVisibilityFilter, onFilterClicked }) => {
  return <div
    class="general-footer"
  >
    <strong>Filter by: </strong>
    <FilterLink
      visibilityFilter="SHOW_ALL_ELEMENTS"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>All</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_TODOS"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>To Do's</FilterLink>
    {' '}    
    <FilterLink
      visibilityFilter="SHOW_NOTES"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Notes</FilterLink>
    {' '}    
  </div>
}

export default ElementsFooter