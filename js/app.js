// get the Element required ie input and listing tasks
const inputTask = document.getElementById("inputTask");
const taskList = document.getElementById("taskList");

//create a function that adds a task to a list

function addTask() {
  //get what is typed into the input field
  const inputTaskText = inputTask.value;

  //check to see if there is an item stored in browsers local storage.
  if (localStorage.getItem("myStoredListItemsString")) {
    //if item exists its parsed into a json object and stored in items variable
    let items = JSON.parse(localStorage.getItem("myStoredListItemsString"));
    //add an new item that got from the input to the items list
    items.push(inputTaskText);
    //store the updated items into a string and save them back to local storage
    localStorage.setItem("myStoredListItemsString", JSON.stringify(items));
  } else {
    //else if there is nothing in the local storage list set it
    localStorage.setItem(
      "myStoredListItemsString",
      JSON.stringify([inputTaskText])
    );
  }

  console.log(localStorage.getItem("myStoredListItemsString"));

  inputTask.value = "";
}
