import { Task, TimedTask } from './Task.js';
import { loadTasks, saveTasks } from './store.js';
import { renderTasks, updateCounts, applyFilterStyles } from './view.js';
import { uid } from './utils.js';

// ---------------------------
// State
// ---------------------------
let tasks = loadTasks();
let filter = 'all';
let searchText = '';

// ---------------------------
// Cached DOM elements
// ---------------------------
const els = {
    form: document.getElementById('taskForm'),
    input: document.getElementById('taskInput'),
    dueDate: document.getElementById('taskDueDate'),
    list: document.getElementById('taskList'),
    counts: document.getElementById('counts'),
    filterGroup: document.getElementById('filterGroup'),
    clearCompleted: document.getElementById('clearCompleted'),
    search: document.getElementById('searchInput')
};

// ---------------------------
// Render function
// ---------------------------
function render() {
    renderTasks(els.list, tasks, filter, searchText);
    const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchText.toLowerCase()));
    updateCounts(els.counts, filteredTasks);
    applyFilterStyles(els.filterGroup, filter);
    els.clearCompleted.disabled = !tasks.some(t => t.done);
}

// ---------------------------
// Task operations
// ---------------------------
function addTask(title, dueDate = null) {
    let t;
    if (dueDate) t = new TimedTask(uid(), title, dueDate, false);
    else t = new Task(uid(), title, false);

    tasks.push(t);
    saveTasks(tasks);
    render();
}

function toggleTaskById(id) {
    const t = tasks.find(x => x.id === id);
    if (t) {
        t.toggle();
        saveTasks(tasks);
        render();
    }
}

function deleteTaskById(id) {
    tasks = tasks.filter(x => x.id !== id);
    saveTasks(tasks);
    render();
}

function clearCompleted() {
    tasks = tasks.filter(x => !x.done);
    saveTasks(tasks);
    render();
}

// ---------------------------
// Event listeners
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
    render();
    els.input.focus();
});

// Add task via form
els.form.addEventListener('submit', e => {
    e.preventDefault();
    const title = els.input.value.trim();
    if (!title) return;
    const dueDate = els.dueDate.value || null;
    addTask(title, dueDate);
    els.form.reset();
    els.input.focus();
});

// Toggle checkbox & delete (delegation)
els.list.addEventListener('change', e => {
    const li = e.target.closest('li.task');
    if (!li) return;
    if (e.target.matches('input[type="checkbox"]')) toggleTaskById(li.dataset.id);
});

els.list.addEventListener('click', e => {
    const li = e.target.closest('li.task');
    if (!li) return;
    if (e.target.matches('button.delete')) deleteTaskById(li.dataset.id);
});

// Double-click edit
els.list.addEventListener('dblclick', e => {
    const li = e.target.closest('li.task');
    if (!li) return;
    const span = li.querySelector('.title');
    if (!span) return;

    const oldTitle = span.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldTitle;
    input.className = 'edit';

    li.querySelector('.left').replaceChild(input, span);
    input.focus();

    function saveEdit() {
        const newTitle = input.value.trim();
        if (newTitle) {
            const task = tasks.find(t => t.id === li.dataset.id);
            if (task) task.title = newTitle;
            saveTasks(tasks);
        }
        render();
    }

    input.addEventListener('blur', saveEdit, { once: true });
    input.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') saveEdit();
        if (ev.key === 'Escape') render();
    });
});

// Filters
els.filterGroup.addEventListener('click', e => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    filter = btn.dataset.filter;
    render();
});

// Clear completed
els.clearCompleted.addEventListener('click', clearCompleted);

// Search
els.search.addEventListener('input', e => {
    searchText = e.target.value.trim();
    render();
});