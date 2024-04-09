//Variables
const addTask = document.getElementById('add-task');
const taskContainer = document.getElementById('task-container');
const inputTask = document.getElementById('input-task');

// Function to create a task
function createTask(taskText) {
    let task = document.createElement('div');
    task.classList.add('task');

    let li = document.createElement('li');
    li.innerText = taskText;
    task.appendChild(li);

    let checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkButton.classList.add('checkTask');
    task.appendChild(checkButton);

    let editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editButton.classList.add('editTask');
    task.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add('deleteTask');
    task.appendChild(deleteButton);

    if (taskText === "") {
        alert('Please enter a task');
    } else {
        taskContainer.appendChild(task); //to show the task on screen
    }

    inputTask.value = ''; //to erase the value after entering it

    checkButton.addEventListener('click', function () {
        checkButton.parentElement.style.textDecoration = "line-through";
    });

    deleteButton.addEventListener('click', function () {
        deleteButton.parentElement.remove();
    });



//Event listener for add btn
addTask.addEventListener('click', function () {
    createTask(inputTask.value);
    console.log("button was clicked");
});
