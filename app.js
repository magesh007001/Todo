const list = document.getElementById('list');
const message = document.getElementById('message');
let tasks = [];

// Load saved tasks (supplied helper code)
try {
  const saved = JSON.parse(localStorage.getItem('practice-tasks') || '[]');
  if (Array.isArray(saved)) tasks = saved.filter(x => typeof x === 'string');
} catch {}

// Save helper (supplied)
function save() {
  localStorage.setItem('practice-tasks', JSON.stringify(tasks));
}

// Draw the list on the page
function render() {
  list.replaceChildren();
  tasks.forEach((text, index) => {
    const row = document.createElement('li');
    row.textContent = text; // textContent, not HTML, so typed text can't inject code

    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = () => {
      tasks.splice(index, 1);   // remove this task
      save();                   // save after the change
      render();                 // redraw the list
      message.textContent = 'Task deleted.';
    };

    row.append(button);
    list.append(row);
  });
}

// Add a task when the form is submitted
document.getElementById('form').onsubmit = e => {
  e.preventDefault(); // stop the page from reloading
  const input = document.getElementById('text');
  const text = input.value.trim();

  if (text === '') {            // reject blank text
    message.textContent = 'Please type a task before adding.';
    return;
  }

  tasks.push(text);
  save();
  render();
  input.value = '';             // clear the box
  input.focus();
  message.textContent = 'Task added.';
};

render();
