const {Post} = require("../models/mongo");

const getPosts = async (req, res) => {
    let query = {};

    // if (req.query.user_id) {
    //     query.user_id = req.query.user_id;
    // }

    const posts = await Post.find(query);

    console.log(posts)
    res.status(200).json(posts);
}

const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);

        const lastPost = await Post.findOne({}, {}, { sort: { '_id': -1 } });

        newPost._id = lastPost ? lastPost._id + 1 : 1;

        const savedPost = await newPost.save();

        const query = { _id: savedPost._id };
        const updateData = { $set: req.body };

        await Post.updateOne(query, updateData);

        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getPosts,
    createPost
}