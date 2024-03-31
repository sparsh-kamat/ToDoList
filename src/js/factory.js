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

export { Project, Task };