import { useContext } from 'react'
import { TodoContext } from './TodoContext'

// (custom hook) can be used within components to retrieve TodoContext value
export const useTodo = () => {
  //get current value from TodoContext 
  const context = useContext(TodoContext)

  // if value is undefined throw error
  if(!context)
    throw new Error('useTodo must be used within a TodoProvider')

  return context
}
