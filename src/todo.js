/**
 * Priority enum
 * @readonly
 * @enum {{name: string}}
 */
const Priority = Object.freeze({
    ONE:   { name: "one" },
    TWO:  { name: "two"},
    THREE: { name: "three" }
  });


class ToDo {

    #completed;
    #title;
    #dueDate;

    /** @type { Priority } */
    #priority;

    //optional
    #notes;
    #checklist;

    constructor(title, dueDate, priority, notes = null, checklist = null) {
        this.#completed = false;
        this.#title = title;
        this.#dueDate = dueDate;
        if (typeof priority === 'number') {
            switch (priority) {
                case 1:
                    this.#priority = Priority.ONE;
                    break;
                case 2:
                    this.#priority = Priority.TWO;
                    break;
                case 3:
                    this.#priority = Priority.THREE;
                    break;
                default:
                    throw new RangeError("Priority doesn't exist");
            }
        } else {
            throw new TypeError("Wrong type for priority");
        }
        this.#notes = notes;
        this.#checklist = checklist;
        
    }

    isCompleted() {
        return this.#completed;
    }

    setCompleted(bool) {
        this.#completed = bool;
    }

    getPriorityString() {
        return this.#priority.name;
    }

    getTitle() {
        return this.#title;
    }

    exposeJSON() {
        const publicObj = { 
            title: this.#title,
            dueDate: this.#dueDate,
            priority: this.#priority,
            notes: this.#notes,
            checklist: this.#checklist 
        };
        return JSON.stringify(publicObj);
    }
}

console.log("Todo loaded");

export {ToDo};

