class Storage {
    
    
    static #isAvailable;
    static #storageObject;
    static {
        let storage;
        try {
            storage = window["localStorage"];
            const x = '__DataStorageTestData__';
            storage.setItem(x, x);
            storage.removeItem(x);
            this.#isAvailable = true;
            this.#storageObject = storage;        
        } catch (e) {
            this.#isAvailable = (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
              );
        }
    }

    static setStorage(key, value) {
        if (this.#isAvailable) {
            this.#storageObject.setItem(key, value);
        }
    }

    static getStorage(key) {
        if (this.#isAvailable) {
            return this.#storageObject.getItem(key);
        }
    }
    
    static removeStorage(key) {
        if (this.#isAvailable) {
            this.#storageObject.removeItem(key);
        }
    }
    
    static clearStorage() {
        if (this.#isAvailable) {
            this.#storageObject.clear();
        }
    }

}

export { Storage };