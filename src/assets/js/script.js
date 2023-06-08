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

  // const toDo = toDoList.querySelectorAll('.check');
  // // console.log(toDo);
  // toDo.forEach((e) => {
  //   const checkedToDo = e.hasAttribute('checked');

  //   if (checkedToDo === true) {
  //     comleted = checkedToDo;
  //     forCopleted.push(comleted);
  //   }
  // });
}
console.log(forCopleted);
// console.log(forTask);
const taskMassive = forTask;
renderTaskCount(taskMassive);

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

    // console.log(checked);

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
  renderTaskCount(taskMassive);
}
// console.log(taskMassive);

// меняем статус задачи на выполнено
// отслеживаем клик по задаче
tasks.addEventListener('click', (event) => {
  const target = event.target;

  const isCheckboxEl = target.classList.contains('toDo__checkbox-div__innner');
  const isDeleteEl = target.classList.contains('toDo__task-del__img');
  console.log(isDeleteEl);
  if (isCheckboxEl) {
    const task = target.parentElement.parentElement.parentElement;
    const taskId = task.getAttribute('id');
    changeTaskStatus(taskId, taskMassive);
    tasksRender(taskMassive);
    renderTaskCount(taskMassive);
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
    console.log(list.isComplete);
  });
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

  count.innerHTML = list.length;
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
