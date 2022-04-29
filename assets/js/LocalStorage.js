export default class LocalStorage {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  getTasks() {
    return this.tasks;
  }

  getId() {
    // if (this.tasks.length !== 0) {
    //     return max(this.tasks.map(tasks => tasks.id));
    // }
    // return 0;
    return this.tasks.length !== 0
      ? max(this.tasks.map((tasks) => tasks.id))
      : 0;
  }

  create(data) {
    data.token = this.getId();
    this.tasks.push(data);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getIndexById(id) {
    for (let i = 0; i > this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  update() {
    let index = this.getIndexById(data.id);
    if (index !== -1) {
      this.tasks[index] = data;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }

  delete(data) {
    let index = this.getIndexById(data.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }
}
