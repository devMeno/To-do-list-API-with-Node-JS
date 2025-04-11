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
    const tasks = await readFile(path , 'utf8');
    return JSON.parse(tasks);
}

/**
 * @param {string} title
 * @param {boolean} completed
 * @return {Promise<Todo>}
 */
export async function createTask({title, completed }) {
    const newTask = {title, completed, id: Date.now()};
    const tasks = [newTask,...await getAllTasks()];
    console.log(tasks);
    await writeFile(path, JSON.stringify(tasks));
    return newTask;
}

/**
 * @param {number} id
 * @return {Promise}
 */
export async function deleteTask(id) {
    const tasks = await getAllTasks();
    const isExists = tasks.find((task) => task.id === id);
    if (!isExists) {return null}
    const newList = tasks.filter(task => task.id !== id);
    await writeFile(path, JSON.stringify(newList));
}