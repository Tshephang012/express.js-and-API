module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ message: 'API key missing' });
  }

  if (apiKey !== 'secret123') {
    return res.status(403).json({ message: 'Invalid API key' });
  }

  next();
};
