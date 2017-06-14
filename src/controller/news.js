var News = require('../model/news');

module.exports = {
    greetingMessage(req, res) {
        res.status(200).json({hi: 'Welcome to mock news api of inshorts tribute'})
    },
    getAllNews(req, res) {
        const {page} = req.query;
        const LIMIT = 9;
        let pageno = (page) ? page : 1;

        //build dynamic query
        let query = News.find({});

        //skip records if pageno is passed in the query
        if (pageno > 1) {
            query = query.skip(page * LIMIT);
        }
        query = query.limit(LIMIT);

        query.then((newsitems) => {
            res.status(200).json({newsitems});
        }).catch((err) => {
            res.status(500).json({"error": 'Sorry no news items exists'});
        });
    },
    getSingleNews(req, res) {
        const {newsid} = req.params;

        News.findOne({'_id': newsid})
        .then((singlenews) => {
            res.status(200).json({singlenews});
        })
        .catch((err) => {
            res.status(500).json({"error": 'Sorry no news items exists for the given id'});
        });
    },
    updateSingleNews(req, res){
           const {newsid} = req.params;
           const updateObj = req.body;

           News.findByIdAndUpdate(newsid,updateObj)
           .then((updatednews) =>{
                res.status(200).json({"success": 'News item has been updated'});
           })
           .catch((err) => {
               res.status(500).json({"error": 'Sorry unable to update'});
           });
    }
}
