import { ToDo } from './todo';

class Project {

    static #blankProject = new Project('gray', 'Blank', true);
    static #activeProject = this.#blankProject;

    /** @type { Project[] } */
    static #projects = new Array();

    color = 'red';
    name = 'Project1';
    #isBlankDefault;
    
    /**@type { ToDo[] }*/
    #toDoList = new Array();

    constructor(color, name, isBlankDefault = false) {
        this.color = color;
        this.name = name;
        this.#isBlankDefault = isBlankDefault; 
    }

    getTodos() {
        return Array.from(this.#toDoList);
    }

    removeTodo(index) {
        return this.#toDoList.splice(index, 1);
    }

    pushTodo(...todo) {
        this.#toDoList.push(...todo);
    }

    emplaceTodo(index, ...todos) {
        this.#toDoList.splice(index, 0, ...todos);
    }

    removeAllTodos() {
        return this.#toDoList.splice(0, this.#toDoList.length);
    }

    

    static isActiveBlank() {
        return this.#activeProject.#isBlankDefault;
    }


    static setActiveProject(project) {
        this.#activeProject = project;
    }

    /**
     * Returns the active project in view.
     *
     * @static
     * @returns {Project}
     */
    static getActiveProject() {
        return this.#activeProject;
    }

    static appendToProjects(...projects) {
        this.#projects.push(...projects);
    }

    static getProjects() {
        return Array.from(this.#projects);
    }
}




export {Project};