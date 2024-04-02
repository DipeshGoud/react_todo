import { createSlice } from '@reduxjs/toolkit';

// Initial state for the tasks slice
const initialState = {
  tasks: [],
};

// Define tasksSlice with reducers
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Reducer to set tasks
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    // Reducer to add a new task
    addTask(state, action) {
      const newTask = action.payload;
      // Check if the task already exists before adding
      if (!state.tasks.some(task => task.id === newTask.id)) {
        state.tasks.push(newTask);
        // Update tasks in localStorage
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    // Reducer to delete a task
    deleteTask(state, action) {
      // Filter out the task with the given id
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      // Update tasks in localStorage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    // Reducer to toggle the completion status of a task
    completeTask(state, action) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload);
      if (taskIndex !== -1) {
        // Toggle the completed status
        state.tasks[taskIndex].completed = !state.tasks[taskIndex].completed;
        // Update tasks in localStorage
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    // Reducer to modify a task
    modifyTask(state, action) {
      const { id, content, dueDate } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        // Update task name
        state.tasks[taskIndex].taskName = content;
        // Update due date if provided
        if (dueDate) {
          state.tasks[taskIndex].dueDate = dueDate;
        }
        // Update tasks in localStorage
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
  },
});

// Export actions and reducer
export const { setTasks, addTask, deleteTask, completeTask, modifyTask } = tasksSlice.actions;
export default tasksSlice.reducer;
