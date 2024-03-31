import { createElementWithClass, createElementWithText, setAttributes } from './dom.js';
import { projects } from './localstorage.js';



function renderProjects(projarray) {
    document.querySelector('.sidebar-items').innerHTML = '';
    projarray.forEach(function (project) {
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
}


function renderTodos(todoarray, projarray) {
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
        var project = projarray.find(project => project.getId() === todo.getProjectId());
        var projectName = project ? project.getName() : 'Unknown';
        var projectText = createElementWithText('p', ['todo-project'], "Project: " + projectName);
        
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

export { renderProjects, renderTodos , addProjectForm, addTodoForm};