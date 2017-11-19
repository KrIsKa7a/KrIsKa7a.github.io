const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const articleContorller = require('./../controllers/article.js');

module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/article/create', articleContorller.createGet);
    app.post('/article/create', articleContorller.createPost);

    app.get('/article/details/:id', articleContorller.details);
};

