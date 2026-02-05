

  //========phakley==========//
var tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks === null) {
  tasks = [];
}

var editTaskId = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


//============phanith===========//
function addTask() {
  var name = document.getElementById("taskName").value;
  var start = document.getElementById("startDate").value;
  var end = document.getElementById("endDate").value;

  if (name === "") {
    alert("Task name is required!");
    return;
  }

  var task = {
    id: Date.now(),
    name: name,
    start: start,
    end: end,
    done: false
  };

  tasks.push(task);
  

  document.getElementById("taskName").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";

  saveTasks();
  renderTasks();
  updateCounts();
}


//============phakley===========//

function renderTasks() {
  var list = document.getElementById("taskList");
  list.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    var div = document.createElement("div");
    div.className = "task";

    if (task.done === true) {
      div.className += " done";
    }

    div.innerHTML =
      '<div class="task-info">' +
        '<strong>' + task.name + '</strong><br>' +
        '<small>📅 ' + (task.start || "?") + ' to ' + (task.end || "?") + '</small>' +
      '</div>' +
      '<div class="actions">' +
        '<button onclick="editTask(' + task.id + ')">Edit</button>' +
        '<button onclick="toggleDone(' + task.id + ')">' +
          (task.done ? "Undo" : "Done") +
        '</button>' +
        '<button class="delete-btn" onclick="deleteTask(' + task.id + ')">Delete</button>' +
      '</div>';

    list.appendChild(div);
  }
}


///============phakley===========//
function editTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      document.getElementById("taskName").value = tasks[i].name;
      document.getElementById("startDate").value = tasks[i].start;
      document.getElementById("endDate").value = tasks[i].end;
      editTaskId = id;
      break;
    }
  }
  

  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "block";
}


///============phakley===========//

function updateTask() {
  if (editTaskId === null) return;

  var name = document.getElementById("taskName").value;
  var start = document.getElementById("startDate").value;
  var end = document.getElementById("endDate").value;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === editTaskId) {
      tasks[i].name = name;
      tasks[i].start = start;
      tasks[i].end = end;
      break;
    }
  }

  editTaskId = null;

  document.getElementById("taskName").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";

  document.getElementById("addBtn").style.display = "block";
  document.getElementById("updateBtn").style.display = "none";

  saveTasks();
  renderTasks();
  updateCounts();
}


//==========sothearoth============//
function toggleDone(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
      break;
    }
  }

  saveTasks();
  renderTasks();
  updateCounts();
}

function deleteTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break;
    }
  }

  saveTasks();
  renderTasks();
  updateCounts();
}

///============Darayuth===========//
function updateCounts() {
  var total = tasks.length;
  var done = 0;
  var active=0;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].done === true) {
      done++;
    }else{
      active++;
    }
  }
   
  document.getElementById("totalCount").innerText = total;
  document.getElementById("doneCount").innerText = done;
  document.getElementById("activeCount").innerText = active;
}

renderTasks();
updateCounts();
