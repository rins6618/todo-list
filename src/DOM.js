import { Project } from './project';
import './dialog.css'
import { ToDo } from './todo';

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




    // "static constructor"
    static {

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
    
            project.pushTodo(
                new ToDo('Super Extra Long Todo Name That Gets Clipped', new Date(), 1), 
                new ToDo('Do that', new Date(), 2), 
                new ToDo('and that', new Date(), 3)
            );    

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
        this.main.replaceChildren();
        const activeProject = Project.getActiveProject();
        const icon = document.querySelector("#project-icon");
        let projectName = activeProject.name;
        if (projectName.length > 12) {
            projectName = projectName.slice(0, 9) + '...';
        }
        document.querySelector("#project-name").textContent = activeProject.name;
        icon.textContent = activeProject.name.toUpperCase().at(-1);
        icon.setAttribute('style', `background: linear-gradient(135deg, ${activeProject.color} 0%, hsl(from ${activeProject.color} h s calc(l - 10)) 100%);`);
        this.updateMainContent();
    }

    static updateProjectList() {
        this.projectDropdown.replaceChildren();
        const projects = Project.getProjects();

        projects.sort((a, b) => a.getID() > b.getID() ? 1 : -1 );
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

    static updateMainContent() {
        if (!Project.isActiveBlank()) {
            if (this.main.classList.contains("empty")) {
                this.main.classList.remove("empty");
                
            }
        } else {
            if (!this.main.classList.contains("empty")) {
                this.main.classList.add("empty");
                return;
            }
        }
        
        const activeProject = Project.getActiveProject();
        const toDoList = activeProject.getTodos();
        const listElem = document.createElement('ul');

        
        const gradientTop = document.createElement('div');
        const gradientBottom = document.createElement('div');
        gradientTop.classList.add("gradient", "top");
        gradientBottom.classList.add("gradient", "bottom");
        

        this.main.append(gradientTop, gradientBottom);
        listElem.classList.add("flex");

        toDoList.forEach( (toDo, index) => {
            const li = document.createElement('li');

            const iconCheck = document.createElement("iconify-icon");
            const iconMore = document.createElement("iconify-icon");
            iconMore.classList.add('more');

            const moreContent = document.createElement("div"); 
            moreContent.classList.add("more-content");

            // Inner buttons scope
            {
                
                /**
                 * @type {{name: string, icon: string, alt: string}[]}
                 */
                const BUTTONS = [
                    {name: 'move-up', icon: 'material-symbols:arrow-upward-alt-rounded', alt: 'Move to-do up...'},
                    {name: 'move-down', icon: 'material-symbols:arrow-downward-alt-rounded', alt: 'Move to-do down...'},
                    {name: 'delete', icon: 'material-symbols:delete-outline-rounded', alt: 'Remove to-do...'},
                    {name: 'cycle-priority', icon: 'material-symbols:stack-star', alt: 'Cycle priority...'},
                ];

                // callback function:
                // design: change data, then DOM
                const callback = function(name) {
                    let parent, idx, max;
                    
                    parent = li.parentNode;
                    max = [...parent.children].length - 1;
                    idx = [...parent.children].indexOf(li);

                    switch (name) {
                        case 'move-up':

                            if (idx <= 0) return;
                            const above = [...parent.children][idx - 1];
                            
                            activeProject.swapTodos(idx, idx - 1);
                            Project.setActiveProject(activeProject);
                            
                            li.after(above);
                            break;

                        case 'move-down':

                            if (idx >= max) return;
                            const below = [...parent.children][idx + 1];
                            
                            activeProject.swapTodos(idx, idx + 1);
                            Project.setActiveProject(activeProject);
                            
                            li.before(below);
                            break;

                        case 'delete':

                            activeProject.removeTodo(idx);
                            Project.setActiveProject(activeProject);
                            
                            li.remove();
                            break;

                        case 'cycle-priority':
                            
                            const newPriority = (toDo.getPriorityValue()) % 3 + 1;
                            toDo.setPriority(newPriority);
                            activeProject.replaceTodo(index, toDo);
                            
                            li.classList.remove(...li.classList);
                            li.classList.add('flex', toDo.getPriorityString());

                            break;
                        
                        default:
                    }
                }

                for (let button of BUTTONS) {
                    const {name, icon, alt} = button;
                    const elem = document.createElement('iconify-icon');
                    elem.setAttribute('icon', icon);
                    elem.setAttribute('title', alt);

                    elem.addEventListener('click', e => {
                        callback(name);
                    });
                    moreContent.appendChild(elem);
                }
            }

            iconMore.setAttribute("icon", 'material-symbols:more-horiz');
            if (toDo.isCompleted()) {
                iconCheck.setAttribute("icon", 'material-symbols:check-circle-rounded');
            } else {
                iconCheck.setAttribute("icon", 'material-symbols:circle-outline');
            }

            const text = document.createElement('span');
            let todoName = toDo.getTitle();
            if (todoName.length > 40) {
                todoName = todoName.slice(0, 40 - 3) + '...';
            }

            text.textContent = todoName;
            const switchHandler = e => {

                if (e.target.matches(".more-content, .more-content *")) return;
                const status = !toDo.isCompleted();
                toDo.setCompleted(status);
                li.classList.toggle('completed');

                if (status) {
                    iconCheck.setAttribute("icon", 'material-symbols:check-circle-rounded');
                } else {
                    iconCheck.setAttribute("icon", 'material-symbols:circle-outline');
                }
                activeProject.removeTodo(index);
                activeProject.emplaceTodo(index, toDo);
            }

            li.addEventListener('dblclick', switchHandler);
            iconCheck.addEventListener('click', switchHandler);

            li.classList.add('flex', toDo.getPriorityString());
            
            iconMore.addEventListener('click', e => {
                const json = activeProject.serializeJSON()
                console.log(json, Project.deserializeJSON(json));
                moreContent.classList.toggle('show');
            });
            

            moreContent
            li.append(iconCheck, text, iconMore, moreContent);
            
            listElem.appendChild(li);
        });
        this.main.appendChild(listElem);
    }
}

export { DOMEditor };
