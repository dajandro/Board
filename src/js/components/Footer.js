import React from 'react'
import FilterLink from './FilterLink'

export const Footer = ({ currentVisibilityFilter, onFilterClicked }) => (
  <div
    class="element-footer"
  >
    <strong>Show: </strong>
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>All</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_COMPLETED"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Completed</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_ACTIVE"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Active</FilterLink>
  </div>
)

export default Footer;