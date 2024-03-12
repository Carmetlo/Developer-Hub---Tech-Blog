import express from "express";
import { Post, User, Comment } from "../../models/index";
import withAuth from "../../utils/withAuth";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, Post }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["name"] },
        { model: Comment, include: [{ model: User, attributes: ["name"] }] },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{ model: User, attributes: ['name'] }]
        })
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
})

router.get('/editpost/:id', withAuth async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
      include: [
      { model: User, attributes: ['name'],
      },
      { model: Comment, include: [{ model: User, attributes: ['name'] }] },
      ],
      });
      const post = postData.get({ plain: true });
      res.render('edit-post', {
          post,
          loggedIn: req.session.loggedIn
      })
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
})

export default router;