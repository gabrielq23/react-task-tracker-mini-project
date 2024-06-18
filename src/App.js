import AddTask from "./Components/AddTask";
import { useEffect, useState } from "react";
import ToDo from "./Components/ToDo";
import { useDrop } from "react-dnd";


function App() {

  const[taskList, setTaskList] = useState([]);
  const[completed, setCompleted] = useState([]);

  useEffect(() =>{
    let array = localStorage.getItem("tasklist");
    if (array){
      setTaskList(JSON.parse(array));
    }
  }, []);

  const[{isOver}, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addToCompleted(item.id, item.projectName, item.taskDescription, item.timestamp, item.duration),
    collect: (monitor) => ({
      isOver: !!monitor.isOver,
    })
  }))

  function addToCompleted(id, projectName, taskDescription, timestamp, duration){
    const moveTask = taskList.filter((task) => id === task.id);
    setCompleted((completed) => [...completed, {moveTask, projectName, taskDescription, timestamp, duration}])
    setTaskList((prevTaskList) => prevTaskList.filter((_,index) => index !== id))
  }

  return (
    <>
      <h1>Task Tracker</h1>
      <div>
        <p>Click</p>
          <AddTask taskList={taskList} setTaskList={setTaskList}/>
        <p> to add a new task!</p>
      </div>
      <div>
        <div>
          <h2>To Do:</h2>
          {taskList.map((task, index) => 
              <ToDo key={index} task={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
          )}
        </div>
        <div ref={drop}>
          <h2>Completed:</h2>
          {completed.map((task, index) =>
            <ToDo key={index} task={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
