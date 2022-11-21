//-----------------------------------DB----------------------------------------\\

const DB_CART_TITLE = "carts";
const DB_USER_TITLE = "user";
const DB_REFERRAL_TITLE = "referral";
const DB_PRODUCT_TITLE = "product";
const DB_CART_PRODUCT_TITLE = "cart_product";
const DB_USER_REFERRAL_BADGE = "badge_from_user";
const DB_POST_TITLE = "post";
const DB_POST_COMMENT_TITLE = "post_comment";
const DB_LIKE_OWNER = "like_owner";

//-----------------------------------Cart----------------------------------------\\

const CALCULATE_DELIVERY = [
  {
    deliveryLimits: 1,
    costOfDelivery: 25,
  },
  {
    deliveryLimits: 400,
    costOfDelivery: 35,
  },
  {
    deliveryLimits: 1000,
    costOfDelivery: 50,
  },
];

module.exports = {
  DB_CART_TITLE,
  DB_USER_TITLE,
  DB_REFERRAL_TITLE,
  DB_PRODUCT_TITLE,
  DB_CART_PRODUCT_TITLE,
  CALCULATE_DELIVERY,
  DB_USER_REFERRAL_BADGE,
  DB_POST_TITLE,
  DB_POST_COMMENT_TITLE,
  DB_LIKE_OWNER,
};
