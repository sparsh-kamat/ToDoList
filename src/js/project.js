export class Project {
  constructor(name, id, tasks = []) {
    this.name = name;
    this.id = id;
    this.tasks = tasks;
  }
   
    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(t => t !== task);
    }

    setName(name) {
        this.name = name;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
    
    getTasks() {
        return this.tasks;
    }

    setId(id) {
        this.id = id;
    }

    getProject() {
        return {
            name: this.name,
            id: this.id,
            tasks: this.tasks
        };
    }

}