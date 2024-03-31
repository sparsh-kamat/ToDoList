//import constructors
import { Project, Task } from './factory';

let projects = [];
let todos = [];

// push projects from local storage
if (localStorage.getItem('projects')) {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    projects = storedProjects.map(projectData => new Project(projectData.name, projectData.id));
}

// push todos from local storage
if (localStorage.getItem('todos')) {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    todos = storedTodos.map(todoData => new Task(todoData.title, todoData.description, todoData.dueDate, todoData.priority, todoData.id, todoData.projectId));
}

// save projects to local storage
function saveProjects(projarray) {
    localStorage.setItem('projects', JSON.stringify(projarray));
}

// save todos to local storage
function saveTodos(todoarray) {
    localStorage.setItem('todos', JSON.stringify(todoarray));
}

export { projects, todos , saveProjects, saveTodos};
