const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const {login, signup} = require('./controllers/userController')
const {getPosts, createPost} = require('./controllers/postController')

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb+srv://johnsukadoe:qPz8am91@ledokol.iv6xhsg.mongodb.net/?retryWrites=true&w=majority&appName=ledokol', { useUnifiedTopology: true });
//
//
// const uri = "mongodb+srv://johnsukadoe:qPz8am91@ledokol.iv6xhsg.mongodb.net/?retryWrites=true&w=majority&appName=ledokol";
// const client = new MongoClient(uri);
//
// async function main() {
//     await client.connect();
//
//     // Выбор коллекции
//     const db = client.db("ledokol");
//     const collection = db.collection("users");
//
//     // Получение данных
//     const data = await collection.find().toArray();
//
//     // Вывод данных
//     console.log(data);
// }
//
// main().catch(console.error);

// const combinedSchema = new mongoose.Schema({
//     user_id: Number,
//     username: String,
//     email: String,
//     password: String,
//     user_info_id:Number,
// });
//
// const combinedSchemaPosts = new mongoose.Schema({
//     _id:Number,
//     user_id: Number,
//     title:String,
//     description:String,
//     timestamp:Number,
//     preview:Array
// });
//
// const combinedSchemaUsersInfo = new mongoose.Schema({
//     role:String,
//     content_type: String,
//     creation_frequency:String,
//     monthly_earnings:Number,
//     join_date:String,
//     membership_level:String,
//     monthly_contribution:Number,
//     user_id:Number,
//     _id:Number
// });
//
//
// const Combined = mongoose.model('users', combinedSchema);
// const CombinedPosts = mongoose.model('posts', combinedSchemaPosts);
// const UserInfo = mongoose.model('users_info', combinedSchemaUsersInfo);


//check
// app.get('/posts', async (req,res)=>{
//     try {
//         let query = {};
//
//         // if (req.query.user_id) {
//         //     query.user_id = req.query.user_id;
//         // }
//
//         const posts = await CombinedPosts.find(query);
//
//         res.status(200).json(posts);
//     } catch (error) {
//         console.error('Error getting user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })
app.get('/posts', getPosts)

app.post('/posts/:postId/like', async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.body.userId;
  
      const updatedPost = await CombinedPosts.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: { user_id: userId, timestamp: Date.now()/1000 } } },
        { new: true }
      );
      
  
      res.json(updatedPost);
    } catch (error) {
      console.error('Error adding like:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/posts/:postId/unlike', async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.body.userId;
  
      const updatedPost = await CombinedPosts.findByIdAndUpdate(
        postId,
        { $pull: { likes: { user_id: userId } } },
        { new: true }
      );
      
  
      res.json(updatedPost);
    } catch (error) {
      console.error('Error removing like:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  //check
// app.post('/posts', async (req, res) => {
//     try {
//         const newPost = new CombinedPosts(req.body);
//
//         const lastPost = await CombinedPosts.findOne({}, {}, { sort: { '_id': -1 } });
//
//         newPost._id = lastPost ? lastPost._id + 1 : 1;
//
//         const savedPost = await newPost.save();
//
//         const query = { _id: savedPost._id };
//         const updateData = { $set: req.body };
//
//         await CombinedPosts.updateOne(query, updateData);
//
//         res.status(201).json(savedPost);
//     } catch (error) {
//         console.error('Error creating post:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
app.post('/posts', createPost);

//check
// app.get('/users', async (req, res) => {
//     try {
//         let query = {};
//
//         if (req.query.username) {
//             query.username = req.query.username;
//         }
//
//         if (req.query.email) {
//             query.email = req.query.email;
//         }
//
//
//         if (req.query.user_id) {
//             query.user_id = req.query.user_id;
//         }
//
//         if (req.query.password) {
//             query.password = req.query.password;
//         }
//
//         const user = await Combined.find(query);
//         console.log(user)
//
//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error getting user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
app.get('/users', login);

//check
// app.post('/users', async (req, res) => {
//     try {
//         const lastUserInfo = await Combined.findOne({}, {}, { sort: { 'user_info_id': -1 } });
//
//         const lastUser = await Combined.findOne({}, {}, { sort: { 'user_id': -1 } });
//
//         const userInfoData = {
//             role: null,
//             content_type: null,
//             creation_frequency: null,
//             monthly_earnings: null,
//             join_date: null,
//             membership_level: null,
//             monthly_contribution: null,
//             user_id: lastUser ? lastUser.user_id + 1 : 1,
//         };
//         userInfoData.user_info_id = lastUserInfo ? lastUserInfo.user_info_id + 1 : 1;
//
//         const newUser = new Combined({ ...req.body, ...userInfoData });
//
//         const savedUser = await newUser.save();
//
//         const lastUserInfoId = userInfoData.user_info_id
//
//         const newUserInfoData = {
//             _id: lastUserInfoId,
//             ...userInfoData,
//         };
//
//         const newUserInfo = new UserInfo(newUserInfoData);
//
//         await newUserInfo.save();
//
//         res.status(201).json(savedUser);
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
app.post('/users', signup);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});