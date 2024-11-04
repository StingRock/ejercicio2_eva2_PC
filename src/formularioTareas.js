import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";

function TaskForm({ addTask }) {
  const [form, setForm] = useState({ name: "", deadline: "" });
  const [validator] = useState(new SimpleReactValidator());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      addTask(form);
      setForm({ name: "", deadline: "" });
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la tarea:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />
        {validator.message("name", form.name, "required")}
      </div>
      <div>
        <label>Fecha límite:</label>
        <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        {validator.message("deadline", form.deadline, "required|date")}
      </div>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
}

export default TaskForm;
