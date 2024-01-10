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

// Путь к файлу users.json в папке db/data
const usersFilePath = path.join(__dirname, '..', 'db', 'data', 'users.json');

// Обработчик POST-запроса для создания нового пользователя и перезаписи users.json
app.post('/users', async (req, res) => {
    try {
        const newUser = new Combined(req.body);
        const savedUser = await newUser.save();

        // Получаем текущее содержимое файла users.json (если он существует)
        let currentData = [];
        try {
            const fileContent = await fs.readFile(usersFilePath, 'utf-8');
            currentData = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading users.json:', error);
        }

        // Добавляем нового пользователя и перезаписываем файл
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
