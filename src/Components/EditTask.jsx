import { useEffect, useState } from "react";

function EditTask({ task, index, taskList, setTaskList }) {
    const [editModal, setEditModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
        setProjectName(task.projectName);
        setTaskDescription(task.taskDescription);
    }, [editModal, task.projectName, task.taskDescription]);

    function handleUpdate(e) {
        e.preventDefault();
        let taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1, {
            projectName: projectName,
            taskDescription: taskDescription,
            timestamp: task.timestamp,
            duration: task.duration
        });
        localStorage.setItem("tasklist", JSON.stringify(taskList));
        window.location.reload();
        setEditModal(false);
        setProjectName("");
        setTaskDescription("");
    }

    function handleInput(e) {
        const { name, value } = e.target;

        if (name === "projectName") setProjectName(value);
        if (name === "taskDescription") setTaskDescription(value);
    }

    return (
        <>
            <button onClick={() => setEditModal(true)}>Edit</button>
            {editModal ? (
                <>
                    <div className="new-task-container">
                        <div>
                            <h3>Edit Task</h3>
                            <button onClick={() => setEditModal(false)}>x</button>
                        </div>
                        <form>
                            <div>
                                <label>Project Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Project Name"
                                    id="project-name"
                                    name="projectName"
                                    required
                                    value={projectName}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label>
                                    Task Description
                                </label>
                                <textarea
                                    rows="4"
                                    id="task-description" placeholder="Task Description"
                                    name="taskDescription"
                                    value={taskDescription}
                                    onChange={handleInput}
                                />
                            </div>
                        </form>
                        <div>
                            <button onClick={handleUpdate}>
                                Update Task
                            </button>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default EditTask