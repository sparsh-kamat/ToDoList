import '../scss/style.scss';
import { createElementWithClass, createElementWithText } from './domhelper.js';
import { Project } from './project.js';
import { Todo } from './todo.js';

//make array of projects and todos
 let projects = [];
 let todos = [];


//  make 5 realistic todos with export class Todo {
//   constructor(title, description, dueDate, priority, id, projectId) {
//     this.title = title;
//     this.description = description;
//     this.dueDate = dueDate;
//     this.priority = priority;
//     this.id = id;
//     this.projectId = projectId;
 
// }

//start
todos.push(new Todo('Wash Dishes', 'Wash all the dishes in the sink', '2024-09-01', 'High', 1, 1));
todos.push(new Todo('Clean Room', 'Clean the room', '2024-09-01', 'High', 2, 1));
todos.push(new Todo('Do Laundry', 'Do all the laundry', '2024-09-01', 'High', 3, 1));
todos.push(new Todo('Buy Groceries', 'Buy all the groceries', '2024-09-01', 'High', 4, 1));
todos.push(new Todo('Study', 'Study for 2 hours', '2024-09-01', 'High', 5, 1));

//make default project
projects.push(new Project('Default', 1));
projects.push(new Project('College', 2));

const content = document.querySelector('.content');
const sidebar = document.querySelector('.sidebar');

let projCont = createElementWithClass('div', 'project-container');

function addProject(projects) {

    var projectContainer = createElementWithClass('div', 'sidebar-item');
    var plus= createElementWithClass('i', 'fa-solid fa-plus');
    var h2 = createElementWithText('h2', 'addproj', 'Projects');
    h2.textcontent = 'Projects';
    projectContainer.appendChild(h2);
    projectContainer.appendChild(plus);
    sidebar.appendChild(projectContainer);


    projects.forEach(project => {
        var sidebaritem = createElementWithClass('div', 'sidebar-item');
        var p= createElementWithText('p', 'sidebar-text', project.title);
        var logo = createElementWithClass('i', 'fa-solid fa-calendar');

        sidebaritem.appendChild(logo);
        sidebaritem.appendChild(p);
        projectContainer.appendChild(sidebaritem);
    });
}

addProject(projects);







