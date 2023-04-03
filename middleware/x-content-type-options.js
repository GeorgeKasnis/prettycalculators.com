export default function (req, res, next) {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    next()
  }
  