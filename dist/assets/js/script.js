const newTask = document.getElementById('new-task');
const add = document.getElementById('add');
const tasks = document.getElementById('tasks');
const todoBody = document.querySelector('.toDo-tasks');

// массив задач
const toDoList = document.querySelector('.toDo__list');
const toDoTask = document.querySelector('.toDo__task');
let task;
let comleted;
let taskMassive = [];

const localStorageTodosit = JSON.parse(localStorage.getItem('todo'));
window.addEventListener('load', () => {
  if (localStorageTodosit) {
    handlerWindowLoad();
  }
});

function handlerWindowLoad() {
  taskMassive = localStorageTodosit || [];

  tasksRender(taskMassive);

  renderTaskCount(taskMassive);
}

// add
add.addEventListener('click', () => {
  addToTasks();
});
document.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    addToTasks();
  }
});
function addToTasks() {
  const newTaskText = newTask.value;
  if (newTaskText && isNotHaveTask(newTaskText, taskMassive)) {
    addTask(newTaskText, taskMassive);
    newTask.value = '';
    tasksRender(taskMassive);
  }
}
//add task
function addTask(text, list) {
  const timestamp = Date.now();
  const task = {
    id: timestamp,
    text,
    isComplete: false,
  };
  list.push(task);

  localStorage.setItem('todo', JSON.stringify(list));
}

// проверка задач в массиве
function isNotHaveTask(text, list) {
  let isNotHave = true;

  list.forEach((task) => {
    if (task.text === text) {
      alert('Task already exists');
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

    let taskHtml = `<li id = "${task.id}" class="${cls}" draggable="true">
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
  </li>
`;
    htmlList = htmlList + taskHtml;
  });

  tasks.innerHTML = htmlList;

  renderTaskCount(taskMassive);
}



// меняем статус задачи на выполнено
// отслеживаем клик по задаче
tasks.addEventListener('click', (event) => {
  const target = event.target;

  const isCheckboxEl = target.classList.contains('toDo__checkbox-div');
  const isDeleteEl = target.classList.contains('toDo__task-del__img');
  if (isCheckboxEl) {
    const task = target.parentElement.parentElement;
    const taskId = task.getAttribute('id');
    changeTaskStatus(taskId, taskMassive);
    tasksRender(taskMassive);
    renderTaskCount(taskMassive);
    localStorage.setItem('todo', JSON.stringify(taskMassive));
  }
  if (isDeleteEl) {
    const task = target.parentElement.parentElement;
    const taskId = task.getAttribute('id');
    deleteTask(taskId, taskMassive);
    tasksRender(taskMassive);
    renderTaskCount(taskMassive);
  }
});
// функция изменения статуса задачи
function changeTaskStatus(id, list) {
  list.forEach((task) => {
    if (task.id == id) {
      task.isComplete = !task.isComplete;
    }
  });
}

//удаление задачи
function deleteTask(id, list) {
  list.forEach((task, idx) => {
    if (task.id == id) {
      list.splice(idx, 1);
      localStorage.setItem('todo', JSON.stringify(list));
    }
  });
}

// количество задач
function renderTaskCount(list) {
  const count = document.getElementById('count');

  count.innerHTML = list.length;
}

// btn show
const taskArea = document.querySelector('.toDo-tasks');
if (taskArea) {
  const btnArea = taskArea.querySelector('.toDo-tasks__menu');
  if (btnArea) {
    btnArea.querySelector('.completed').addEventListener('click', () => {
      taskArea.querySelectorAll('.toDo__task').forEach((elem) => {
        if (elem.classList.contains('toDo__task_complete')) {
          elem.style.display = 'flex';
        } else {
          elem.style.display = 'none';
        }
      });
    });
    btnArea.querySelector('.active').addEventListener('click', () => {
      taskArea.querySelectorAll('.toDo__task').forEach((elem) => {
        elem.style.display = 'flex';
        if (elem.classList.contains('toDo__task_complete')) {
          elem.style.display = 'none';
        }
      });
    });

    btnArea.querySelector('.all').addEventListener('click', () => {
      taskArea.querySelectorAll('.toDo__task').forEach((elem) => {
        elem.style.display = 'flex';
      });
    });

    btnArea.querySelector('.toDo-clear__btn').addEventListener('click', () => {
      taskArea.querySelectorAll('.toDo__task_complete').forEach((el) => {
        el.remove();
        const taskId = el.getAttribute('id');
        deleteTask(taskId, taskMassive);

        renderTaskCount(taskMassive);
      });
    });
  }
}

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

//drop

const list = document.querySelector('.toDo__list');
Sortable.create(list, {
  animation: 150,
  store: {
    get: function (sortable) {
      const order = localStorage.getItem(sortable.options.group);
      return order ? order.split('|') : [];
    },
    set: function (sortable) {
      const order = sortable.toArray();
      localStorage.setItem(sortable.options.group, order.join('|'));
    },
  },
});



// list.forEach((element, index) => {
//   if (element.className.contains('toDo__task')) {
//     console.log(element[index - 1].classList);
//   }
// });

function hideArea() {
  const hideBlock = document.querySelector('.hide');
  const oldBlock = document.querySelector('.toDo-folders');

  while (oldBlock.childNodes.length != 0)
    hideBlock.appendChild(oldBlock.childNodes[0]);
}
if (window.matchMedia('(max-width: 510px)').matches) {
  hideArea();
}