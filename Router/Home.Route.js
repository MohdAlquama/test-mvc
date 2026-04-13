import express from 'express';
const HomeRouter = express.Router();

HomeRouter.get('/', (req, res) => {
    res.render('index');
});

HomeRouter.get('/welcome', (req, res) => {
    res.send('Welcome to the Home Page!');
});

export default HomeRouter;