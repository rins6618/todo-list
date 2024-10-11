/**
 * Priority enum
 * @readonly
 * @enum {{name: string, value: number}}
 */
const Priority = Object.freeze({
    ONE:   { name: "one" , value: 1},
    TWO:  { name: "two", value: 2},
    THREE: { name: "three", value: 3}
});

const priorityMap = new Map(
    Object.values(Priority).map(p => [p.value, p])
);

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
            const matchedPriority = priorityMap.get(priority);
            if (matchedPriority) {
                this.#priority = matchedPriority;
            } else {
                throw new RangeError("Priority doesn't exist");
            }
        } else {
            throw new TypeError("Wrong type for priority");
        }
        this.#notes = notes;
        this.#checklist = checklist;
    }

    #constructFromJSON(completed, title, dueDate, priority, notes = null, checklist = null) {
        this.#completed = completed;
        this.#title = title;
        this.#dueDate = dueDate;
        if (typeof priority === 'number') {
            const matchedPriority = priorityMap.get(priority);
            if (matchedPriority) {
                this.#priority = matchedPriority;
            } else {
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

    setPriority(priority) {
        if (typeof priority === 'number') {
            const matchedPriority = priorityMap.get(priority);
            if (matchedPriority) {
                this.#priority = matchedPriority;
            } else {
                throw new RangeError("Priority doesn't exist");
            }
        } else {
            throw new TypeError("Wrong type for priority");
        }
    }

    getPriorityString() {
        return this.#priority.name;
    }

    getPriorityValue() {
        return this.#priority.value;
    }

    getTitle() {
        return this.#title;
    }

    // json marshalling is a SOLID violation
    // Single Principle
    // Not fond of implementing a module for this project in particular.

    serializeJSON() {
        const publicObj = { 
            completed: this.#completed,
            title: this.#title,
            dueDate: this.#dueDate,
            priority: this.#priority,
            notes: this.#notes,
            checklist: this.#checklist 
        };
        return JSON.stringify(publicObj);
    }

    static deserializeJSON(jsonStr) {
        const {completed, title, dueDate, priority, notes, checklist} = JSON.parse(jsonStr, (key, val) => {
            if (key === 'dueDate') {
                return new Date(val);
            }
            return val;
        });
        
        const privateObj = new ToDo('blank', 'blank', 1);
        privateObj.#constructFromJSON(completed, title, dueDate, priority.value, notes, checklist);
        return privateObj;
    }
}

console.log("Todo loaded");

export {ToDo};  

