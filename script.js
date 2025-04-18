document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
  
    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const renderTasks = () => {
      list.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="complete-btn">✓</button>
            <button class="delete-btn">✗</button>
          </div>
        `;
  
        // Complete task
        li.querySelector('.complete-btn').addEventListener('click', () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks();
        });
  
        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });
  
        list.appendChild(li);
      });
    };
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text !== '') {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        input.value = '';
      }
    });
  
    renderTasks();
  });
  