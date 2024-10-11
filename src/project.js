import { ToDo } from './todo';
import { randomID16 } from './utility';

class Project {

    static #blankProject = new Project('gray', 'Blank', true);
    static #activeProject = this.#blankProject;

    /** @type { Project[] } */
    static #projects = new Array();

    color = 'red';
    name = 'Project1';
    #isBlankDefault;
    #ID;
    
    /**@type { ToDo[] }*/
    #toDoList = new Array();

    constructor(color, name, isBlankDefault = false) {
        this.color = color;
        this.name = name;
        this.#isBlankDefault = isBlankDefault; 

        this.#ID = randomID16();
    }

    constructFromID(ID, json) {
        this.#ID = ID;
        const copy = JSON.parse(json);
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

    replaceTodo(index, todo) {
        return this.#toDoList.splice(index, 1, todo);
    }

    removeAllTodos() {
        return this.#toDoList.splice(0, this.#toDoList.length);
    }

    swapTodos(index1, index2) {
        const aux = this.#toDoList.at(index1);
        this.#toDoList[index1] = this.#toDoList[index2];
        this.#toDoList[index2] = aux;
    }       

    // setting ID is counterintuitive
    getID() {
        return this.#ID;
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