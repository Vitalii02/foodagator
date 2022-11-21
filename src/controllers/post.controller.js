const db = require("../model/db");
const { getUserId } = require("../utils/getUserId");
const { Post } = require("../model/db");
const { PostComment } = require("../model/db");

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

exports.getAllComments = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Invalid value");
    }
    const postId = req.query.postId;
    const data = await db.PostComment.findAll({
      where: {
        postId,
      },
    });
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Invalid value");
    }
    const sort = req.query.sort || "ASC";
    const data = await db.Post.findAndCountAll({
      order: [["createdAt", sort]],
      offset: req.query.offset ?? DEFAULT_OFFSET,
      limit: req.query.limit ?? DEFAULT_LIMIT,
    });
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.getSystemComments = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Invalid value");
    }
    const postId = req.query.postId;
    const data = await db.PostComment.findAll({
      where: {
        postId,
        type: "system",
      },
    });
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    if (!req || !req.body) {
      throw new Error("Body invalid");
    }
    const body = req.body;
    const userId = getUserId(req.headers.authorization);
    const post = new Post({
      userId,
      ...body,
    });
    await post.save();
    return res.status(201).json({ message: "Post has been created!" });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    if (!req || !req.body || !req.query) {
      throw new Error("Invalid value");
    }
    const userId = getUserId(req.headers.authorization);
    const postId = req.query.id;
    const commentFromPost = req.body.comment;
    const type = req.query.type;

    const newComment = new PostComment({
      postId,
      userId,
      comment: commentFromPost,
      type,
    });
    const foundPost = await db.Post.findOne({ where: { id: postId } });
    if (!foundPost) {
      throw new Error("Post does not exist");
    }

    await newComment.save();
    return res.status(201).json({ message: "Comment has been created!" });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.changeLike = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Invalid value");
    }
    const userId = getUserId(req.headers.authorization);
    await db.sequelize.transaction(async (transaction) => {
      const id = req.query.id;
      let foundComment = await db.PostComment.findOne(
        {
          where: { id },
        },
        { transaction }
      );

      if (!foundComment) {
        throw new Error("Comment does not exsist");
      }
      const likeCount = foundComment.likeCount;
      let foundLike = await db.LikeOwner.findOne(
        { where: { commentId: id } },
        { transaction }
      );

      if (!foundLike) {
        foundLike = await db.LikeOwner.build(
          {
            userId,
            commentId: id,
          },
          { transaction }
        );
        await foundComment.update(
          { likeCount: likeCount + 1 },
          { transaction }
        );
        await foundLike.save();
      } else {
        await foundComment.update(
          { likeCount: likeCount - 1 },
          { transaction }
        );
        await db.LikeOwner.destroy({ where: { userId, commentId: id } });
      }
      return res.status(200).json({ message: "Like change" });
    });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};
