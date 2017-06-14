const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db = mongoose.connection;

before((done) => {
    mongoose.connect('mongodb://localhost/inshorts-db');
    db.once('open', () => {
        console.log('Good to go!');
        done();
    }).on('error', (error) => {
        console.warn('Warning', error);
    });
});

beforeEach((done) => {
    const { news } = db.collections;
    news.drop(() => {
      done();
    });
});
