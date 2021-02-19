const taskList = document.querySelector('.taskList');

const getTasks = () => {
    for(let i = 1; i <= localStorage.length; i++) {
        taskList.insertAdjacentHTML(
            'beforeend',
             `<div class="task">
                     <div class="index">${i}.</div>
                     <div class="text">${localStorage.getItem(i.toString())}</div>
                     <img class="close" src="./close.png" alt="close">
                   </div>
                   <hr>`
        );
    }
}

getTasks();

const add = document.querySelector('.add');
const newTaskInput = document.querySelector('.newTaskInput');

add.onclick = () => {
    if (newTaskInput.value) {
        localStorage.setItem((localStorage.length + 1).toString(), newTaskInput.value);
        newTaskInput.value = '';
        location.reload();
    }
}

newTaskInput.onkeydown = (event) => {
    if (event.target.value && event.key === 'Enter') {
        localStorage.setItem((localStorage.length + 1).toString(), event.target.value);
        event.target.value = '';
        location.reload();
    }
}

const closes = document.querySelectorAll('.close');

taskList.onclick = (event) => {
    for (let i = 0; i < closes.length; i++) {
        if (event.target === closes[i]) {
            const indexText = closes[i].parentElement.firstElementChild.textContent;
            const key = indexText.match(/\d/g).join('')
            localStorage.removeItem(key);
            const length = localStorage.length;
            for(let i = Number(key); i <= length; i++) {
                localStorage.setItem(i.toString(), localStorage.getItem((i + 1).toString()));
            }
            localStorage.removeItem((length + 1).toString())
            location.reload();
        }
    }
}

const button = document.querySelector('button');

button.onclick = () => {
    localStorage.clear();
    location.reload();
}