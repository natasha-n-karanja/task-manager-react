import React, { useState, useEffect } from 'react';
import './App.css'; // ✅ Import the stylesheet

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [taskInput, setTaskInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { text: taskInput, completed: false }]);
    setTaskInput('');
  };

  const saveEdit = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editInput;
    setTasks(newTasks);
    setEditIndex(null);
    setEditInput('');
  };

  return (
    <div className="container">
      <h1 className="heading">Task Manager</h1>

      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask} className="add">Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                const newTasks = [...tasks];
                newTasks[index].completed = !newTasks[index].completed;
                setTasks(newTasks);
              }}
            />

            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={() => saveEdit(index)} className="save">Save</button>
              </>
            ) : (
              <>
                <span className={`task-text ${task.completed ? 'task-completed' : ''}`}>
                  {task.text}
                </span>
                <button
                  className="edit"
                  onClick={() => {
                    setEditIndex(index);
                    setEditInput(task.text);
                  }}
                >
                  Edit
                </button>
              </>
            )}

            <button className="delete" onClick={() => {
              const newTasks = tasks.filter((_, i) => i !== index);
              setTasks(newTasks);
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
