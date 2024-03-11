import express from 'express';
import { User, Post } from '../../models/index';
import withAuth from '../../utils/withAuth';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [Post]
    })
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    console.log(newUser);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    })
    } catch (err) {
        res.status(400).json(err);
        }
    })

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
        }
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  export default router;
