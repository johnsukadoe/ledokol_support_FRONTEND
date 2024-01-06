const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

mongoose.connect('mongodb://localhost:27017/patreon', { useNewUrlParser: true, useUnifiedTopology: true });

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
});

const Combined = mongoose.model('users', combinedSchema);

app.get('/users', async (req, res) => {
    const combinedData = await Combined.find();
    res.json(combinedData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
