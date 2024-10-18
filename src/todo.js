import { isAfter } from "date-fns";

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

    
    /** @type {Date} */
    #dueDate;

    /** @type { Priority } */
    #priority;

    //optional
    #checklist;

    constructor(title, dueDate, priority, checklist = null) {
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
        this.#checklist = checklist;
    }

    #constructFromJSON(completed, title, dueDate, priority, checklist = null) {
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

    setTitle(title) {
        this.#title = title;
    }

    getTitle() {
        return this.#title;
    }

    setDueDate(date) {
        this.#dueDate = date;
    }

    getDueDate() {
        return this.#dueDate;
    }

    isDue() {
        return isAfter(new Date(), this.#dueDate);
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
        

        //fix this, or maybe not. focus on implementation first
        const privateObj = new ToDo('blank', 'blank', 1);
        privateObj.#constructFromJSON(completed, title, dueDate, priority.value, checklist);
        return privateObj;
    }
}

console.log("Todo loaded");

export {ToDo};  

