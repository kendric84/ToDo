var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(xhttp.responseText);
    var pendingTasks = response.pendingTasks;

    var pendingDescriptionOutput = "";
    var pendingDueDateOutput = "";
    var checkMark = "";
    for (var i = 0; i < pendingTasks.length; i++) {
      pendingDescriptionOutput +=
        "<li>" + pendingTasks[i].description + "</li>";
    }
    for (var i = 0; i < pendingTasks.length; i++) {
      pendingDueDateOutput += "<li>" + pendingTasks[i].dueDate + "</li>";
      checkMark += "<li>&#10004</li>";
    }

    document.getElementById("pendingTasks").innerHTML = pendingDescriptionOutput;
    document.getElementById("pendingDueDate").innerHTML = pendingDueDateOutput;

    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      var completedTasks = response.completedTasks;

      var completedDescriptionOutput = "";
      var completedDueDateOutput = "";
      var completedDateOutput = "";
      for (var i = 0; i < completedTasks.length; i++) {
        completedDescriptionOutput +=
          "<li>" + completedTasks[i].description + "</li>";
      }

      for (var i = 0; i < completedTasks.length; i++) {
        completedDueDateOutput +=
          "<li>" + completedTasks[i].dueDate + "</li>";
      }

      for (var i = 0; i < completedTasks.length; i++) {
        completedDateOutput +=
          "<li>" + completedTasks[i].completedDate + "</li>";
      }

      document.getElementById("completedTasks").innerHTML = completedDescriptionOutput;
      document.getElementById("completedDueDate").innerHTML = completedDueDateOutput;
      document.getElementById("completedDate").innerHTML = completedDateOutput;
      document.getElementById("markComplete").innerHTML = checkMark;
    }
  }
};
xhttp.open("GET", "tasks.json", true);
xhttp.send();