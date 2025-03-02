const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const emptyList = document.getElementById("empty-list");
let taskList = document.getElementById("task-list");
let completedTasksCount = document.getElementById("completed-tasks");
let totalTasksCount = document.getElementById("total-tasks");

addButton.addEventListener("click", function () {
  //creating dynamic li element
  let li = document.createElement("li");
  li.classList.add("task-item");

  //creating dynamic span element
  let span = document.createElement("span");
  span.classList.add("task-text");

  //creating dynamic checkbox
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "dynamicCheckbox";

  //creating dynamic button element
  let delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.classList.add("delete-button");

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);

  if (!taskInput == "") {
    span.textContent = taskInput.value.trim();
  }

  //completed task count
  let completedCount = 0;
  checkbox.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(
      "#task-list .task-item input[type='checkbox']"
    );
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        completedCount = completedCount + 1;
        completedTasksCount.innerHTML = `Completed: ${completedCount}`;
        span.classList.add("strikethrough");
      } else {
        completedCount = completedCount - 1;
        completedTasksCount.innerHTML = `Completed: ${completedCount}`;
        span.classList.remove("strikethrough");
      }
    });
  });

  //total task count

  totalTasksCount.innerHTML = `Total tasks: ${taskList.children.length}`;

  //delete task
  delBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    totalTasksCount.innerHTML = `Total tasks: ${taskList.children.length - 1}`;

    if (taskList.children.length !== 0) {
      emptyList.classList.remove("d-none");
    } 
    
  });

  //add new list item
  taskList.appendChild(li);
  //clear task input
  taskInput.value = "";


  if (taskList.children.length !== 0) {
    emptyList.classList.add("d-none");
  } 

});
