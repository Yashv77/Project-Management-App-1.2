import React, { useState, useEffect } from "react"
import { Header } from "./components/Header"
import { Inputs } from "./components/Inputs"
import { List } from "./components/List"
import { Tabs } from "./components/Tabs"

function App() {
  const [todos, setTodos] = useState([
    { 
      id: 1, 
      input: 'Hello! Add your first todo!', 
      complete: false,
      subtasks: [] 
    }
  ])

  const [selectedTab, setSelectedTab] = useState('Open')

  // Generate unique ID for new todos
  const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9)

  // Add a new todo or subtask
  const handleAddTodo = (newTodoText, parentId = null) => {
    const newTodo = {
      id: generateId(),
      input: newTodoText,
      complete: false,
      subtasks: []
    }

    const addTodoRecursively = (todos) => {
      return todos.map(todo => {
        if (todo.id === parentId) {
          return {
            ...todo,
            subtasks: [...todo.subtasks, newTodo]
          }
        }
        
        if (todo.subtasks && todo.subtasks.length > 0) {
          return {
            ...todo,
            subtasks: addTodoRecursively(todo.subtasks)
          }
        }
        
        return todo
      })
    }

    const newTodoList = parentId 
      ? addTodoRecursively(todos) 
      : [...todos, newTodo]

    setTodos(newTodoList)
    localStorage.setItem('todo-app', JSON.stringify({ todos: newTodoList }))
  }

  // Complete a todo or subtask
  const handleCompleteTodo = (id) => {
    const completeTodoRecursively = (todos) => {
      return todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: true,
            subtasks: todo.subtasks.map(subtask => ({
              ...subtask,
              complete: true
            }))
          }
        }
        
        if (todo.subtasks && todo.subtasks.length > 0) {
          return {
            ...todo,
            subtasks: completeTodoRecursively(todo.subtasks)
          }
        }
        
        return todo
      })
    }

    const newTodoList = completeTodoRecursively(todos)
    setTodos(newTodoList)
    localStorage.setItem('todo-app', JSON.stringify({ todos: newTodoList }))
  }

  // Delete a todo or subtask
  const handleDeleteTodo = (id) => {
    const deleteTodoRecursively = (todos) => {
      return todos.filter(todo => {
        if (todo.id === id) return false
        
        if (todo.subtasks && todo.subtasks.length > 0) {
          todo.subtasks = deleteTodoRecursively(todo.subtasks)
        }
        
        return true
      })
    }

    const newTodoList = deleteTodoRecursively(todos)
    setTodos(newTodoList)
    localStorage.setItem('todo-app', JSON.stringify({ todos: newTodoList }))
  }

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem('todo-app')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos).todos)
    }
  }, [])

  return (
    <>
      <Header todos={todos}/>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos}/>
      <Inputs handleAddTodo={handleAddTodo}/>
      <List 
        todos={todos} 
        handleDeleteTodo={handleDeleteTodo} 
        handleCompleteTodo={handleCompleteTodo}
        handleAddTodo={handleAddTodo}
        selectedTab={selectedTab}
      />
    </>
  )
}

export default App