var assert = require('assert');
const News = require('../src/model/news');

describe('Reading news out of the database ->', () => {
    let news;
    beforeEach((done) => {
        news = new News({
          "title": "exercitationem ab dolores",
          "description": "Soluta quae corrupti corporis quibusdam nesciunt suscipit.",
          "image": "https://s3.amazonaws.com/uifaces/faces/twitter/jnmnrd/128.jpg",
          "likes": 3,
          "dislikes": 4,
        });
        news.save().then(() => {
            done();
        })
    });

    it('Find all news items', (done) => {
        News.find({title: 'exercitationem ab dolores'}).then((news) => {
            assert(news[0].title === 'exercitationem ab dolores');
            done();
        })
    });

});
