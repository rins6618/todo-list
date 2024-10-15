import { ToDo } from './todo';
import { randomID16 } from './utility';
import { Storage } from './storage';


// static part of project is a SOLID violation
// Single Principle
// I let it go, due to the fact that encapsulation makes the ID hidden inside of Project.


/**
 * Implements the Project object and the manipulation of user projects
 *
 * @class Project
 * @typedef {Project}
*/
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

        // overloading in javascript ??????
        if (arguments.length === 1 && typeof arguments[0] === 'object') {
            this.#constructFromJSON(color);
            return;
        }

        this.color = color;
        this.name = name;
        this.#isBlankDefault = isBlankDefault; 

        this.#ID = randomID16();
    }

    
    /**
     * @param {publicProject} object
     */
    #constructFromJSON({color, name, ID, toDoList}) {
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
    
    
    // json marshalling is a SOLID violation
    // Single Principle
    // Not fond of implementing a module for this project in particular.
    
    
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
        const publicObj = JSON.parse(jsonStr);
        publicObj.toDoList.forEach((val, index, array) => {
            array[index] = ToDo.deserializeJSON(val);
        });
        
        const obj = new Project(publicObj);
        return obj;
    }

    static isActiveBlank() {
        return this.#activeProject.#isBlankDefault;
    }

    /**
     * @param {Project} project 
     */
    static setActiveProject(project) {
        Storage.setStorage('_activeProject_', project.#ID);
        Storage.setStorage(project.#ID, project.serializeJSON());
        this.#activeProject = project;
        this.storeProjectData();
    }

    static reset() {
        this.#activeProject = this.#blankProject;
        this.#projects.splice(0, this.#projects.length);
    }

    static storeProjectData() {
        const arrayCopy = Array.from(this.#projects);
        arrayCopy.forEach((val, index, array) => {
            array[index] = val.getID();
        });
        const json = JSON.stringify(arrayCopy);
        Storage.setStorage('_projectIDS_', json);
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
        this.storeProjectData();
    }

    static getProjects() {
        return Array.from(this.#projects);
    }

    static retrieveProjects() {
        const result = Storage.getStorage('_projectIDS_');
        const active = Storage.getStorage('_activeProject_');
        if (typeof result === 'undefined' || result === null) {
            return;
        }
        /** @type {string[]} result */
        const parsed = JSON.parse(result);

        // sort by date
        parsed.sort();

        parsed.forEach((val, index, array) => {
            array[index] = Storage.getStorage(val);
        });

        if (parsed.length == 0) {
            return;
        }

        parsed.forEach(val => {
            const object = Project.deserializeJSON(val);
            if (object.getID() === active) this.#activeProject = object;
            this.#projects.push(object);
        });
        
    }
}




export {Project};