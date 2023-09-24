import React, { useEffect, useState } from "react";

export default function SimpleCrud({ title }) {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(["Task 1", "Task 2"]);
  console.log(tasks);
  // get Task
  // const handleGet = () => {
  //   setTasks();
  // };
  // useEffect(() => {}, []);

  // Create Task
  const createTask = () => {
    if (!value) {
      alert("empty field");
    } else {
      setTasks([value, ...tasks]);
      setValue("");
    }
  };
  //Edit Task

  // delete Task
  const deleteTask = (item) => {
    const newLists = [...tasks];
    // newLists.splice(index, 1);
    // setTasks(newLists);
    const updatedArray = newLists.filter((ite,i)  => ite !== item);
    console.log(updatedArray)
    setTasks(updatedArray)
  };

  return (
    <>
      <h2>{title}</h2>
      <hr />
      <br />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={createTask}>Submit</button>
      <br />
      {/* <button onClick={handleGet}>Get</button> */}
      <table border={1} cellSpacing={0} cellPadding={10}>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Task Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>
                <button>Edit</button>
                <button
                  onClick={() => deleteTask(item)}
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <hr />
    </>
  );
}
