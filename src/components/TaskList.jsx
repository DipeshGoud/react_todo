import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import EmptyTask from './EmptyTask';

/**
 * TaskList component displays a list of active and completed tasks.
 * @returns JSX element representing the task list.
 */
const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="container mt-4">
            <div className="col">
                {tasks.length === 0 ? <EmptyTask /> : (
                    <>
                        <div className="col">
                            {/* Section for Active Tasks */}
                            <h2 className="d-flex title-task justify-content-between"><span>Active Tasks</span><p style={{ color: "white" }}>Remaining Tasks: {activeTasks.length}</p></h2>
                            <ul className="list-group">
                                {activeTasks.length === 0 && <p>No active tasks available.</p>}
                                {activeTasks.map((task) => (
                                    <TaskItem key={task.id} task={task} />
                                ))}
                            </ul>
                        </div>
                        <div className="col mt-4">
                            {/* Section for Completed Tasks */}
                            <h2 className="d-flex title-task justify-content-between"><span>Completed Tasks</span><p style={{ color: "white" }}>Total Completed Tasks: {completedTasks.length}</p></h2>
                            <ul className="list-group">
                                {completedTasks.length === 0 && <p>No completed tasks available.</p>}
                                {completedTasks.map((task) => (
                                    <TaskItem key={task.id} task={task} />
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskList;
