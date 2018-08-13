const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/acme', { logging: false });

const User = db.define('users', {
    name: Sequelize.STRING
});

const Dim = db.define('dimension', {
    dimension: Sequelize.STRING
});

Dim.belongsToMany(User, {through: 'userInDim'});
User.hasMany(Dim);
//User.belongsToMany(Dim);

const seed = () => {
    return Promise.all([
        User.create({ name : 'Rick'}),
        User.create({ name : 'Morty'}),
        User.create({ name : 'Summer'}),
        User.create({ name : 'Beth'}),
        User.create({ name : 'Jerry'}),
        Dim.create({ dimension : 'C137'}),
        Dim.create({ dimension : '35C'}),
        Dim.create({ dimension : 'C500-A'})
    ]); 
};

const sync = () => {
    return db.sync({ force : true})
};

module.exports = {
    models : {
        User,
        Dim
    }, 
    sync, 
    seed
};