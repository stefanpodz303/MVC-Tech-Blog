const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne( {

      where: {
        id: req.params.id,
    },  
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
      ]
    });

    const post = postData.get({ plain: true });

    res.render('single-post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});



module.exports = router;
