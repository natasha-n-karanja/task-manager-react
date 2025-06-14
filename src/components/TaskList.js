import React from 'react';

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ 
          display: 'flex', justifyContent: 'space-between',
          padding: '0.5rem', background: '#f2e9ff',
          marginBottom: '0.5rem', borderRadius: '8px'
        }}>
          <span 
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => onToggle(task.id)}
          >
            {task.description}
          </span>
          <button onClick={() => onDelete(task.id)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', padding: '0.3rem 0.6rem' }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
