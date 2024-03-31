
import '../scss/style.scss';
import {Project, Task} from './factory.js';
import {saveProjects, saveTodos} from './localstorage.js';
import {createElementWithClass, createElementWithText, setAttributes} from './dom.js';
import {renderProjects, renderTodos,addProjectForm, addTodoForm  } from './render.js';

let {projects, todos} = require('./localstorage.js');
let sidebarclosed = false;


const content = document.querySelector('.content');
const main = document.querySelector('.main');
const sidebarbutton = document.getElementById('navbutton');
const addtodobutton = document.getElementById('addtask');
const addprojectbutton = document.querySelector('.addproj');
const alltasksbutton = document.getElementById('alltasks');
const todaytasksbutton = document.getElementById('todaytasks');

function saveData(projects, todos) {
    saveProjects(projects);
    saveTodos(todos);
}

function render(projects, todos) {
    content.innerHTML = '';
    renderProjects(projects);
    renderTodos(todos,projects);
}

function renderAndSave(projects, todos) {
    saveData(projects, todos);
    content.innerHTML = '';
    renderProjects(projects);
    renderTodos(todos,projects);
}

function addTodo() {
    content.innerHTML = '';
    var form = addTodoForm();
    content.appendChild(form);
    // submit button
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var priority;
        var projectId;
        var title = form.querySelector('input[placeholder="Title"]').value;
        var description = form.querySelector('input[placeholder="Description"]').value;
        var dueDate = form.querySelector('input[placeholder="Due Date"]').value;
        if (form.querySelector('select').value === 'Choose Priority') {
            priority = 'Medium';
        }
        else {
            priority = form.querySelector('select').value;
        }


        if (form.querySelector('.projectdrop').value === 'Choose Project') {
            projectId = projects[0].getId();
        }
        else {
            var projectName = form.querySelector('.projectdrop').value;
            var project = projects.find(project => project.getName() === projectName);
            projectId = project.getId();
        }

        var todo = new Task(title, description, dueDate, priority, todos.length + 1, projectId);
        todos.push(todo);
        content.innerHTML = '';

        renderAndSave(projects, todos);
    });
}

function addProject() {
    content.innerHTML = '';
    var form = addProjectForm();
    content.appendChild(form);
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('.input');
        var project = new Project(input.value, projects.length + 1);
        projects.push(project);
        content.innerHTML = '';
        renderAndSave(projects, todos)
    });
}

function showTodayTasks() {
    content.innerHTML = '';
    var today = new Date();
    var todayTasks = todos.filter(todo => new Date(todo.getDueDate()).toDateString() === today.toDateString());
    render(projects, todayTasks);
}

function deleteTodo(e){
    if (e.target.classList.contains('delete-button')) {
        // select the todo item by going up the DOM tree then coming down to text container and selecting the text
        var todoId = e.target.getAttribute('todo-id');
        var todo = todos.find(todo => todo.getId() == todoId);
        const index = todos.indexOf(todo);
        todos.splice(index, 1);
        renderAndSave(projects, todos);
    }
}

function deleteProjectAndTodos(e) {
    if (e.target.classList.contains('delete-img')) {
        var projectId = e.target.getAttribute('project-id');
        var project = projects.find(project => project.getId() == projectId);
        const projindex = projects.indexOf(project);
        projects.splice(projindex, 1);
        var projectTodos = todos.filter(todo => todo.getProjectId() == projectId);
        projectTodos.forEach(todo => {
            const todoindex = todos.indexOf(todo);
            todos.splice(todoindex, 1);
        });
        
        renderAndSave(projects, todos);
    }
}

function updateTodo(e){
    if (e.target.classList.contains('edit-button')) {
        var todoId = e.target.getAttribute('todo-id');
        var todo = todos.find(todo => todo.getId() == todoId);
        content.innerHTML = '';
        var form = addTodoForm();
        form.querySelector('input[placeholder="Title"]').value = todo.getTitle();
        form.querySelector('input[placeholder="Description"]').value = todo.getDescription();
        form.querySelector('input[placeholder="Due Date"]').value = todo.getDueDate();
        form.querySelector('select').value = todo.getPriority();
        var project = projects.find(project => project.getId() === todo.getProjectId());
        form.querySelector('.projectdrop').value = project.getName();
        content.appendChild(form);
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            todo.updateTitle(form.querySelector('input[placeholder="Title"]').value);
            todo.updateDescription(form.querySelector('input[placeholder="Description"]').value);
            todo.updateDueDate(form.querySelector('input[placeholder="Due Date"]').value);
            todo.updatePriority(form.querySelector('select').value);
            var projectName = form.querySelector('.projectdrop').value;
            var project = projects.find(project => project.getName() === projectName);
            todo.updateProjectId(project.getId());
            
            renderAndSave(projects, todos);
        });
    }

}

function showSidebar() {
    if(sidebarclosed) {
        main.classList.remove('menu-closed');
        sidebarclosed = false;
    } else {
        main.classList.add('menu-closed');
        sidebarclosed = true;
    }
}



addtodobutton.addEventListener('click', addTodo);
alltasksbutton.addEventListener('click', () => render(projects, todos));
addprojectbutton.addEventListener('click', addProject);
todaytasksbutton.addEventListener('click', showTodayTasks);
document.querySelector('.content').addEventListener('click', deleteTodo);
document.querySelector('.content').addEventListener('click', updateTodo);
document.querySelector('.sidebar-items').addEventListener('click', deleteProjectAndTodos);
sidebarbutton.addEventListener('click', showSidebar);


renderAndSave(projects, todos);






