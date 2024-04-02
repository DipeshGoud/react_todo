import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { setTasks } from './slices/tasksSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';


const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

function App() {
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    store.dispatch(setTasks(tasks));
  }, []);

  return (
    <Provider store={store}>
      <div id="content" className="App">
          <div className="container">
            <h1 className="text-center mb-4 pt-4">ToDo</h1>
            <div className="row d-flex">
              <TaskInput />
              <TaskList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
