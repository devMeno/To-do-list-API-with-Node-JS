import {readFile} from 'node:fs/promises';
const path = '/storage/tasks.json'

export async function getAllTasks() {
    const tasks = await readFile(path , 'utf8');
    return JSON.parse(tasks);
}