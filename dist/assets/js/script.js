const newTask = document.getElementById('new-task');
const add = document.getElementById('add');
const tasks = document.getElementById('tasks');

// массив задач
const toDoList = document.querySelector('.toDo__list');
const forTask = [];
const forCopleted = [];
let task;
let comleted;
if (toDoList) {
  const toDoTask = toDoList.querySelectorAll('.toDo__task');

  toDoTask.forEach((el) => {
    const textContent = el.querySelector('.toDo__task-text').innerText;
    const idOld = el.id;
    task = {
      id: idOld,
      text: textContent,
      isComplete: false,
    };
    // console.log(task);
    forTask.push(task);
  });
}
// console.log(forCopleted);
// console.log(forTask);
const taskMassive = forTask;
renderTaskCount(forCopleted);

// add
add.addEventListener('click', () => {
  const newTaskText = newTask.value;
  if (newTaskText && isNotHaveTask(newTaskText, taskMassive)) {
    addTask(newTaskText, taskMassive);
    newTask.value = '';
    tasksRender(taskMassive);
  }
});

//add task
function addTask(text, list) {
  const timestamp = Date.now();
  const task = {
    id: timestamp,
    text,
    isComplete: false,
  };
  list.push(task);
}

// проверка задач в массиве
function isNotHaveTask(text, list) {
  let isNotHave = true;

  list.forEach((task) => {
    if (task.text === text) {
      alert('задача существует');
      isNotHave = false;
    }
  });
  return isNotHave;
}

// вывод задач
function tasksRender(list) {
  let htmlList = '';
  list.forEach((task) => {
    const cls = task.isComplete
      ? 'toDo__task toDo__task_complete'
      : 'toDo__task';
    const checked = task.isComplete ? 'checked' : '';

    // console.log(cls);
    // cls.forEach((e) => {
    //   if (e == true) {
    //     forCopleted.push(e);
    //   }
    // });

    const taskHtml = `<div id = "${task.id}" class="${cls}">
    <label class="toDo__checkbox">
      <input type="checkbox" ${checked} />
      <div class="toDo__checkbox-div">
        <div class="toDo__checkbox-div__innner"></div>
      </div>
    </label>
    <div class="toDo__task-text">${task.text}</div>
    <button class="toDo__task-del">
                      <img
                        class="toDo__task-del__img"
                        src="./assets/images/close.svg"
                        alt="close"
                      />
    </button>
  </div>
`;
    htmlList = htmlList + taskHtml;
  });

  tasks.innerHTML = htmlList;
  renderTaskCount(forCopleted);
}
// console.log(comleted);
// console.log(forCopleted);

// меняем статус задачи на выполнено
// отслеживаем клик по задаче
tasks.addEventListener('click', (event) => {
  const target = event.target;

  const isCheckboxEl = target.classList.contains('toDo__checkbox-div__innner');
  const isDeleteEl = target.classList.contains('toDo__task-del__img');
  // console.log(isDeleteEl);
  if (isCheckboxEl) {
    const task = target.parentElement.parentElement.parentElement;
    const taskId = task.getAttribute('id');
    changeTaskStatus(taskId, taskMassive);
    tasksRender(taskMassive);
    renderTaskCount(forCopleted);
    console.log(task);
  }
  if (isDeleteEl) {
    const task = target.parentElement.parentElement;
    const taskId = task.getAttribute('id');
    deleteTask(taskId, taskMassive);
    tasksRender(taskMassive);
    renderTaskCount(forCopleted);
  }
});
// функция изменения статуса задачи
function changeTaskStatus(id, list) {
  list.forEach((task) => {
    if (task.id == id) {
      task.isComplete = !task.isComplete;
      // if (task.value && isNotHaveTask(newTaskText, taskMassive)) {
        forCopleted.push(task);
      // }
    }
  });
  console.log(forCopleted.length);
}

//удаление задачи
function deleteTask(id, list) {
  list.forEach((task, idx) => {
    if (task.id == id) {
      list.splice(idx, 1);
    }
  });
}

// количество задач
function renderTaskCount(list) {
  const count = document.getElementById('count');

  count.innerHTML = taskMassive.length - list.length;
  //
}
// if (toDoList) {
//   c
//   complete.forEach((el) => {
//     const textContent = el.querySelector('.toDo__task-text').innerText;
//     const idOld = el.id;

//     task = {
//       id: idOld,
//       text: textContent,
//     };
//     console.log(task);
//   });
// }

// durk

const header__btn = document.querySelector('.header-icon');
header__btn.addEventListener('click', (event) => {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDark();
});
function addDark() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  } catch (err) {}
}
addDark();