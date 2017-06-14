import _ from 'lodash';
import faker from 'faker';
import {MongoClient} from 'mongodb';

const MINIMUM_NEWS = 10;
const NEWS_TO_ADD = 30;

const dburl = 'mongodb://heroku_rg38vss6:nrffnkeef1erkkueih07m5gh0s@ds133271.mlab.com:33271/heroku_rg38vss6';

/* Fill fake data only if count is less than Minimum News */
MongoClient.connect(dburl, (err, db) => {
    db.createCollection("news", (err, collection) => {
        collection.count((err, count) => {
            if (count < MINIMUM_NEWS) {
                const news = _.times(NEWS_TO_ADD, () => createNews());
                collection.insertMany(news, (err, result) => {
                    if (result) {
                        console.log('All dummy datas has been inserted');
                    }
                });
            } else {
                console.log('Database already has minimum news items');
            }
        });
    });
});

function createNews() {
    return {
        title: faker.lorem.words(),
        description: faker.lorem.paragraphs(),
        image: faker.image.image(),
        posted_date: faker.date.past(),
        likes: randomBetween(5, 10),
        dislikes: randomBetween(3, 5)
    };
}

function randomBetween(min, max) {
    return ~~ (Math.random() * (max - min)) + min;
}
