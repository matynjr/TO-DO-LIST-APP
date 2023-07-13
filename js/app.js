// get the Element required ie input and listing tasks
const inputTask = document.getElementById("inputTask");
const taskList = document.getElementById("taskList");

//create a function that adds a task to a list

function addTask() {
  //get what is typed into the input field
  const inputTaskText = inputTask.value;

  //put the input task text into a list
  const addedTaskItem = document.createElement("li");
  addedTaskItem.innerText = inputTaskText;
  //displaying a list with the new list item
  taskList.appendChild(addedTaskItem);

  //remove the input from the field
  inputTask.value = "";
}

