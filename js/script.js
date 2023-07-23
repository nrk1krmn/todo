const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
};

tasks.forEach((task) => {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;
                    
    taskList.insertAdjacentHTML('beforeend', taskHTML);
})

checkList();
 

// Добавление задач
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputText = input.value;

    const newTask = {
        id: Date.now(),
        text: inputText,
        done: false,
    };

    tasks.push(newTask);

    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title'

    const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${newTask.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;

    taskList.insertAdjacentHTML('beforeend', taskHTML);

    input.value = '';
    input.focus();

    checkList();
    saveLocal();
})


// Удаление задач 
taskList.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('.list-group-item');

        const idToDelete = Number(parentNode.id); 
        
        const index = tasks.findIndex((task) => task.id === idToDelete);

        tasks.splice(index, 1);
        parentNode.remove();
        
        checkList();
    }

    saveLocal();
})

// Выполнение задач
taskList.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list-group-item');

        const id = Number(parentNode.id);

        const task = tasks.find((task) => task.id === id);
        task.done = !task.done

        const taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
    }

    saveLocal();
})

function checkList() {
    if (tasks.length === 0) {
        taskList.insertAdjacentHTML("afterbegin", `
                <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/icon.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>
        `)
    } else {
        const emptyList = document.querySelector('#emptyList');
        emptyList ? emptyList.remove() : null;
    }

};

function saveLocal() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
};