let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {title: "Design UI", status: "todo"},
    {title: "Build backend", status: "inprogress"},
    {title: "Deploy App", status: "done"}
];

function loadTasks(){

    document.getElementById("todo").innerHTML = "";
    document.getElementById("inprogress").innerHTML = "";
    document.getElementById("done").innerHTML = "";

    tasks.forEach((task, index) => {
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

        statuses.forEach(status => {

            const option = document.createElement("option");
            option.value = status;
            option.innerText = status;

            if(status === task.status){
                option.selected = true;
            }

            statusSelect.appendChild(option);
        });

        // Update Status
        statusSelect.onchange = function(){

            // const newStatus = statusSelect.value;

            tasks[index].status = statusSelect.value;

            // if(newStatus === "done"){
            //     tasks[index].completedDate = new Date().toISOString().split("T")[0];
            // }

            loadTasks();
        };

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";

        deleteBtn.onclick = function(){
            deleteTask(index);
        };

        // Adding elements to task
        taskDiv.appendChild(statusSelect);
        taskDiv.appendChild(deleteBtn);
        // taskDiv.appendChild(due);
        // taskDiv.appendChild(days);


        if(task.status === "todo"){
            document.getElementById("todo").appendChild(taskDiv);
        }

        if(task.status === "inprogress"){
            document.getElementById("inprogress").appendChild(taskDiv);
        }

        if(task.status === "done"){
            document.getElementById("done").appendChild(taskDiv);
        }

        if(task.status === "done" && task.completedDate){
            const completed = document.createElement("div");
            completed.innerText = "Completed" + task.completedDate;
            taskDiv.appendChild(completed);
        }

        // if(task.status !== "done"){
        //     const due = document.createElement("div");
        //     due.innerText = "Due: " + task.dueDate;
        //     taskDiv.appendChild(due);
        // }

    });
}

function createTask(){

    const title = prompt("Enter task title");
    // const dueDate = prompt("Enter due date (YYYY-MM-DD)");

    if(!title) return;

    // const taskDiv = document.createElement("div");
    // taskDiv.className = "task";
    // taskDiv.innerText = title;

    // document.getElementById("todo").appendChild(taskDiv)

    const newTask = {
        title: title,
        status: "todo"
    };

    tasks.push(newTask);

    saveTasks();
    
    loadTasks();
}

function deleteTask(index){
    tasks.splice(index, 1); 
    saveTasks();
    loadTasks();
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



loadTasks();