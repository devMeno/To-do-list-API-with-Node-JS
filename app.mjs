import createServer from 'node:http';
import {getAllTasks} from "./functions/tasks_storage.js";
createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const tasks = await getAllTasks();
    res.write(JSON.stringify(tasks));

    res.end()
})
.listen(3000);