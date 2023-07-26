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
  } else if (localStorage.getItem("myStoredListItemsString")) {
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
    //create a list item
    const listItem = document.createElement("li");
    listItem.textContent = item;

    //create delete button

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML ="<box-icon type='solid' name='message-square-x' class='delete-btn'></box-icon>";
    listItem.appendChild(deleteButton);

    //create edit button

    const editButton = document.createElement("button")
    editButton.innerHTML ="<box-icon type='solid' name='edit' class='edit-button'></box-icon>"
    listItem.appendChild(editButton)
    //add the list item to the list
    taskList.appendChild(listItem);
  });

  // clear input field after adding a task
  inputTask.value = "";
}

// Delete function
// Attach a click event listener to the todo list
taskList.addEventListener('click', function(event) {
  const clickedElement = event.target;

  // Check if the clicked element is the delete button
  if (clickedElement.classList.contains('delete-btn')) {
    // Get the parent <li> element, which is the task to be deleted
    const listItem = findParentListItem(clickedElement);

    if (listItem) {
      // Remove the <li> element from the todo list
      taskList.removeChild(listItem);

      // Update the items in localStorage after removing the task
      const retrievedItems = localStorage.getItem("myStoredListItemsString");
      const itemsArray = JSON.parse(retrievedItems);

      // Get the task text from the list item
      const taskText = listItem.textContent.trim();

      // Find the index of the task to be deleted
      const index = itemsArray.indexOf(taskText);

      // If the task is found, remove it from the array
      if (index !== -1) {
        itemsArray.splice(index, 1);
        // Save the updated array back to localStorage
        localStorage.setItem("myStoredListItemsString", JSON.stringify(itemsArray));
      }
    }
  }
});

//editing a list item
// Editing a list item
taskList.addEventListener('click', function (event) {
  const editClickedElement = event.target;
  const listItemToEdit = findParentListItem(editClickedElement);

  if (listItemToEdit && editClickedElement.classList.contains('edit-button')) {
    // Get the current task text from the list item
    const taskText = listItemToEdit.textContent.trim();

    // Create an input field and set its value to the current task text
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText;

    // Replace the list item with the input field
    listItemToEdit.innerHTML = "";
    listItemToEdit.appendChild(editInput);
    editInput.focus(); // Set focus to the input field for immediate editing

    // Add an event listener to save the edited task on pressing Enter or losing focus
    editInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter" || e.key === "Escape") {
        saveEditedTask(listItemToEdit, editInput);
      }
    });

    editInput.addEventListener("blur", function () {
      saveEditedTask(listItemToEdit, editInput);
    });
  }
});

// Helper function to save the edited task and update the localStorage
function saveEditedTask(listItem, editInput) {
  const newTaskText = editInput.value.trim();

  // If the edited task is empty, remove it from the list
  if (newTaskText === "") {
    taskList.removeChild(listItem);
  } else {
    // Save the edited task to localStorage
    const retrievedItems = localStorage.getItem("myStoredListItemsString");
    const itemsArray = JSON.parse(retrievedItems);
    const oldTaskText = listItem.textContent.trim();
    const index = itemsArray.indexOf(oldTaskText);

    if (index !== -1) {
      itemsArray[index] = newTaskText;
      localStorage.setItem("myStoredListItemsString", JSON.stringify(itemsArray));
    }

    // Replace the input field with a regular list item displaying the edited task text
    listItem.innerHTML = newTaskText;

    // Recreate the delete button and edit button for the updated list item
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<box-icon type='solid' name='message-square-x' class='delete-btn'></box-icon>";
    listItem.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = "<box-icon type='solid' name='edit' class='edit-button'></box-icon>";
    listItem.appendChild(editButton);
  }
}
//end edit option

// Helper function to find the parent <li> element of a given element
function findParentListItem(element) {
  let currentElement = element;
  while (currentElement && currentElement.tagName !== 'LI') {
    currentElement = currentElement.parentNode;
  }
  return currentElement;
}


// call the addTask function when the page finishes loading
window.addEventListener("load", addTask);
