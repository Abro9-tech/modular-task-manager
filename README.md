#  Modular Task Manager

A lightweight, modular JavaScript task manager built with ES Modules.  
Users can add, edit, delete, filter, search, and mark tasks as completed — all persisted in `localStorage`.  
Supports due dates, overdue task highlighting, and safe rendering with `escapeHTML`.

---

##  Features

-  Add, edit, delete, and toggle tasks  
-  Filter tasks (All / Active / Completed) and search by keyword  
-  Timed tasks with due date and overdue highlighting  
-  Persistent data storage using `localStorage`  
-  Modular design using ES Modules:
  - `Task.js` – defines the task entity  
  - `store.js` – handles saving/loading from localStorage  
  - `view.js` – safely renders UI  
  - `utils.js` – provides helper utilities  
  - `app.js` – connects everything together  

---

##  Concepts Demonstrated

- Classes and object-oriented programming in JavaScript  
- Data persistence using `localStorage`  
- DOM manipulation and event delegation  
- Input sanitization with `escapeHTML`  
- Modular architecture with ES Modules (`import` / `export`)  

---


### 1. Clone the repository
```bash
git clone https://github.com/Abro9-tech/modular-task-manager.git
