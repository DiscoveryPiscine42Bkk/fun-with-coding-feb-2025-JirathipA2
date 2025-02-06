document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById('ft_list');
    const addButton = document.getElementById('button');
    initializeTasks();

addButton.addEventListener('click', () => {
    const newTask = prompt("Enter a new TO DO List:");
        if (newTask && newTask.trim() !== "") {
            createTask(newTask);
            storeTasks();
        } else {
            alert("Task name cannot be empty.");
        }
});

function createTask(taskContent) {
    const taskElement = document.createElement('div');

    Object.assign(taskElement, {
        className: 'task',
        textContent: taskContent,
    });
    taskElement.style.transition = "background 0.3s ease";
    taskElement.addEventListener('mouseenter', () => taskElement.style.background = "#f0f0f0");
    taskElement.addEventListener('mouseleave', () => taskElement.style.background = "white");
    taskElement.onclick = () => deleteTask(taskElement);
    taskList.appendChild(taskElement);
}

function storeTasks() {
    const taskArray = Array.from(document.querySelectorAll('.task'))
                               .map(task => task.textContent);
    document.cookie = `tasks=${JSON.stringify(taskArray)}; path=/`;
}

function initializeTasks() {
    const cookies = document.cookie.split('; ');
    const storedTasks = cookies.find(cookie => cookie.startsWith('tasks='));
        if (storedTasks) {
            const taskData = JSON.parse(storedTasks.split('=')[1]);
            taskData.forEach(task => createTask(task));
        }
}

function deleteTask(taskElement) {
    if (confirm("Are you sure you want to remove this TO DO?")) {
            taskElement.remove();
            storeTasks();
    }
  }
});
