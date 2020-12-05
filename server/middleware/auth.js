const { getUserBySession } = require('../db/neo4j/session');

const auth = async (req, res, next) => {
  if (req.cookies) {
    const { sessionId } = req.cookies;
    if (!sessionId) {
      console.log('No session.');
      req.user = null;
    } else {
      // get user with given sessionId
      const session = await getUserBySession(sessionId);
      if (!session) {
        console.log('Invalid sessionId.');
        res.clearCookie('sessionId');
        req.user = null;
      } else {
        // You could update the expiry of the cookie here if desired.
        req.user = session;
      }
    }
  }
  next();
}

module.exports = auth;
