class Project {

    static #blankProject = new Project('gray', 'Blank', true);
    static #activeProject = this.#blankProject;
    static #projects = new Array();

    color = 'red';
    name = 'Project1';
    #isBlankDefault;

    constructor(color, name, isBlankDefault) {
        this.color = color;
        this.name = name;
        this.#isBlankDefault = isBlankDefault; 
    }

    static isActiveBlank() {
        return this.#activeProject.#isBlankDefault;
    }


    static setActiveProject(project) {
        this.#activeProject = project;
    }

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