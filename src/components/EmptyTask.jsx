import React from 'react';

/**
 * EmptyTask component represents the UI when there are no active tasks available.
 * @returns JSX element representing the empty task message.
 */
function EmptyTask() {
    return (
        <div className='empty-task d-flex justify-content-center align-items-end'>
            <h3 className='text-body-emphasis' style={{ fontWeight: "bold" }}>No active tasks available. Create a new task.</h3>
        </div>
    );
}

export default EmptyTask;
    