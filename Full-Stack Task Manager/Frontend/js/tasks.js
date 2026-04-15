// let tasks = JSON.parse(localStorage.getItem("tasks")) || [
//     {title: "Design UI", status: "todo"},
//     {title: "Build backend", status: "inprogress"},
//     {title: "Deploy App", status: "done"}
// ];

let currentProjectId = 1;

async function loadProjects() {
  const response = await fetch(
    "https://task-manager-api-0r6d.onrender.com/projects",
  );
  const projects = await response.json();

  const projectList = document.getElementById("projectList");
  projectList.innerHTML = "";

  projects.forEach((project) => {
    const li = document.createElement("li");
    li.innerText = project.name;
    li.style.cursor = "pointer";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.className = "delete-project-btn";

    deleteBtn.onclick = function (e) {
      e.stopPropagation();

      if (confirm("Delete this project?")) {
        deleteProject(project.id);
      }
    };

    li.appendChild(deleteBtn);

    document.querySelectorAll("#projectList li").forEach((item) => {
      item.classList.remove("active");
    });

    li.classList.add("active");

    li.onclick = function () {
      currentProjectId = project.id;
      loadTasks();
    };

    projectList.appendChild(li);
  });
}

async function loadTasks() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  const response = await fetch(
    `https://task-manager-api-0r6d.onrender.com/tasks?project_id=${currentProjectId}`,
  );
  const tasks = await response.json();

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerText = task.title;

    // const due = document.createElement("div");
    // due.innerText = "Due: " + task.dueDate;

    // const today = new Date();
    // const dueDate = new Date(task.dueDate);

    // const diffTime = dueDate - today;
    // const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // const days = document.createElement("div");
    // days.innerText = daysLeft + " days left ";

    // Status Dropdown
    const statusSelect = document.createElement("select");

    const statuses = ["todo", "inprogress", "done"];

    statuses.forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.innerText = status;

      if (status === task.status) {
        option.selected = true;
      }

      statusSelect.appendChild(option);
    });

    // Update Status
    statusSelect.onchange = async function () {
      const newStatus = statusSelect.value;

      await fetch(
        `https://task-manager-api-0r6d.onrender.com/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      loadTasks();

      // console.log("Change status to:", statusSelect.value)

      // tasks[index].status = statusSelect.value;

      // if(newStatus === "done"){
      //     tasks[index].completedDate = new Date().toISOString().split("T")[0];
      // }
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";

    deleteBtn.onclick = function () {
      console.log("Deleting task ID:", tasks.id);
      deleteTask(task.id);
    };

    // Adding elements to task
    taskDiv.appendChild(statusSelect);
    taskDiv.appendChild(deleteBtn);
    // taskDiv.appendChild(due);
    // taskDiv.appendChild(days);

    if (task.status === "todo") {
      document.getElementById("todo").appendChild(taskDiv);
    }

    if (task.status === "inprogress") {
      document.getElementById("inprogress").appendChild(taskDiv);
    }

    if (task.status === "done") {
      document.getElementById("done").appendChild(taskDiv);
    }

    // if(task.status === "done" && task.completedDate){
    //     const completed = document.createElement("div");
    //     completed.innerText = "Completed" + task.completedDate;
    //     taskDiv.appendChild(completed);
    // }

    // if(task.status !== "done"){
    //     const due = document.createElement("div");
    //     due.innerText = "Due: " + task.dueDate;
    //     taskDiv.appendChild(due);
    // }
  });
}

async function createTask() {
  const title = prompt("Enter task title");
  // const dueDate = prompt("Enter due date (YYYY-MM-DD)");

  if (!title) return;

  await fetch("https://task-manager-api-0r6d.onrender.com/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      status: "todo",
      project_id: currentProjectId,
    }),
  });

  // const taskDiv = document.createElement("div");
  // taskDiv.className = "task";
  // taskDiv.innerText = title;

  // document.getElementById("todo").appendChild(taskDiv)

  // const newTask = {
  //     title: title,
  //     status: "todo"
  // };

  // tasks.push(newTask);

  // saveTasks();

  loadTasks();
}

async function deleteTask(id) {
  await fetch(`https://task-manager-api-0r6d.onrender.com/tasks/${id}`, {
    method: "DELETE",
  });

  // tasks.splice(index, 1);
  // saveTasks();
  loadTasks();
}

// function saveTasks(){
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }

async function createProject() {
  const title = prompt("Enter the project title:");

  if (!title) return;

  await fetch("https://task-manager-api-0r6d.onrender.com/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
    }),
  });

  loadProjects();
}

async function deleteProject(id) {
  await fetch(`https://task-manager-api-0r6d.onrender.com/projects/${id}`, {
    method: "DELETE",
  });

  loadProjects();
}

loadProjects();
loadTasks();
