const mongoose = require('mongoose');
const { response } = require('express');
const Post = mongoose.model('Post');

exports.index = async (req, res)=>{
    let data = {
        pageTitle:'Título de teste',
        posts:[],
        tags:[],
        tag:''
    };

    response.tag = req.query.t;
    const postFilter =  (typeof response.tag != 'undefined') ? {tags:response.tag}: {};

    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.find(postFilter);

    const [tags, posts] = await Promise.all([
        tagsPromise,
        postsPromise
    ]);

    for(let i in tags) {
        if(tags[i]._id == response.tag){
            tags[i].class = 'selected'
        }
    }

    response.tags = tags;
    response.posts  = posts;

    res.render('home', response);
};