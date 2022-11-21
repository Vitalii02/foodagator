const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  dialect: process.env.PG_DIALECT,
  pool: {
    max: +process.env.PG_POOL_MAX,
    min: +process.env.PG_POOL_MIN,
    idle: +process.env.PG_POOL_IDLE,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("The application is connected to the database successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Product = require("./product.model")(sequelize, Sequelize);
db.Cart = require("./cart.model.js")(sequelize, Sequelize);
db.CartProduct = require("./cartProduct.model")(sequelize, Sequelize);
db.Referral = require("./referral.model")(sequelize, Sequelize);
db.BadgeUser = require("./userBadge.model")(sequelize, Sequelize);
db.Post = require("./post.model")(sequelize, Sequelize);
db.PostComment = require("./postComment.model")(sequelize, Sequelize);
db.LikeOwner = require("./likeOwner_model")(sequelize, Sequelize);

sequelize.sync({ force: false });

module.exports = db;
