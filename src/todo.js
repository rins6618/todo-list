
class ToDo {
    #title;
    #description;
    #dueDate;
    #priority;

    //optional
    #notes;
    #checklist;

    constructor(title, description, dueDate, priority, notes = null, checklist = null) {

        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#notes = notes;
        this.#checklist = checklist;
        

    
    }

    exposeJSON() {
        const publicObj = { 
            title: this.#title,
            decription: this.#description,
            dueDate: this.#dueDate,
            priority: this.#priority,
            notes: this.#notes,
            checklist: this.#checklist 
        };
        return JSON.stringify(publicObj);
    }
}

console.log("Todo loaded");
const todo = new ToDo("Foo", "Bar", new Date(), 4);
console.log(todo.exposeJSON());