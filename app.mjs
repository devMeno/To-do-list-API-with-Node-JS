import {createServer} from 'node:http';
import {json} from 'node:stream/consumers';
import {createTask, deleteTask, getAllTasks, updateTask} from "./functions/tasks_storage.mjs";


createServer(async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const url = new URL(req.url, `http://${req.headers.host}`);

        if (url.pathname === '/tasks') {

            try {
                switch (req.method) {
                    case 'GET':
                        const tasks = await getAllTasks();
                        res.write(JSON.stringify(tasks));
                        break;
                    case 'POST':
                        const newTask = await createTask(await json(req));
                        res.write(JSON.stringify(newTask));
                        break;
                    case 'DELETE':
                        await deleteTask(parseInt(url.searchParams.get('id'),10));
                        res.writeHead(204)
                        break;
                    case 'PUT':
                        const task = await updateTask(await json(req));
                        res.write(JSON.stringify(task));
                        break;
                }
            }catch(err) {
                return res.status(500).send(err.message);
            }

        }else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
        }
    }catch(err) {
        throw err;
    }
    res.end()
})
.listen(3000);