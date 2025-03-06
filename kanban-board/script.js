document.addEventListener("DOMContentLoaded", () => {
  // const createTaskBtn = document.getElementById("create-task");
  const createBtn = document.getElementById("create-btn");
  const todoBoard = document.getElementById("todo-board");
  const inProgressBoard = document.getElementById("inprogress-board");
  const testingBoard = document.getElementById("testing-board");
  const completedBoard = document.getElementById("completed-board");
  const allBoards = document.querySelectorAll(".board");
  const createSerialNumber = document.getElementById("create-serial-number");

  const modal = document.getElementById("myModal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.querySelector(".close");
  const modalContent = modal.querySelector(".modal-content");
  const modalError = document.getElementById("modal-error");

  let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

  //generate serial numbers/id for each task
  function createSerialGenerator() {
    let serialNumber = 1;
    return function () {
      return serialNumber++;
    };
  }
  //call clouser function
  const generateSerial = createSerialGenerator();

  //open model
  function openModal() {
    modal.style.display = "block";
    requestAnimationFrame(() => {
      modal.classList.add("fade-in");
      modalContent.classList.add("show-content");
    });
  }

  //close model
  function closeModal() {
    console.log("close");
    modal.classList.remove("fade-in");
    modalContent.classList.remove("show-content");
    setTimeout(() => (modal.style.display = "none"), 300);
  }

  //window - model close
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.classList.remove("fade-in");
      modalContent.classList.remove("show-content");
      setTimeout(() => (modal.style.display = "none"), 300);
    }
  });

  //Generate Dynamic task item
  function generateTask(task) {
    const div = document.createElement("div");

    div.classList = "task";
    div.setAttribute("draggable", "true");

    div.addEventListener("dragstart", () => {
      div.classList.add("flying");
    });
    div.addEventListener("dragend", () => {
      div.classList.remove("flying");
    });

    div.innerHTML = `<span class="task-number">${task.taskNumber}</span><span class="task-disc">${task.taskDetails}</span>`;
    switch (task.taskBoard) {
      case "inprogress":
        inProgressBoard.appendChild(div);
        break;
      case "testing":
        testingBoard.appendChild(div);
        break;
      case "completed":
        completedBoard.appendChild(div);
        break;

      default:
        todoBoard.appendChild(div);
        break;
    }
  }

  //loadTasks

  function loadTasks() {
    // const uniqueArray = [...new Map(tasks.map(item => [item.id, item])).values()];

    // console.log(tasks)

    tasks.forEach((task) => {
      generateTask(task);
    });
  }

  //create task
  function createTask() {
    let taskNumber = generateSerial(); //clouser return method from 'createSerialGenerator'
    const taskDetails = document.getElementById("task-details");
    const taskBoard = document.getElementById("task-board").value;

    //validation
    if (taskDetails.value == "" && taskBoard == "") {
      modalError.innerText = "Please enter task name and board";
      return;
    }

    //create serial numbers for tasks, if already have items serial number will add +1 with current serial number
    const newTaskId = tasks.reduce((max, obj) => {
      highest = obj.taskNumber > max ? obj.taskNumber : max;

      if (highest < taskNumber) {
        return taskNumber;
      } else {
        return highest + 1;
      }
    }, 1);
    console.log(newTaskId);

    let newTask = {
      taskNumber: newTaskId,
      taskDetails: taskDetails.value,
      taskBoard: taskBoard,
    };
    tasks.push(newTask);
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));

    generateTask(newTask);
    closeModal();
  }

  allBoards.forEach((board) => {
    board.addEventListener("dragover", () => {
      const flyingElement = document.querySelector(".flying");
      board.appendChild(flyingElement);
    });
  });

  closeBtn.addEventListener("click", () => closeModal());
  openBtn.addEventListener("click", () => openModal());
  createBtn.addEventListener("click", () => createTask());

  loadTasks();
});
