import {readFile,writeFile} from 'node:fs/promises';
const path = './storage/tasks.json'

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 *
 * @returns {Promise<Todo[]>}
 */

export async function getAllTasks() {
    //The function just read the file tasks.json
    const tasks = await readFile(path , 'utf8');
    return JSON.parse(tasks);
}

/**
 * @param {string} title
 * @param {boolean} completed
 * @return {Promise<Todo>}
 */
export async function createTask({title, completed }) {
    //Create the new task and add it to the tasks list
    const newTask = {title, completed, id: Date.now()};
    const tasks = [newTask,...await getAllTasks()];
    //Write the new tasks list in tasks.json and return the new task
    await writeFile(path, JSON.stringify(tasks));
    return newTask;
}

/**
 * @param {number} id
 * @return {Promise}
 */
export async function deleteTask(id) {
    //Get the tasks list and find the task that should be deleted
    const tasks = await getAllTasks();
    const isExists = tasks.find((task) => task.id === id);
    if (!isExists) {return null}
    //Write the new tasks list in tasks.json and return nothing
    const newList = tasks.filter(task => task.id !== id);
    await writeFile(path, JSON.stringify(newList));
}

/**
 * @param {number} id
 * @property {string} title
 * @property {boolean} completed
 * @return {Promise<Todo[]>}
 */
export async function updateTask({id, title, completed}) {
    //Get tasks list and find the task who will be updated
    const tasks = await getAllTasks();
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) {return null}
    //Change the task values, write the new tasks list in tasks.json and return this list
    taskToUpdate.completed = completed;
    taskToUpdate.title = title;
    await writeFile(path, JSON.stringify(tasks));
    return tasks;
}