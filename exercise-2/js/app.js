(function (Session) {
  const session = Session();
  const taskInput = document.getElementById("new-task");
  const addButton = document.getElementsByTagName("button")[0];
  const incompleteTasksHolder = document.getElementById("incomplete-tasks");
  const completedTasksHolder = document.getElementById("completed-tasks");

  const initialData = [
    { editMode: false, value: 'Pay Bills', label: 'Pay Bills', complete: false },
    { editMode: true, value: 'Go Shopping', label: 'Go Shopping', complete: false },
    { editMode: false, value: 'See the Doctor', label: 'See the Doctor', complete: true },
  ];

  const sessionData = session.getTasks();
  let data = sessionData.length ? sessionData : initialData;

  const createNewTaskElement = function (taskString, arr) {
    let listItem = document.createElement("li");
    if (arr && arr.editMode) {
      listItem.classList.add('editMode');
    }

    listItem.innerHTML = `
      <input type="checkbox">
      <label>${taskString}</label>
      <input type="text" value="${taskString}"></input>
      <button class="${(arr && arr.editMode) ? 'save' : 'edit'}">${(arr && arr.editMode) ? 'Save' : 'Edit'}</button>
      <button class="delete">Delete</button>
      `;

    return listItem;
  };

  const addTask = () => {
    if (!taskInput.value.length) {
      taskInput.classList.add('invalid-task');
      taskInput.classList.add('shake');
    } else {
      taskInput.classList.remove('invalid-task');
      taskInput.classList.remove('shake');
      const listItemName = taskInput.value;
      listItem = createNewTaskElement(listItemName);
      incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted);
      taskInput.value = "";
      updateData();
    }
  };

  const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelectorAll("input[type=text")[0];
    const label = listItem.querySelector("label");
    const button = listItem.getElementsByTagName("button")[0];

    const containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
      label.innerText = editInput.value
      button.innerText = "Edit";
    } else {
      editInput.value = label.innerText
      button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
    updateData();
  };

  const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
    updateData();
  };

  const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    updateData();
  };

  const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    updateData();
  };

  const bindTaskEvents = (taskListItem, checkBoxEventHandler, cb) => {
    const checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    const editButton = taskListItem.querySelectorAll("button.edit")[0];
    const saveButton = taskListItem.querySelectorAll('button.save')[0];
    const deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    if (!editButton) {
      saveButton.onclick = editTask;
    } else {
      editButton.onclick = editTask;
    }
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
  };

  const updateData = () => {
    const incompleteTasks = incompleteTasksHolder.querySelectorAll('li');
    const completeTasks = completedTasksHolder.querySelectorAll('li');
    let dataToSave = [];

    for (let i = 0; i < incompleteTasks.length; i++) {
      const label = incompleteTasks[i].children[1];
      const classList = incompleteTasks[i].classList;

      dataToSave.push({
        editMode: (classList.contains('editMode') ? true : false),
        value: label.innerText, label: label.innerText, complete: false
      })
    }
    for (let i = 0; i < completeTasks.length; i++) {
      const label = incompleteTasks[i].children[1];
      const classList = incompleteTasks[i].classList;

      dataToSave.push({
        editMode: (classList.contains('editMode') ? true : false),
        value: label.innerText, label: label.innerText, complete: true
      })
    }

    session.setTasks(dataToSave);
  }

  data.forEach((item) => {
    let listItem = createNewTaskElement(item.value, { editMode: item.editMode });
    if (item.complete) {
      completedTasksHolder.appendChild(listItem);
    } else {
      incompleteTasksHolder.appendChild(listItem);
    }
    bindTaskEvents(listItem, taskCompleted);
  });

  addButton.addEventListener("click", addTask);

  for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

  for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }

})(Session);