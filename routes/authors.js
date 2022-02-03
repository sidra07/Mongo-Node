const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', async(req, res) => {
    let searchOption = {}
    if(req.query.name!=null && req.query.name!=""){
        searchOption.name = new RegExp(req.query.name, 'i')
       // searchOption.genre = new RegExp(req.query.name, 'i')
    }
    try {
        const author = await Author.find(searchOption);
        res.render('authors/index',{
            authors : author,
            searchName : req.query.name
        });
    } catch (error) {
        res.redirect('/authors/new');
    }
});

router.get('/new', (req, res) => {
    res.render('authors/new', {author : new Author()});
});

router.post('/', async (req, res) => {
   // res.send("Author Name : "+req.body.name+"<br>Genre : "+req.body.genre);
   const author = new Author({
       name : req.body.name,
       genre : req.body.genre
   });
   try {
       const newAuthor = await author.save();
       res.redirect('/authors');
   } catch (error) {
       res.render('authors/new', {
           author : author,
           errorMessage : "Error creating author"
       })
   }
});

module.exports = router;