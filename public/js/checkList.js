async function fetchTasks() {
  try {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();

    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";

    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.textContent = task.details; 
      taskListElement.appendChild(taskItem);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchTasks);
