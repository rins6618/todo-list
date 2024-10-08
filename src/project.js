class Project {

    static #blankProject = new Project('gray', 'Blank');
    static #activeProject = this.#blankProject;
    static #projects = new Array();

    color = 'red';
    name = 'Project1';

    constructor(color, name) {
        this.color = color;
        this.name = name;
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