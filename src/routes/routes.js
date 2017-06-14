const NewsController = require('../controller/news');

module.exports = (app) => {
    app.get('/', NewsController.greetingMessage);
    app.get('/api/news', NewsController.getAllNews);
    app.get('/api/news/:newsid', NewsController.getSingleNews);
    app.put('/api/news/:newsid', NewsController.updateSingleNews);
}
