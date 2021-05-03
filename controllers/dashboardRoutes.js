const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      
      const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id,
        },  
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
  
      res.render('dashboard', { 
        posts, 
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findOne( {
        where: {
            id: req.params.id,
        },  
        attributes: [
          'id',
          'post_text',
          'title',
          'date_created',
        ],
        include: [
         
          {
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
  
      const post = postData.get({ plain: true });
  
      res.render('editPost', {
        ...post,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/edituser/:id', withAuth, async (req, res) => {
    try {
      const userData = await Post.findOne( {
          attributes: {exclude: ['password']},
        where: {
            id: req.session.user_id,
        },  
      });
  
      const user = userData.get({ plain: true });
  
      res.render('edit-user', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/newPost', withAuth, async (req, res) => {
    try {  
      res.render('newPost', {
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  module.exports = router;
  