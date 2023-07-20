// get the Element required, i.e., input and listing tasks
const inputTask = document.getElementById("inputTask");
const taskList = document.getElementById("taskList");

// create a function that adds a task to a list
function addTask() {

  // get what is typed into the input field
  const inputTaskText = inputTask.value.trim();
// If the input field is empty, add the 'required' attribute
  if (inputTaskText === "") {
    inputTask.setAttribute("required", "true");
    
  }else if (localStorage.getItem("myStoredListItemsString")) {
    // if the item exists, it is parsed into a JSON object and stored in the 'items' variable
    let items = JSON.parse(localStorage.getItem("myStoredListItemsString"));

    // add a new item that was obtained from the input to the 'items' list
    items.push(inputTaskText);
    // store the updated 'items' into a string and save them back to local storage
    localStorage.setItem("myStoredListItemsString", JSON.stringify(items));
  } else {
    // else, if there is nothing in the local storage list, set it
    localStorage.setItem(
      "myStoredListItemsString",
      JSON.stringify([inputTaskText])
    );
  }

  // displaying the stored list
  const retrievedItems = localStorage.getItem("myStoredListItemsString");

  // convert the retrieved items string back to an array
  const itemsArray = JSON.parse(retrievedItems);

  // clear the task list before adding the updated tasks
  taskList.innerHTML = "";

  // loop through the items array and create list items for each task
  itemsArray.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    taskList.appendChild(listItem);
  });

  // clear input field after adding a task
  inputTask.value = "";
}

// call the addTask function when the page finishes loading
window.addEventListener("load", addTask);
