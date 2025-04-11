import {createServer} from 'node:http';
import {json} from 'node:stream/consumers';
import {createTask, deleteTask, getAllTasks} from "./functions/tasks_storage.mjs";


createServer(async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const url = new URL(req.url, `http://${req.headers.host}`);

        if (url.pathname === '/tasks') {
            if (req.method === 'GET') {
                const tasks = await getAllTasks();
                res.write(JSON.stringify(tasks));
            }else if (req.method === 'POST') {
                const newTask = await createTask(await json(req));
                res.write(JSON.stringify(newTask));
            }else if (req.method === 'DELETE') {
                await deleteTask(parseInt(url.searchParams.get('id'),10));
                res.writeHead(204)
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