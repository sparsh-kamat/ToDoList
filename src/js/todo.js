export class Todo {
  constructor(title, description, dueDate, priority, id, projectId) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
    this.projectId = projectId;
 
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

    getTodo() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            id: this.id,
            projectId: this.projectId
        };
    }

    getTodoId() {
        return this.id;
    }

    
}