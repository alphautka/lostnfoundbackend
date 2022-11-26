import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import {pool} from './db.js';


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('common'));


app.get("/", (req, res) => {
    res.send({success:true});
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        // throw error
    }

    pool.query(`SELECT * from users where username='${username}'`, (error, results, fields) => {
        if (!!error) {
            res.send(error);
        } else {
            if (results.length && results[0].password === password) {
                res.send(results[0]);
            } else {
                res.status(401)
                res.send('unauthorized');
            }
            // res.send(results);
        }
    });
})

app.listen(3000);