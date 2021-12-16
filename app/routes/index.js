const userRoutes = require('./user.routes');

const appRoutes = (app) => {
    app.use('/user', userRoutes);

}

module.exports = appRoutes;