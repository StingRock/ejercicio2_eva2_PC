import React, { useState, useEffect } from "react";
import TaskForm from "./formularioTareas";
import TaskList from "./TaskList";
import { db, functions } from "./fireBase";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, "tasks");
      const snapshot = await getDocs(tasksCollection);
      const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
      const additionalData = response.data;

      const docRef = await db.collection("tasks").add({ ...task, priority: additionalData.title });
      setTasks([...tasks, { id: docRef.id, ...task, priority: additionalData.title }]);
      setShowForm(false);
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const deleteTaskFunction = functions.httpsCallable("deleteTask");
      await deleteTaskFunction({ taskId });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancelar" : "Agregar Tarea"}
      </button>
      {showForm && <TaskForm addTask={addTask} />}
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} onDelete={deleteTask} />
      ) : (
        <p>No hay tareas pendientes</p>
      )}
    </div>
  );
}

export default App;

