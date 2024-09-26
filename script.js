const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const deleteSelectedBtn = document.getElementById("delete-selected");
const completeSelectedBtn = document.getElementById("complete-selected");
const taskActionsGlobal = document.getElementById("task-actions-global");

addTaskBtn.addEventListener("click", addTask);
deleteSelectedBtn.addEventListener("click", deleteSelectedTasks);
completeSelectedBtn.addEventListener("click", completeSelectedTasks);

function addTask() {
    const taskText = taskInput.value;
    const taskDateValue = taskDate.value;
    const taskTimeValue = taskTime.value;

    // Ensure the task description and date are not empty
    if (taskText.trim() === '' || taskDateValue === '') {
        alert('Please enter task details and select a date.');
        return;
    }

    const taskItem = document.createElement("li");

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    const taskTitle = document.createElement("span");
    taskTitle.textContent = taskText;

    const taskDateTimeDisplay = document.createElement("span");
    taskDateTimeDisplay.classList.add("task-date-time");

    const displayTime = taskTimeValue ? convertTo12HourFormat(taskTimeValue) : 'No Time';
    taskDateTimeDisplay.textContent = `Date: ${new Date(taskDateValue).toLocaleDateString()}, Time: ${displayTime}`;

    taskDetails.appendChild(taskTitle);
    taskDetails.appendChild(taskDateTimeDisplay);

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", () => editTask(taskItem, taskTitle, taskDateTimeDisplay));

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("complete");
    completeButton.addEventListener("click", () => completeTask(taskItem));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteTask(taskItem));

    const selectCheckbox = document.createElement("input");
    selectCheckbox.type = "checkbox";
    selectCheckbox.classList.add("select-task");
    selectCheckbox.addEventListener("change", toggleActionButtonsVisibility); // Listen to checkbox changes

    taskActions.appendChild(selectCheckbox);
    taskActions.appendChild(editButton);
    taskActions.appendChild(completeButton);
    taskActions.appendChild(deleteButton);

    taskItem.appendChild(taskDetails);
    taskItem.appendChild(taskActions);
    taskList.appendChild(taskItem);

    taskItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Clear input fields after adding the task
    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
}

function editTask(taskItem, taskTitle, taskDateTimeDisplay) {
    const newTaskText = prompt("Edit your task", taskTitle.textContent);
    const currentDateTime = taskDateTimeDisplay.textContent.split(", ");
    const currentDate = currentDateTime[0].split(": ")[1];
    const currentTime = currentDateTime[1].split(": ")[1];

    const newTaskDate = prompt("Edit your date (yyyy-mm-dd)", currentDate);
    const newTaskTime = prompt("Edit your time (hh:mm AM/PM) or leave empty to keep current time", currentTime);

    if (newTaskText) {
        taskTitle.textContent = newTaskText;
    }

    const displayTime = newTaskTime ? convertTo12HourFormat(newTaskTime) : currentTime;
    taskDateTimeDisplay.textContent = `Date: ${newTaskDate}, Time: ${displayTime}`;
}

function completeTask(taskItem) {
    taskItem.classList.toggle("completed");
}

function deleteTask(taskItem) {
    taskItem.remove();
    toggleActionButtonsVisibility(); // Ensure buttons are hidden if needed
}

function deleteSelectedTasks() {
    const selectedTasks = document.querySelectorAll(".select-task:checked");
    selectedTasks.forEach((checkbox) => {
        checkbox.closest("li").remove();
    });
    toggleActionButtonsVisibility(); // Ensure buttons are hidden if needed
}

function completeSelectedTasks() {
    const selectedTasks = document.querySelectorAll(".select-task:checked");
    selectedTasks.forEach((checkbox) => {
        checkbox.closest("li").classList.add("completed");
    });
    toggleActionButtonsVisibility(); // Ensure buttons are hidden if needed
}

function toggleActionButtonsVisibility() {
    const selectedTasks = document.querySelectorAll(".select-task:checked");
    if (selectedTasks.length > 0) {
        taskActionsGlobal.style.display = "flex"; // Show the action buttons
    } else {
        taskActionsGlobal.style.display = "none"; // Hide the action buttons
    }
}

// Convert 24-hour time to 12-hour format with AM/PM
function convertTo12HourFormat(time) {
    const [hour, minute] = time.split(':');
    let hours = parseInt(hour);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for AM/PM
    return `${hours}:${minute} ${ampm}`;
}
