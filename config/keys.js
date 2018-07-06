module.exports = {
  mongoURI: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds121321.mlab.com:21321/betoken`,
  secretOrKey: process.env.PASS_SECRET
};