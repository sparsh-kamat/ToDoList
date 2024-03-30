
import '../scss/style.scss';

//Project and Task classes
class Project {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.tasks = [];
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }


}

class Task {
    constructor(title, description, dueDate, priority, id, projectId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
        this.projectId = projectId;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }

    getId() {
        return this.id;
    }

    getProjectId() {
        return this.projectId;
    }

    updateTitle(title) {
        this.title = title;
    }

    updateDescription(description) {
        this.description = description;
    }

    updateDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    updatePriority(priority) {
        this.priority = priority;
    }

    updateProjectId(projectId) {
        this.projectId = projectId;
    }

}


//DOM Helper functions
function createElementWithClass(elementType, className) {
    var element = document.createElement(elementType);

    if (Array.isArray(className)) {
        className.forEach(function (name) {
            element.classList.add(name);
        });
    } else {
        element.classList.add(className);
    }

    return element;
}

function createElementWithText(elementType, className, text) {
    var element = createElementWithClass(elementType, className);
    element.textContent = text;
    return element;
}

function setAttributes(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


//Global variables
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





function renderProjects() {

    document.querySelector('.sidebar-items').innerHTML = '';
    projects.forEach(function (project) {
        var item = createElementWithClass('div', ['sidebar-item']);
        item.setAttribute('id', 'project');
        var text = createElementWithText('p', ['sidebar-text'], project.getName());
        item.appendChild(text);

        // delete button
        var deleteImg = createElementWithClass('img', ['delete-img']);
        deleteImg.setAttribute('src', 'https://img.icons8.com/ios-glyphs/30/filled-trash.png');
        deleteImg.setAttribute('project-id', project.getId());
        item.appendChild(deleteImg);

        document.querySelector('.sidebar-items').appendChild(item);
    });

    // use local storage to save projects
    localStorage.setItem('projects', JSON.stringify(projects));
}

function renderTodos(todoarray) {
    var todocontainer = createElementWithClass('div', ['todo-items']);
    todoarray.forEach(function (todo) {
        var item = createElementWithClass('div', ['todo-item']);
        var textcontainer = createElementWithClass('div', ['text-container']);
        var text = createElementWithText('h3', ['todo-text'], todo.getTitle());
        textcontainer.appendChild(text);
        // description, dueDate, priority, id, projectId
        var description = createElementWithText('p', ['todo-description'], todo.getDescription());
        textcontainer.appendChild(description);
        var dueDate = createElementWithText('p', ['todo-duedate'], todo.getDueDate());
        textcontainer.appendChild(dueDate);

        // if due date is passed, change color to red
        var today = new Date();
        var due = new Date(todo.getDueDate());
        if (due < today) {
            dueDate.style.color = 'red';
        }

        var priority = createElementWithText('p', ['todo-priority'], "Priority: " + todo.getPriority());
        textcontainer.appendChild(priority);
        
        var project = projects.find(project => project.getId() === todo.getProjectId());
        var projectText = createElementWithText('p', ['todo-project'], "Project: " + project.getName());
        textcontainer.appendChild(projectText);
        item.appendChild(textcontainer);

        var buttoncontainer = createElementWithClass('div', ['button-container']);
        var deleteButton = createElementWithText('button', ['delete-button'], 'Delete');
        buttoncontainer.appendChild(deleteButton);
        var editButton = createElementWithText('button', ['edit-button'], 'Edit');
        buttoncontainer.appendChild(editButton);
        item.appendChild(buttoncontainer);
        todocontainer.appendChild(item);

    }
    );
    document.querySelector('.content').appendChild(todocontainer);
    // use local storage to save todos
    localStorage.setItem('todos', JSON.stringify(todoarray));
}




//make a form to add a new project
function addProjectForm() {
    var form = createElementWithClass('form', ['form']);
    var label = createElementWithText('h2', ['form-label'], 'Add a new project');
    var input = createElementWithClass('input', ['input']);
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Project Name');
    input.setAttribute('required', 'required');
    var button = createElementWithClass('button', ['button']);
    button.textContent = 'Add Project';
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    return form;
}

function addTodoForm() {
    var form = createElementWithClass('form', ['form']);
    var label = createElementWithText('h2', ['form-label'], 'Add a new todo');
    var title = createElementWithClass('input', ['input']);
    title.setAttribute('required', 'required');
    title.setAttribute('type', 'text');
    title.setAttribute('placeholder', 'Title');

    var description = createElementWithClass('input', ['input']);
    description.setAttribute('type', 'text');
    description.setAttribute('placeholder', 'Description');
    description.setAttribute('required', 'required');

    var dueDate = createElementWithClass('input', ['input']);
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('placeholder', 'Due Date');
    dueDate.setAttribute('required', 'required');

    // priority dropdown
    var priority = createElementWithClass('select', ['input']);
    priority.setAttribute('required', 'required');
    var placeholder = createElementWithText('option', [], 'Choose Priority');
    setAttributes(placeholder, { 'disabled': 'disabled', 'selected': 'selected' });
    var option1 = createElementWithText('option', [], 'High');
    var option2 = createElementWithText('option', [], 'Medium');
    var option3 = createElementWithText('option', [], 'Low');

    priority.appendChild(placeholder);
    priority.appendChild(option1);
    priority.appendChild(option2);
    priority.appendChild(option3);


    // project dropdown
    var projectdrop = createElementWithClass('select', ['projectdrop']);
    projectdrop.setAttribute('required', 'required');
    var placeholder = createElementWithText('option', [], 'Choose Project');
    setAttributes(placeholder, { 'disabled': 'disabled', 'selected': 'selected' });
    projectdrop.appendChild(placeholder);
    projects.forEach(function (project) {
        var option = createElementWithText('option', [], project.getName());
        projectdrop.appendChild(option);
    });

    var button = createElementWithClass('button', ['button']);
    button.textContent = 'Add Todo';
    form.appendChild(label);
    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(dueDate);
    form.appendChild(priority);
    form.appendChild(projectdrop);
    form.appendChild(button);
    return form;

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

        renderTodos(todos);
        renderProjects();
    });
});

// show all tasks
const alltasksbutton = document.getElementById('alltasks');
alltasksbutton.addEventListener('click', function () {
    var content = document.querySelector('.content');
    content.innerHTML = '';
    renderTodos(todos);
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
        renderProjects();
        content.innerHTML = '';
        renderTodos(todos);
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
        renderTodos(todos);
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


        var content = document.querySelector('.content');
        content.innerHTML = '';
        renderProjects();
        renderTodos(todos);
    }
});

renderProjects();
renderTodos(todos);

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






