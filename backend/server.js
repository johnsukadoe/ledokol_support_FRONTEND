const express = require('express');
const fs = require('fs').promises;
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
    role: String,
    content_type: String,
    creation_frequency: String,
    monthly_earnings: Number,
    join_date: Date,
    membership_level: String,
    monthly_contribution: Number,
    password: String, // Добавлено поле password
});

const Combined = mongoose.model('users', combinedSchema);

const usersFilePath = path.join(__dirname, '..', 'db', 'data', 'users.json');

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

        // Используйте findOne вместо find, чтобы вернуть только одного пользователя
        const user = await Combined.findOne(query);

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/users', async (req, res) => {
    try {
        const newUser = new Combined(req.body);

        const lastUser = await Combined.findOne({}, {}, { sort: { 'user_id': -1 } });

        newUser.user_id = lastUser ? lastUser.user_id + 1 : 1;

        const savedUser = await newUser.save();

        // Обновление данных в MongoDB
        const query = { user_id: savedUser.user_id };  // Задайте соответствующий критерий поиска
        const updateData = { $set: req.body };  // Используйте новые данные из POST-запроса

        await Combined.updateOne(query, updateData);

        let currentData = [];
        try {
            const fileContent = await fs.readFile(usersFilePath, 'utf-8');
            currentData = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading users.json:', error);
        }

        currentData.push(savedUser);
        await fs.writeFile(usersFilePath, JSON.stringify(currentData, null, 2), 'utf-8');

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
