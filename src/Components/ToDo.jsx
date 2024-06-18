import { useEffect, useState } from "react";
import EditTask from "./EditTask";
import { useDrag } from "react-dnd";
import "./ToDo.css"

function ToDo({ task, index, taskList, setTaskList }) {

    const [time, setTime] = useState(task.duration);
    const [running, setRunning] = useState(false);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "todo",
        item: {
            id: index,
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timestamp: task.timestamp,
            duration: task.duration
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10);
        }
        else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    function deleteTask(index) {
        let removeIndex = taskList.indexOf(task);
        taskList.splice(removeIndex, 1);
        localStorage.setItem("tasklist", JSON.stringify(taskList));
        window.location.reload();
    }

    function handleStop() {
        setRunning(false);
        let taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1, {
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timestamp: task.timestamp,
            duration: time
        })
        localStorage.setItem("tasklist", JSON.stringify(taskList));
        window.location.reload();
    }

    function resetTimer() {
        setTime(0);
        setRunning(false);
    }


    return (
        <>
            <div className="todo-container" ref={drag}>
                <div>
                    <p>{task.projectName}</p>
                    <p>{task.taskDescription}</p>
                    <EditTask task={task} taskList={taskList} setTaskList={setTaskList} index={index} />
                </div>
                <div>
                    <div>
                        <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}</span>
                        <span>:{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
                        <span>:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                        <span>:{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
                    </div>
                    <div>
                        {running ? (
                            <button onClick={() => handleStop()}>
                                Stop
                            </button>
                        ) : (
                            <button onClick={() => setRunning(true)}>
                                Start
                            </button>
                        )}
                        <button onClick={() => resetTimer()}>Reset</button>
                    </div>
                </div>
                <div>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                </div>
            </div>
        </>
    );
}

export default ToDo