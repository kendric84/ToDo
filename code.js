//Declare variables
let pendingTasks;
let pendingDueDates;
let completedTasks;
let completedTaskDates;
let completedTaskDueDates;

//Pull data from local storage
function pullData() {
  localStorage.getItem("localPendingTasks")
    ? (pendingTasks = JSON.parse(localStorage.getItem("localPendingTasks")))
    : (pendingTasks = []);

  localStorage.getItem("localPendingDueDates")
    ? (pendingDueDates = JSON.parse(
        localStorage.getItem("localPendingDueDates")
      ))
    : (pendingDueDates = []);

  localStorage.getItem("localCompletedTasks")
    ? (completedTasks = JSON.parse(localStorage.getItem("localCompletedTasks")))
    : (completedTasks = []);

  localStorage.getItem("localCompletedTaskDates")
    ? (completedTaskDates = JSON.parse(
        localStorage.getItem("localCompletedTaskDates")
      ))
    : (completedTaskDates = []);

  localStorage.getItem("localCompletedTaskDueDates")
    ? (completedTaskDueDates = JSON.parse(
        localStorage.getItem("localCompletedTaskDueDates")
      ))
    : (completedTaskDueDates = []);
}

//Push data to local storage
function pushData() {
  localStorage.clear();
  localStorage.setItem("localPendingTasks", JSON.stringify(pendingTasks));
  localStorage.setItem("localPendingDueDates", JSON.stringify(pendingDueDates));
  localStorage.setItem("localCompletedTasks", JSON.stringify(completedTasks));
  localStorage.setItem(
    "localCompletedTaskDates",
    JSON.stringify(completedTaskDates)
  );
  localStorage.setItem(
    "localCompletedTaskDueDates",
    JSON.stringify(completedTaskDueDates)
  );
}

//Add a new task
function addTask() {
  if (document.getElementById("new-task-text").value == "" || document.getElementById("new-task-date").value == "") {
    alert("Enter a task and date to save")
  }
  else {
    pendingTasks.push(document.getElementById("new-task-text").value);
    document.getElementById("new-task-text").value = "";
    pendingDueDates.push(document.getElementById("new-task-date").value);
    document.getElementById("new-task-date").value = "";
  }  
}

//Refresh pending and completed lists
function refreshLists() {
  let checkMark = "";

  //Clear existing column entries
  let ol = document.getElementById("pending-tasks");
  while (ol.lastChild) {
    ol.removeChild(ol.lastChild);
  }
  //Repopulate column
  for (let i = 0; i < pendingTasks.length; i++) {
    let li = document.createElement("li");
    let newText = pendingTasks[i];
    li.setAttribute("id", i);
    li.appendChild(document.createTextNode(newText));
    ol.appendChild(li);
  }

  //Clear existing column entries
  ol = document.getElementById("pending-due-date");
  while (ol.lastChild) {
    ol.removeChild(ol.lastChild);
  }
  //Repopulate column
  for (let i = 0; i < pendingDueDates.length; i++) {
    let li = document.createElement("li");
    let newText = pendingDueDates[i];
    li.setAttribute("id", i);
    li.appendChild(document.createTextNode(newText));
    ol.appendChild(li);

    // I left this in because I couldn't make the appendChild approach work with the UTF code
    checkMark += '<li class="check-mark-list" id="' + i + '">&#10004</li>';
  }

  document.getElementById("mark-complete").innerHTML = checkMark;

  /* This dosen't work, the UTF code shows as a text string
  for (let i = 0; i < pendingDueDates.length; i++) {
    let ol = document.getElementById("mark-complete");
    let li = document.createElement("li");
    let newText = "&#10004";
    li.setAttribute('id',i);
    li.setAttribute('class',"check-mark-list");
    li.appendChild(document.createTextNode(newText));
    ol.appendChild(li);
  }
*/
  //Clear existing column entries
  ol = document.getElementById("completed-tasks");
  while (ol.lastChild) {
    ol.removeChild(ol.lastChild);
  }
  //Repopulate column
  for (let i = 0; i < completedTasks.length; i++) {
    let li = document.createElement("li");
    let newText = completedTasks[i];
    li.setAttribute("id", i);
    li.appendChild(document.createTextNode(newText));
    ol.appendChild(li);
  }

  //Clear existing column entries
  ol = document.getElementById("completed-due-date");
  while (ol.lastChild) {
    ol.removeChild(ol.lastChild);
  }
  //Repopulate column
  for (let i = 0; i < completedTaskDates.length; i++) {
    let li = document.createElement("li");
    let newText = completedTaskDates[i];
    li.setAttribute("id", i);
    li.appendChild(document.createTextNode(newText));
    ol.appendChild(li);
  }

  //Clear existing column entries
  ol = document.getElementById("completed-date");
  while (ol.lastChild) {
    ol.removeChild(ol.lastChild);
  }
  //Repopulate column
  for (let i = 0; i < completedTaskDueDates.length; i++) {
    let li = document.createElement("li");
    let newText = completedTaskDueDates[i];
    li.setAttribute("id", i);
    li.appendChild(document.createTextNode(newText));
    ol.appendChild(li);
  }

  //Set or reset mark complete click events
  let items = document.getElementsByClassName("check-mark-list");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      markComplete(items[i].id);
    });
  }
}

//Add Task button event
const addButton = document.getElementById("new-task-button");
addButton.addEventListener("click", function () {
  addTask();
  pushData();
  refreshLists();
});

//Clear completed button click event
const clearCompletedButton = document.getElementById("clear-completed-button");
clearCompletedButton.addEventListener("click", function () {
  completedTasks = [];
  completedTaskDates = [];
  completedTaskDueDates = [];
  localStorage.removeItem("localCompletedTasks");
  localStorage.removeItem("localCompletedTaskDates");
  localStorage.removeItem("localCompletedTaskDueDates");
  refreshLists();
});

//Clear all button click event
const clearAllButton = document.getElementById("clear-all-button");
clearAllButton.addEventListener("click", function () {
  localStorage.clear();
  pendingTasks = [];
  pendingDueDates = [];
  completedTasks = [];
  completedTaskDates = [];
  completedTaskDueDates = [];
  refreshLists();
});

pullData();
refreshLists();

//Mark a single item complete and move from pending to complete list
function markComplete(completedItemId) {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  completedTasks.push(pendingTasks[completedItemId]);
  completedTaskDueDates.push(pendingDueDates[completedItemId]);
  completedTaskDates.push(date);
  pendingTasks.splice(completedItemId, 1);
  pendingDueDates.splice(completedItemId, 1);
  pushData();
  refreshLists();
}
