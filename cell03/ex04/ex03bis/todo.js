$(document).ready(function () {
    const taskList = $('#ft_list');
    const addButton = $('#button');
    initializeTasks();

    addButton.on('click', function () {
        const newTask = prompt("Enter a new TO DO List:");
        if (newTask && newTask.trim() !== "") {
            createTask(newTask);
            storeTasks();
        } else {
            alert("Task name cannot be empty.");
        }
    });

    function createTask(taskContent) {
        const taskElement = $('<div>', {
            class: 'task',
            text: taskContent,
        }).css('transition', 'background 0.3s ease')
          .on('mouseenter', function () {
              $(this).css('background', '#f0f0f0');
          })
          .on('mouseleave', function () {
              $(this).css('background', 'white');
          })
          .on('click', function () {
              deleteTask($(this));
          });

        taskList.append(taskElement);
    }

    function storeTasks() {
        const taskArray = [];
        $('.task').each(function () {
            taskArray.push($(this).text());
        });
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