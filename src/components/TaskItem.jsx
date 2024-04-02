import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { completeTask, deleteTask, modifyTask } from '../slices/tasksSlice';

/**
 * TaskItem component represents a single task in the task list.
 * @param {Object} task - The task object containing task details.
 * @returns JSX element representing the task item.
 */
const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskContent, setEditedTaskContent] = useState(task.taskName);
    const [editedDueDate, setEditedDueDate] = useState(task.dueDate || '');

    const handleComplete = () => {
        dispatch(completeTask(task.id));
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editedTaskContent.trim() === '') {
            alert('Please enter a task name.');
            return;
        }
        if (editedDueDate.trim() === '') {
            alert('Please enter a due date.');
            return;
        }
        dispatch(modifyTask({ id: task.id, content: editedTaskContent, dueDate: editedDueDate }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    // Function to get the priority color based on the priority level
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'text-danger'; // Red for high priority
            case 'Medium':
                return 'text-warning'; // Yellow for medium priority
            case 'Low':
                return 'text-success'; // Green for low priority
            default:
                return 'text-primary'; // Default color
        }
    };

    return (
        <li className={`list-group-item mb-3 ${task.priorityClass}`}>
            <div className="d-flex list-con justify-content-between align-items-center">
                <div className='d-flex'>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleComplete}
                        className="form-check-input me-2"
                    />
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editedTaskContent}
                                onChange={(e) => setEditedTaskContent(e.target.value)}
                                className="form-control me-2"
                            />
                            <input
                                type="date"
                                value={editedDueDate}
                                onChange={(e) => setEditedDueDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="form-control me-2"
                            />
                            <button onClick={handleSave} className="btn btn-primary">Save</button>
                            <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                        </>
                    ) : (
                        <span style={{ fontWeight: 'bold' }} className={getPriorityColor(task.priority)}>
                            {task.taskName}
                        </span>
                    )}
                </div>
                <div className="text-muted">
                    {<span className="ms-2 desc">Desc: {task.description || "None"}</span>}
                    <span className="ms-2">Due Date: {task.dueDate || new Date().toISOString().split('T')[0]}</span>
                    <span className="ms-2">Priority: {task.priority}</span>
                    <button onClick={handleDelete} className="btn btn-danger ms-2">Delete</button>
                    {!isEditing && <button onClick={handleEdit} className="btn btn-secondary ms-2">Edit</button>}
                </div>
            </div>
        </li>
    );
};

export default TaskItem;
