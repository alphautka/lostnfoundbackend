const express = require('express');
const morgan = require('morgan');
const cors = require('cors')


const app = express();
app.use(cors());
app.use(morgan('common'));


app.get("/", (req, res) => {
    res.send({success:true});
});

app.listen(3000);