//Declare variables
let pendingTasks;
let pendingTaskDates;
let completedTasks;
let completedTaskDates;
let completedTaskDueDates;

//Pull data from local storage
function pullData() {
  localStorage.getItem("localPendingTasks")
    ? (pendingTasks = JSON.parse(localStorage.getItem("localPendingTasks")))
    : (pendingTasks = []);

  localStorage.getItem("localPendingTaskDates")
    ? (pendingTaskDates = JSON.parse(
        localStorage.getItem("localPendingTaskDates")
      ))
    : (pendingTaskDates = []);

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
  localStorage.setItem(
    "localPendingTaskDates",
    JSON.stringify(pendingTaskDates)
  );
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
  pendingTasks.push(document.getElementById("new-task-text").value);
  pendingTaskDates.push(document.getElementById("new-task-date").value);
}

//Refresh pending and completed lists
function refreshLists() {
  let pendingDescriptionOutput = "";
  let pendingDueDateOutput = "";
  let completedDescriptionOutput = "";
  let completedDueDateOutput = "";
  let completedDateOutput = "";
  let checkMark = "";

  for (let i = 0; i < pendingTasks.length; i++) {
    // pendingDescriptionOutput += "<li>" + pendingTasks[i] + "</li>";
    let ol = document.getElementById("pending-tasks");
    let li = document.createElement("li");
    let newText = pendingTasks[i];
    //   li.setAttribute('id',i);
    li.appendChild(document.createTextNode(newText));
    ol.appendChild(li);
    console.log(ol);
  }

  for (let i = 0; i < pendingTaskDates.length; i++) {
    pendingDueDateOutput += "<li>" + pendingTaskDates[i] + "</li>";
    checkMark += '<li class="check-mark-list" id="' + i + '">&#10004</li>';
  }

  for (let i = 0; i < completedTasks.length; i++) {
    completedDescriptionOutput += "<li>" + completedTasks[i] + "</li>";
  }

  for (let i = 0; i < completedTaskDates.length; i++) {
    completedDateOutput += "<li>" + completedTaskDates[i] + "</li>";
  }

  for (let i = 0; i < completedTaskDueDates.length; i++) {
    completedDueDateOutput += "<li>" + completedTaskDueDates[i] + "</li>";
  }

  pendingDescriptionOutput != null
    ? (document.getElementById(
        "pending-tasks"
      ).innerHTML = pendingDescriptionOutput)
    : void 0;
  pendingDueDateOutput != null
    ? (document.getElementById(
        "pending-due-date"
      ).innerHTML = pendingDueDateOutput)
    : void 0;
  completedDescriptionOutput != null
    ? (document.getElementById(
        "completed-tasks"
      ).innerHTML = completedDescriptionOutput)
    : void 0;
  completedDateOutput != null
    ? (document.getElementById(
        "completed-date"
      ).innerHTML = completedDateOutput)
    : void 0;
  completedDueDateOutput != null
    ? (document.getElementById(
        "completed-due-date"
      ).innerHTML = completedDueDateOutput)
    : void 0;
  checkMark != null
    ? (document.getElementById("mark-complete").innerHTML = checkMark)
    : void 0;
}

//Add Task button event
const addButton = document.getElementById("new-task-button");
addButton.addEventListener("click", function () {
  addTask();
  pushData();
  refreshLists();
});

//Clear button event
const clearCompletedButton = document.getElementById("clear-button");
addButton.addEventListener("click", function () {
  completedTasks = "";
  completedTaskDates = "";
  completedTaskDueDates = "";
  localStorage.removeItem("localCompletedTasks");
  localStorage.removeItem("localCompletedTaskDates");
  localStorage.removeItem("localCompletedTaskDueDates");
  refreshLists();
});

//Mark complete event
document.querySelectorAll(".check-mark-list").forEach((item) => {
  item.addEventListener("click", function () {
    console.log("Working!");
  });
});

/*
const markCompleteClick = document.getElementById("mark-complete");
markCompleteClick.addEventListener("click", function () {
  pushData();
  refreshLists();
});
*/

pullData();
refreshLists();
