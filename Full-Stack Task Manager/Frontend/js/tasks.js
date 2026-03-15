const tasks = [
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

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";

        deleteBtn.onclick = function(){
            deleteTask(index);
        };

        taskDiv.appendChild(deleteBtn);

        if(task.status === "todo"){
            document.getElementById("todo").appendChild(taskDiv);
        }

        if(task.status === "inprogress"){
            document.getElementById("inprogress").appendChild(taskDiv);
        }
        if(task.status === "done"){
            document.getElementById("done").appendChild(taskDiv);
        }


    });
}

function createTask(){

    const title = prompt("Enter task title");

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

    
    loadTasks();
}

function deleteTask(index){
    tasks.splice(index, 1);
    loadTasks();
}

loadTasks();