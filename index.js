import  express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import HomeRouter from './Router/Home.Route.js';
import session from 'express-session';
import { connectDB } from './config/db.js';
import filterRouter from './Router/Filter.Route.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

connectDB();
app.use('/',HomeRouter);
app.use('/filter', filterRouter);

app.use('/f1',(req,res)=>{ 
    req.session.ht = 22222;
    res.send('F1 page');
});
app.use('/gt',(req,res)=>{ 
    const htValue = req.session.ht;
    res.send(`GT page with ht value: ${htValue}`);
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});