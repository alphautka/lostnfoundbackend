import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import {pool} from './db.js';


const app = express();
app.use(cors());
app.use(morgan('common'));


app.get("/", (req, res) => {
    res.send({success:true});
});

app.post('/login', (req, res) => {
    pool.query('SELECT * from users', (error, results, fields) => {
        if (!!error) {
            res.send(error);
        } else {
            res.send(results[0]);
        }
    });
})

app.listen(3000);