const tasks = [];

function eventHandler() {
  const addTaskBtn = document.querySelector(".js-add-button");
  addTaskBtn.addEventListener("click", () => {
    addProject();
  });

  const allBtn = document.querySelector(".js-all");
  allBtn.addEventListener("click", () => {
    displayTasks("all");
  });

  const pendingBtn = document.querySelector(".js-pending");
  pendingBtn.addEventListener("click", () => {
    displayTasks("pending");
  });

  const completedBtn = document.querySelector(".js-completed");
  completedBtn.addEventListener("click", () => {
    displayTasks("completed");
  });
}

//add project
function addProject() {
  const taskName = document.querySelector("#newTask").value;
  const taskPriority = document.querySelector("#priority").value;

  tasks.push({
    name: taskName,
    priority: taskPriority,
    status: "pending",
  });

  displayTasks("all");
  displayStats();
  document.querySelector("#newTask").value = "";
}

function displayStats() {
  let total = tasks.length;
  let completed = 0;
  let pending = 0;

  tasks.forEach((task) => {
    if (task.status === "completed") {
      completed++;
    } else {
      pending++;
    }
  });

  document.querySelector(".js-total-tasks").innerHTML = total;
  document.querySelector(".js-total-pending").innerHTML = pending;
  document.querySelector(".js-total-completed").innerHTML = completed;
}

function displayTasks(status) {
  if (status === "all") {
    display(tasks);
  } else {
    const reduced = tasks.filter((task) => {
      return task.status === status;
    });

    display(reduced);
  }
}

function display(arr) {
  let list = "";
  if (arr.length === 0) {
    list = "No Tasks Found";
  }
  arr.forEach((task) => {
    list += `
                <div class='task-card'>

                    <h2>${task.name}</h2>
                    <p>${task.priority}</p>
                    <button class="completedBtn" onclick ="changeStatus(${tasks.indexOf(task)})">Complete</button>
                    <button class="js-delete" onclick="deleteTask(${tasks.indexOf(task)})" >Delete</button>
                </div>
            `;
  });

  document.querySelector(".js-projects-display").innerHTML = list;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks("all");
  displayStats();
}

function changeStatus(index) {
  tasks[index].status = "completed";
  if (document.querySelector(".completedBtn").innerHTML === "complete") {
    document.querySelector(".completedBtn").innerHTML = "completed";
  }
  displayStats();
}

document.addEventListener("DOMContentLoaded", () => {
  eventHandler();
  displayStats();
});
