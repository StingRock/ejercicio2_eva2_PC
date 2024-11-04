import React from "react";

function TaskList({ tasks, onDelete }) {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <li>
              <h3>{task.name}</h3>
              <p>Fecha límite: {task.deadline}</p>
              <p>Prioridad: {task.priority || "Normal"}</p>
              <button onClick={() => onDelete(task.id)}>Eliminar</button>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
