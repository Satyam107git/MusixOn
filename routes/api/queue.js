const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Playlist = require('../../models/Playlist');
const Queue = require('../../models/Queue');

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('subtitle', 'Subtitle is required').not().isEmpty(),
      check('image', 'Image url is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const song = await Queue.findOne({
        title: req.body.title,
        user: req.user.id,
      });
      if (song) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Song already added to Queue' }] });
      }
      const newSong = new Queue({
        title: req.body.title,
        subtitle: req.body.subtitle,
        image: req.body.image,
        user: req.user.id,
      });
      await newSong.save();
      res.json(newSong);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const songs = await Queue.find({ user: req.user.id });
    res.json(songs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const song = await Queue.findById(req.params.id);
    if (!song) return res.status(404).json({ msg: 'Song not found' });
    await song.remove();
    res.json({ msg: 'Song removed from playlist' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Song not found' });
    res.status(500).send('Server Error');
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    await Queue.deleteMany({ user: req.user.id });
    res.json({ msg: 'Queue cleared' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
