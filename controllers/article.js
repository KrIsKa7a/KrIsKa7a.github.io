const Article = require('mongoose').model('Article');
//const Article = require('./../models/Article');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: (req, res) => {
        let articleArgs = req.body;

        let errorMsg = '';

        if(!req.isAuthenticated()){
            errorMsg = "You should be logged in to make some articles!";
        }
        else if(!articleArgs.title){
            errorMsg = "You should give a title to your article!";
        }
        else if(!articleArgs.content){
            errorMsg = "Your article should have any content!";
        }

        if(errorMsg){
            res.render('article/create', {error: errorMsg});
            return;
        }
        else{
            articleArgs.author = req.user.id;
            console.log(req.user);

            Article.create(articleArgs).then(article => {
                console.log(req.params.user.articles);
                req.user.articles.push(article.id);
                req.user.save(err => {
                    if(err){
                        res.redirect('/', {error: err.message});
                    }
                    else{
                        res.redirect('/')
                    }
                    }
                )
            })
        }
    },
    details: (req, res) => {
        let id = req.params.id;

        Article.findById(id).then(article => {
            res.render('article/details', article)
        });
    }
};