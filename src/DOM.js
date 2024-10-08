import { Project } from './project';

class DOMEditor {


    static sidebar = document.querySelector("#sidebar");
    static closeBtn = document.querySelector("#sidebar .toggle-btn");
    static projectBtn = document.querySelector("#project-selector");
    static projectDropdown = document.querySelector("#project-dropdown");
    static createProjBtn = document.querySelector("#create-proj");


    // Must happen before everything else; "static constructor"
    static assignEvents() {

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
          const project = new Project(COLORS[idx], `Project${counter}`);
          counter++;
 
          Project.setActiveProject(project);
          Project.appendToProjects(project);

          console.log(project);
          this.updateProjectList();
        });

        console.log("Events assigned");

    }

    static updateActiveProject() {
        const activeProject = Project.getActiveProject();
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
