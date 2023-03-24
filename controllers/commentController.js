import { Post } from '../models/index.js'
import { logger } from '../utils/index.js'

export const store = async (req, res) => {
  const { message } = req.body
  const post = await Post.findById(req.params.id)

  post.comments.push({ author: req.user, message })
  const updatedPost = await post.save()
  const comment = updatedPost.comments[updatedPost.comments.length - 1]
  logger.info(
    `El usuario '${req.user.username}' comentó el post con id '${req.params.id}'`
  )

  res.status(201).json(comment)
}
