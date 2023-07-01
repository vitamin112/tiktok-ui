import { useState } from "react";

function TodoApp() {

  const [job, setJob] = useState("");
  const [List, setList] = useState(
    JSON.parse(localStorage.getItem("list")) ?? []
  );

  function handleChane(e) {
    setJob(e.target.value);
  }

  function del(id) {

    setList(preList => {

      let newJob = preList.filter(job => job.id != id);

      localStorage.setItem("list", JSON.stringify(newJob))

      return newJob;
    })

  }

  function handleClick() {

    if (job) {
      setList(preList => {
        let newJob = [...preList, { id: new Date().valueOf(), job: job }];
        localStorage.setItem("list", JSON.stringify(newJob))
        return newJob;
      })
      setJob("");
    }
    else alert("fill the job");
  }

  function change(e) {
    e.target.removeAttribute("readOnly");
  }

  function handleUpadte(id) {

    let input = document.getElementById(id);

    setList(preList => {
      let newJobs = preList.map(job => {
        if (job.id == id) return {
          id: job.id, job: input.value
        };
        return job;
      });
      localStorage.setItem("list", JSON.stringify(newJobs))
      return newJobs;
    })
    input.setAttribute("readOnly", "true");
    input.blur();

  }

  return (
    <div className="todo  ">
      <div className="h2">Todo List</div>

      <div className="todo-header">
        <input type="text" value={job} className="pt-2" onChange={handleChane} placeholder="To do?" />
        <button type="button" onClick={handleClick}>Add</button>
      </div>

      <div className="todo-body">
        {
          List.map((listItem, key) =>
            <li key={key}>
              <input
                id={listItem.id}
                defaultValue={listItem.job}
                className="border-0"
                onClick={change}
                readOnly={true} />
              <button className="update" onClick={() => handleUpadte(listItem.id)}>Upsate</button>
              <button className="del" onClick={() => del(listItem.id)}>X</button>
            </li>
          )
        }
      </div>
    </div>
  );
}
export default TodoApp;
