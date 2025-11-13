export class Task {
    constructor(id, title, done = false) {
        this.id = String(id);
        this.title = String(title).trim();
        this.done = Boolean(done);
    }

    toggle() {
        this.done = !this.done;
    }

    toJSON() {
        return { id: this.id, title: this.title, done: this.done };
    }

    static from(obj) {
        if (!obj) return null;
        return new Task(obj.id, obj.title, obj.done);
    }
}

// ---------------------------
// TimedTask subclass
// ---------------------------
export class TimedTask extends Task {
    constructor(id, title, dueDate, done = false) {
        super(id, title, done);
        this.dueDate = dueDate ? new Date(dueDate) : null;
    }

    isOverdue() {
        return !this.done && this.dueDate && new Date() > this.dueDate;
    }

    toJSON() {
        return {...super.toJSON(), dueDate: this.dueDate ? this.dueDate.toISOString() : null };
    }

    static from(obj) {
        if (!obj) return null;
        return new TimedTask(obj.id, obj.title, obj.dueDate, obj.done);
    }
}