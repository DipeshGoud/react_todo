import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../slices/tasksSlice';

/**
 * TaskInput component represents the form for adding a new task.
 * @returns JSX element representing the task input form.
 */
const TaskInput = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('None');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    /**
     * Handles changes in the task name input field.
     * @param {Object} e - The event object.
     */
    const handleChangeTaskName = (e) => {
        const name = e.target.value;
        if (name.trim() === '') {
            setError('Task name cannot be empty');
        } else {
            setError('');
        }
        setTaskName(name);
    };

    /**
     * Handles form submission when adding a new task.
     * @param {Object} e - The event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.trim() === '') {
            setError('Task name cannot be empty');
            return;
        }
        dispatch(addTask({
            id: Date.now(),
            taskName,
            description,
            dueDate,
            priority,
            completed: false
        }));
        setTaskName('');
        setDescription('');
        setDueDate('');
        setPriority('None');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2>Create new task</h2>
            <div className="row input-row">
                <div className="col">
                    <input
                        type="text"
                        value={taskName}
                        onChange={handleChangeTaskName}
                        className={`form-control ${error && 'is-invalid'}`}
                        placeholder="Enter task name"
                        required
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="col">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        placeholder="Enter description (Optional)"
                    />
                </div>
                <div className="col">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="form-control"
                    />
                </div>
                <div className="col">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="form-select"
                    >
                        <option value="None" disabled selected hidden>Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </div>
            </div>
        </form>
    );
}

export default TaskInput;
