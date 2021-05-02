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
                'post_text',
                'date_created'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
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
        'title',
        'post_text',
        'date_created',
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
      ]
    });

    const post = postData.get({ plain: true });

    res.render('singlePost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});



module.exports = router;
