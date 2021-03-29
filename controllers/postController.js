const mongoose = require('mongoose');
const slug = require('slug');
const Post = mongoose.model('Post');

exports.add = (req, res)=>{
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    req.body.tags = req.body.tags.split(',').map(t=>t.trim());
    const post = new Post(req.body);

    try{
        await post.save(); //só salva no banco após esse comando
    } catch(error) {
        req.flash('error', 'Erro: '+error.message);
        return res.redirect('/post/add');
    }
    

    req.flash('success', 'Post salvo com sucesso!');

    res.redirect('/');
};

exports.edit = async (req, res) => {
    //Pegando as informações
    const post = await Post.findOne({ slug:req.params.slug });

    // Carregar o formulário de edição
    res.render('postEdit', {post:post});
};

exports.editAction = async (req, res) => {
    //Manipulando as tags
    req.body.tags = req.body.tags.split(',').map(t=>t.trim());
    //Editar o slug
    req.body.slug = slug(req.body.title, {lower:true});

    try{
        // Procurar o item enviado
        //Pegar os dados e atualizar
        const post = await Post.findOneAndUpdate(
            { slug:req.params.slug },
            req.body,
            {
                new:true, //retorna o novo post atualizado
                runValidators:true
            }
        );
    } catch (error) {
        req.flash('error', 'Erro: '+error.message);
        return res.redirect('/post/'+req.params.slug+'/edit');
    }
    //Mostrar mensagem de sucesso e redirecionar para a home
    req.flash('success', "Post atualizado com sucesso !");

    res.redirect('/');
};

exports.view = async (req, res) =>{
    const post = await Post.findOne({ slug:req.params.slug });

    res.render('view', {post:post});
};