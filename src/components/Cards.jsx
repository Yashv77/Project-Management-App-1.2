import React, { useState } from "react";

export function Cards(props) {
  const {
    todo,
    handleDeleteTodo,
    handleCompleteTodo,
    handleAddTodo,
    depth = 0,
  } = props;

  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskInput, setSubtaskInput] = useState("");

  const handleAddSubtask = () => {
    if (!subtaskInput.trim()) return;

    handleAddTodo(subtaskInput, todo.id);
    setSubtaskInput("");
    setShowSubtaskInput(false);
  };

  return (
    <div className="card todo-item">



        <div className="todo-things">
          <div className="todo-input"><p>{todo.input}</p></div>
          
          <div className="todo-buttons">
          <button
            onClick={() => handleCompleteTodo(todo.id)}
            disabled={todo.complete}
          >
            Done
          </button>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          <button
            onClick={() => setShowSubtaskInput(!showSubtaskInput)}
            disabled={todo.complete}
          >
            Add Subtask
          </button>
          </div>
        </div>


      <div>
        {" "}
        {showSubtaskInput && (
          <div className="input-container">
            <input
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              placeholder="Add subtask"
            />
            <button onClick={handleAddSubtask}><i className="fa-solid fa-plus"></i></button>
          </div>
        )}
      </div>

      {todo.subtasks &&
        todo.subtasks.map((subtask) => (
          <Cards
            key={subtask.id}
            todo={subtask}
            handleDeleteTodo={handleDeleteTodo}
            handleCompleteTodo={handleCompleteTodo}
            handleAddTodo={handleAddTodo}
            depth={depth + 1}
          />
        ))}
    </div>
  );
}
