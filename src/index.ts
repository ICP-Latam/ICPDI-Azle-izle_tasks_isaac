import { Canister, query, update, text, Void } from 'azle';

// DATA STRUCTURE
let tasks: { id: number, title: string, completed: boolean }[] = [];
let taskIdCounter = 1;

export default Canister({
  // OBTENER
  getTasks: query([], text, () => {
    return JSON.stringify(tasks);
  }),

  // AGREGAR
  addTask: update([text], text, (title) => {
    const newTask = {
      id: taskIdCounter++,
      title: title,
      completed: false,
    };
    tasks.push(newTask);
    return `Tarea "${title}" agregada con éxito.`;
  }),

  // EDITAR
  editTask: update([text, text], text, (oldTitle, newTitle) => {
    const task = tasks.find(task => task.title === oldTitle);
    if (task) {
      task.title = newTitle;
      return `Tarea "${oldTitle}" editada a "${newTitle}" con éxito.`;
    } else {
      return `Tarea "${oldTitle}" no encontrada.`;
    }
  }),

  // ELIMINAR
  deleteTask: update([text], text, (title) => {
    const index = tasks.findIndex(task => task.title === title);
    if (index !== -1) {
      tasks.splice(index, 1);
      return `Tarea "${title}" eliminada con éxito.`;
    } else {
      return `Tarea "${title}" no encontrada.`;
    }
  }),
});
