import express from 'express';
import { Post, User, Comment } from '../../models/index.js';
import withAuth from '../../utils/withAuth.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [User, Comment]
    })
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/:id',  async (req, res) => {
    try {
        const onePost = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name' ]},
                { model: Comment, include: [{ model: User, attributes: ['name' ]}],
                },
            ],
        })
        if (!onePost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(onePost);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            content: req.body.post_text,
            user_id: req.session.user_id,
            title: req.body.post.title
        })
        console.log(newPost);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            }
        })
        if (!updatedPost[0]) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
            }
        })
        if (!deletedPost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

export default router;


