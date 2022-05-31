const route = require('express').Router()
const { postController, commentController, likeController } = require('../controllers')
const { validateImage, id, validatePost, validateComment } = require('../handlers/validators')
const { auth } = require('../handlers')

route.post('/', [auth, validatePost], postController.store)
route.post('/upload', [auth, validateImage], postController.upload)
route.get('/feed', auth, postController.feed)
route.get('/:id', [auth, id], postController.show)
route.get('/user/:id', [auth, id], postController.userPosts)
route.get('/', auth, postController.index)

route.post('/:id/comments', [auth, id, validateComment], commentController.store)

route.post('/:id/likes', [auth, id], likeController.like)
route.delete('/:id/likes', [auth, id], likeController.unlike)

module.exports = route
