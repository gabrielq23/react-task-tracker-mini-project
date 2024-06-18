import { useState } from "react";
import "./AddTask.css"

function AddTask({ taskList, setTaskList }) {
    const [addModal, setAddModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleAdd(e) {
        e.preventDefault();
        if (!projectName) {
            setErrorMessage("Enter project name to continue")
        }
        else {
            let timestamp = new Date();
            let tempList = taskList;
            tempList.push({
                projectName,
                taskDescription,
                timestamp: timestamp,
                duration: 0
            })
            localStorage.setItem("tasklist", JSON.stringify(tempList));
            window.location.reload();
            setTaskList(
                [...taskList, { projectName, taskDescription, timestamp: timestamp }]
            );
            setAddModal(false);
            setProjectName("");
            setTaskDescription("");
        }
    }

    function handleInput(e) {
        const { name, value } = e.target;
        if (name === "projectName") {
            setProjectName(value);
            setErrorMessage("");
        }
        if (name === "projectName" && value === "") {
            setErrorMessage("Enter project name to continue");
        }
        if (name === "taskDescription") setTaskDescription(value);
    }

    return (
        <>
            <button onClick={() => setAddModal(true)}>+New</button>
            {addModal ? (
                <>
                    <div className="new-task-container">
                        <div>
                            <h3>Add New Task</h3>
                            <button onClick={() => setAddModal(false)}>x</button>
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
                                <p>{errorMessage}</p>
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
                            <button onClick={handleAdd}>
                                Add Task
                            </button>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default AddTask