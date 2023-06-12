const taskContainer = document.querySelector(".task-container");
const input = document.querySelector(".input");
const submit = document.querySelector(".submit");
const noOfTask = document.querySelector(".no-of-task");

let tasks = [];

let storedTasks = JSON.parse(localStorage.getItem("taskItems"));

function save() {
  localStorage.setItem("taskItems", JSON.stringify(tasks));
}

if (storedTasks) {
  tasks = storedTasks;
  renderItems();
}

submit.addEventListener("click", () => {
  addTodo();
  save();
  renderItems();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submit.click();
  }
});

function addTodo() {
  if (input.value) {
    tasks.push(input.value);
    input.value = "";
  } else {
    alert("no task was added");
  }
}

function renderItems() {
  noOfTask.textContent = `you have ${tasks.length} ${
    tasks.length < 2 ? "task" : "tasks"
  } remaining`;
  let items = "";
  storedTasks.forEach((task, index) => {
    items += `<li>
                <p>${task} </p>
                <i class="fa-solid fa-trash" onclick = del(${index})></i>
            </li>`;
  });

  taskContainer.innerHTML = items;
}

function del(num) {
  tasks.splice(num, 1);
  save();
  renderItems();
}
