const express = require('express');
const path = require('path'); // Модуль для работы с путями к файлам
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/patreon', { useUnifiedTopology: true });


const combinedSchema = new mongoose.Schema({
    user_id: Number,
    username: String,
    email: String,
    password: String,
    user_info_id:Number,
});

const combinedSchemaPosts = new mongoose.Schema({
    _id:Number,
    user_id: Number,
    title:String,
    description:String,
    timestamp:Number,
    preview:Array
});

const combinedSchemaUsersInfo = new mongoose.Schema({
    role:String,
    content_type: String,
    creation_frequency:String,
    monthly_earnings:Number,
    join_date:String,
    membership_level:String,
    monthly_contribution:Number,
    user_id:Number,
    _id:Number
});


const Combined = mongoose.model('users', combinedSchema);
const CombinedPosts = mongoose.model('posts', combinedSchemaPosts);
const UserInfo = mongoose.model('users_info', combinedSchemaUsersInfo);

app.get('/posts', async (req,res)=>{
    try {
        let query = {};

        // Если есть параметры в запросе, формируем объект query для фильтрации
        // if (req.query.user_id) {
        //     query.user_id = req.query.user_id;
        // }

        // Используйте findOne вместо find, чтобы вернуть только одного пользователя
        const posts = await CombinedPosts.find(query);

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Маршрут для добавления лайка
app.post('/posts/:postId/like', async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.body.userId;  // предполагается, что идентификатор пользователя передается в теле запроса
  
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
  
  // Маршрут для удаления лайка
  app.post('/posts/:postId/unlike', async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.body.userId;  // предполагается, что идентификатор пользователя передается в теле запроса
  
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
  

app.post('/posts', async (req, res) => {
    try {
        const newPost = new CombinedPosts(req.body);

        const lastPost = await CombinedPosts.findOne({}, {}, { sort: { '_id': -1 } });

        newPost._id = lastPost ? lastPost._id + 1 : 1;

        const savedPost = await newPost.save();

        // Обновление данных в MongoDB
        const query = { _id: savedPost._id };  // Задайте соответствующий критерий поиска
        const updateData = { $set: req.body };  // Используйте новые данные из POST-запроса

        await CombinedPosts.updateOne(query, updateData);

        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users', async (req, res) => {
    try {
        let query = {};

        // Если есть параметры в запросе, формируем объект query для фильтрации
        if (req.query.username) {
            query.username = req.query.username;
        }

        if (req.query.email) {
            query.email = req.query.email;
        }

        // Добавьте другие параметры, если необходимо

        // Предположим, у вас есть уникальный идентификатор пользователя user_id
        if (req.query.user_id) {
            query.user_id = req.query.user_id;
        }

        if (req.query.password) {
            query.password = req.query.password;
        }

        // Используйте findOne вместо find, чтобы вернуть только одного пользователя
        const user = await Combined.find(query);
        console.log(user)

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/users', async (req, res) => {
    try {
        // Получение последнего значения user_info_id
        const lastUserInfo = await Combined.findOne({}, {}, { sort: { 'user_info_id': -1 } });

        // Получение последнего значения user_id
        const lastUser = await Combined.findOne({}, {}, { sort: { 'user_id': -1 } });

        const userInfoData = {
            role: null,
            content_type: null,
            creation_frequency: null,
            monthly_earnings: null,
            join_date: null,
            membership_level: null,
            monthly_contribution: null,
            user_id: lastUser ? lastUser.user_id + 1 : 1,
        };
        // Установка нового значения user_info_id для нового пользователя
        userInfoData.user_info_id = lastUserInfo ? lastUserInfo.user_info_id + 1 : 1;

        // Создание нового пользователя с обновленными полями user_info_id и user_id
        const newUser = new Combined({ ...req.body, ...userInfoData });

        // Сохранение нового пользователя
        const savedUser = await newUser.save();

        const lastUserInfoId = userInfoData.user_info_id

        const newUserInfoData = {
            _id: lastUserInfoId,
            ...userInfoData,
        };

        // Создание объекта в коллекции user_info
        const newUserInfo = new UserInfo(newUserInfoData);

        // Сохранение нового объекта в коллекции user_info
        await newUserInfo.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});