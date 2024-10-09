import { Project } from './project';
import './dialog.css'

class DialogWindow {
    static #dialog = document.querySelector("#info-box");
    static #dialogBody = this.#dialog.querySelector("#info-body");
    
    static assignEvents() {
        window.addEventListener('click', e => {
            if (!e.target.matches('#info-body, .dialog-button')) {
                if (this.#dialog.open) {
                this.close();
              }
            }
          }); 
    }

    static resetContent() {
        this.#dialogBody.replaceChildren();
    }

    static appendElement(elementType, classes, textContent, ID = null, parent = "#info-body") {
        const element = document.createElement(elementType);
        element.classList.add(...classes);
        element.textContent = textContent;
        if (typeof ID === "string")
            element.ID = ID;
        document.querySelector(parent).appendChild(element);
    }

    static open() {
        this.#dialog.show();
    }

    static close() {
        this.#dialog.close();
    }
};

class DOMEditor {


    static sidebar = document.querySelector("#sidebar");
    static main = document.querySelector("main");

    static mainBlank = document.querySelector("#blank-content"); 
    
    static closeBtn = document.querySelector("#sidebar .toggle-btn");
    static projectBtn = document.querySelector("#project-selector");
    static projectDropdown = document.querySelector("#project-dropdown");
    
    
    static createProjBtn = document.querySelector("#create-proj");
    static deleteProjBtn = document.querySelector("#delete-proj");
    static renameProjBtn = document.querySelector("#rename-proj");
    static recolorProjBtn = document.querySelector("#recolor-proj");
    static notesProjBtn = document.querySelector("#notes-proj");
    static datesProjBtn = document.querySelector("#dates-proj");




    // Must happen before everything else; "static constructor"
    static assignEvents() {

        DialogWindow.assignEvents();

        this.closeBtn.addEventListener("click", e => {
            sidebar.classList.toggle("close");
        });
        
        this.projectBtn.addEventListener("click", e => {
            console.log("Click");
            this.projectDropdown.classList.toggle("show");
        });
        
        window.addEventListener('click', e => {
            if (!e.target.matches('#project-selector')) {
              let dropdowns = document.querySelectorAll(".dropdown-content");
              for (let i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
                }
              }
            }
          }); 
        


        
        const COLORS = ['rgb(214, 44, 75)', 'rgb(148, 173, 215)', 'rgb(155, 236, 0)', 'rgb(249, 76, 16)', 'rgb(248, 222, 34)', 'rgb(210, 100, 154)'];
        let counter = 1;
        this.createProjBtn.addEventListener('click', e => {
        
          const idx = Math.floor(Math.random() * COLORS.length);  
          const project = new Project(COLORS[idx], `Project${counter}`, false);
          counter++;
 
          Project.setActiveProject(project);
          Project.appendToProjects(project);

          console.log(project);
          this.updateProjectList();
        });

        this.deleteProjBtn.addEventListener('click', e => {
            DialogWindow.resetContent();
            DialogWindow.appendElement("h3", ["heading"], "Delete a project...");
            DialogWindow.open();
        });
        
        this.renameProjBtn.addEventListener('click', e => {
            DialogWindow.resetContent();
            DialogWindow.appendElement("h3", ["heading"], "Rename this project...");
            DialogWindow.open();
        });
        
        this.recolorProjBtn.addEventListener('click', e => {
            DialogWindow.open();
        });
        
        this.notesProjBtn.addEventListener('click', e => {
            DialogWindow.open();
        });
        
        this.datesProjBtn.addEventListener('click', e => {
            DialogWindow.open();
        });

        console.log("Events assigned");


    }

    static updateActiveProject() {
        const activeProject = Project.getActiveProject();

        if (!Project.isActiveBlank()) {
            if (this.main.classList.contains("empty")) {
                this.main.classList.remove("empty");
            }
        } else {
            if (!this.main.classList.contains("empty")) {
                this.main.classList.add("empty");
            }
        }
        const icon = document.querySelector("#project-icon");
        document.querySelector("#project-name").textContent = activeProject.name;
        icon.textContent = activeProject.name.toUpperCase().at(-1);
        icon.setAttribute('style', `background: linear-gradient(135deg, ${activeProject.color} 0%, hsl(from ${activeProject.color} h s calc(l - 10)) 100%);`);
    }


    static updateProjectList() {
        this.projectDropdown.replaceChildren();
        const projects = Project.getProjects();
        for (let project of projects) {
            const projectListing = document.createElement('div');
            projectListing.textContent = project.name;

            projectListing.addEventListener('click', e => {
                Project.setActiveProject(project);
                this.updateActiveProject();
            });

            this.projectDropdown.appendChild(projectListing);

        }
    }
}

DOMEditor.assignEvents();
export { DOMEditor };
