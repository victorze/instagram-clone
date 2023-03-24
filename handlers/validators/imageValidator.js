const { logger } = require('..')
const { BadRequestError } = require('../../controllers/httpErrors')

const validateImage = (req, res, next) => {
  const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']
  const contentType = req.header('content-type')

  if (!validMimeTypes.includes(contentType)) {
    logger.warn('La extensión de la imagen debe ser jpeg, jpg o png (username: %s)', req.user.username)
    throw new BadRequestError('La extensión de la imagen debe ser jpeg, jpg o png')
  }

  const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
  const extension = contentType.split('/')[1]
  req.fileName = `${uniqueName}.${extension}`
  next()
}

module.exports = {
  validateImage
}
