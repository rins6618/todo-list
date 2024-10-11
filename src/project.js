import { ToDo } from './todo';
import { randomID16 } from './utility';
import { Storage } from './storage';



class Project {

    static #blankProject = new Project('gray', 'Blank', true);
    
    /** @type { Project } */
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

    #constructFromJSON(color, name, ID, toDoList) {
        this.color = color;
        this.name = name;
        this.#ID = ID;
        this.#toDoList = toDoList;

        // the blank project is NEVER serialized
        this.#isBlankDefault = false; 
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

    /**
     * @typedef {Object} publicProject
     * @property {string} color;
     * @property {string} name;
     * @property {string} id;
     * @property {Todo[]} toDoList;
     */
    serializeJSON() {
        const publicObj = { 
            color: this.color,
            name: this.name,
            ID: this.#ID,
            toDoList: Array.from(this.#toDoList)
        };

        publicObj.toDoList.forEach( (toDo, index, array) => {
            array[index] = toDo.serializeJSON();
        });

        return JSON.stringify(publicObj);
    
    }

    static deserializeJSON(jsonStr) {
        
        /** @type {publicProject} */
        const {color, name, ID, toDoList} = JSON.parse(jsonStr);
        obj.toDoList.forEach((val, index, array) => {
            array[index] = ToDo.deserializeJSON(val);
        });

        return obj;
    }

    static isActiveBlank() {
        return this.#activeProject.#isBlankDefault;
    }

    /**
     * @param {Project} project 
     */
    static setActiveProject(project) {



        Storage.setStorage(project.#ID, )
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