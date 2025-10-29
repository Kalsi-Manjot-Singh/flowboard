function addTask(title, description = '') {
  const taskId = `task-${Date.now()}`;
  const task = document.createElement('div');
  task.className = 'task';
  task.id = taskId;
  task.draggable = true;

  // Title
  const titleElement = document.createElement('div');
  titleElement.className = 'title';
  titleElement.textContent = title;
  task.appendChild(titleElement);

  // Wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'task-wrapper';

  // Description (optional)
  if (description) {
    const descElement = document.createElement('div');
    descElement.className = 'description';
    descElement.textContent = description;
    wrapper.appendChild(descElement);
  }

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => task.remove();
  wrapper.appendChild(deleteBtn);

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    
  };
  wrapper.appendChild(editBtn);

  // Add wrapper to task
  task.appendChild(wrapper);

  // Append task to container
  task.addEventListener('dragstart', dragStart); 
  task.addEventListener('dragend', dragEnd);
  document.getElementById('todo').appendChild(task);
}

document.getElementById("add-task-btn").addEventListener("click", () => {
  const input = document.getElementById("task-input");
  const title = input.value.trim();
  if(title) {
    addTask(title)
    input.value = "";
  }
}) 

document.querySelectorAll('.column').forEach(column => {
  column.addEventListener('dragover', dragOver);
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragleave', dragLeave);
  column.addEventListener('drop', drop);
});

let draggedTask = null;



function dragStart(e) {
  draggedTask = this;
    this.classList.add("dragging");
}

function dragEnd(e) {
  this.classList.remove("dragging");
  draggedTask = null;
}

function dragOver(e) {
  e.preventDefault();
} 

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
  this.style.backgroundColor = '#f0f0f0';
}

function dragLeave(e) { 
  this.classList.remove('hovered');
  this.style.backgroundColor = '';
}

function drop(e) {
    this.classList.remove('hovered');
  this.style.backgroundColor = '';
  if (draggedTask) {
    this.appendChild(draggedTask);
  }
} 

// Initial sample task
addTask('Sample Task', 'This is a sample task description.');