
import '../scss/style.scss';
import {Project, Task} from './factory.js';
import {projects, todos, saveProjects, saveTodos} from './localstorage.js';
import {createElementWithClass, createElementWithText, setAttributes} from './dom.js';
import {renderProjects, renderTodos,addProjectForm, addTodoForm  } from './render.js';




// save projects and todos to local storage
function saveData(projects, todos) {
    saveProjects(projects);
    saveTodos(todos);
}

function renderAndSave(projects, todos) {
    var content = document.querySelector('.content');
    content.innerHTML = '';
    renderProjects(projects);
    renderTodos(todos,projects);
    saveData(projects, todos);
}








const addtodobutton = document.getElementById('addtask');
addtodobutton.addEventListener('click', function () {
    var content = document.querySelector('.content');
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
});

// show all tasks
const alltasksbutton = document.getElementById('alltasks');
alltasksbutton.addEventListener('click', function () {
    renderAndSave(projects, todos);
});

//show today's tasks
const todaytasksbutton = document.getElementById('todaytasks');
todaytasksbutton.addEventListener('click', function () {
    var content = document.querySelector('.content');
    content.innerHTML = '';
    var today = new Date();
    var todaytodos = todos.filter(todo => new Date(todo.getDueDate()).toDateString() === today.toDateString());
    renderTodos(todaytodos);
});

const addprojectbutton = document.querySelector('.addproj');
addprojectbutton.addEventListener('click', function () {
    var content = document.querySelector('.content');
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

});

//delete todo
document.querySelector('.content').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-button')) {
        // select the todo item by going up the DOM tree then coming down to text container and selecting the text
        var title = e.target.parentElement.parentElement.querySelector('.text-container').querySelector('.todo-text').textContent;
        var todo = todos.find(todo => todo.getTitle() === title);
        const index = todos.indexOf(todo);
        todos.splice(index, 1);
        var content = document.querySelector('.content');
        content.innerHTML = '';
        renderAndSave(projects, todos)
    }
});

//edit todo
document.querySelector('.content').addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-button')) {
        var todoTitle = e.target.parentElement.parentElement.querySelector('.text-container').querySelector('.todo-text').textContent;
        console.log(todoTitle);
        var todo = todos.find(todo => todo.getTitle() === todoTitle);
        console.log(todo);
        var content = document.querySelector('.content');
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
            content.innerHTML = '';
            renderTodos(todos);
        });
    }
});

//delete project
document.querySelector('.sidebar-items').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-img')) {
        var projectId = e.target.getAttribute('project-id');
        var project = projects.find(project => project.getId() == projectId);
        const index = projects.indexOf(project);
        projects.splice(index, 1);
        // delete all todos in the project
        todos = todos.filter(todo => todo.getProjectId() != projectId);
        renderAndSave(projects, todos);
    }
});

renderProjects(projects);
renderTodos(todos,projects);

const content = document.querySelector('.main');
const sidebarbutton = document.getElementById('navbutton');
let sidebarclosed = false;
sidebarbutton.addEventListener('click', function() {
    if(sidebarclosed) {
        content.classList.remove('menu-closed');
        sidebarclosed = false;
    } else {
        content.classList.add('menu-closed');
        sidebarclosed = true;
    }
});






