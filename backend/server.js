const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const {login, signup} = require('./controllers/signController')
const {getPosts, createPost, removePost, editPost} = require('./controllers/postController')
const {getUsers, deleteUserById} = require('./controllers/userController')
const {getSubscriptions, unsubscribeCreator, subscribeCreator} = require("./controllers/subscriptionsController");
const {getCreator, updateCreator, getCreators} = require("./controllers/creatorController");


const app = express();
const port = 3025;

app.use(cors());
app.use(express.json());

const server = 'ledokol-api';
``
app.get('ledokol-api/posts', getPosts)
app.get('ledokol-api/users', getUsers)
app.get('ledokol-api/subscriptions', getSubscriptions)
app.get('ledokol-api/login', login);
app.get('ledokol-api/creator', getCreator);
app.get('ledokol-api/creators', getCreators)

app.put('ledokol-api/post', editPost)
app.put('ledokol-api/creator', updateCreator)

app.delete('ledokol-api/users', deleteUserById)



app.post('ledokol-api/subscriptions/unsubscribe', unsubscribeCreator)
app.post('ledokol-api/subscriptions/subscribe', subscribeCreator)
app.post('ledokol-api/posts', createPost);
app.post('ledokol-api/signup', signup);
app.post('ledokol-api/post/remove', removePost)


// app.post('ledokol-api/posts/:postId/like', async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const userId = req.body.userId;
//
//     const updatedPost = await CombinedPosts.findByIdAndUpdate(
//         postId,
//         { $addToSet: { likes: { user_id: userId, timestamp: Date.now()/1000 } } },
//         { new: true }
//     );
//
//
//     res.json(updatedPost);
//   } catch (error) {
//     console.error('Error adding like:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
//
// app.post('ledokol-api/posts/:postId/unlike', async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const userId = req.body.userId;
//
//     const updatedPost = await CombinedPosts.findByIdAndUpdate(
//         postId,
//         { $pull: { likes: { user_id: userId } } },
//         { new: true }
//     );
//
//
//     res.json(updatedPost);
//   } catch (error) {
//     console.error('Error removing like:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});