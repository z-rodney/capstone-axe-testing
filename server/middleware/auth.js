const { getUserBySession } = require('../db/neo4j/session');

const auth = async (req, res, next) => {
  if (req.cookies) {
    // If request has cookies, grab existing sessionId
    const { sessionId } = req.cookies;
    if (!sessionId) {
      console.log('No session.');
      req.user = null;
    } else {
      // Get user with given sessionId
      const user = await getUserBySession(sessionId);
      if (!user) {
        console.log('Invalid sessionId.');
        res.clearCookie('sessionId');
        req.user = null;
      } else {
        // You could update the expiry of the cookie here if desired
        req.user = user;
      }
    }
  }
  next();
}

module.exports = auth;
