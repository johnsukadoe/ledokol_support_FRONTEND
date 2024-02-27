const {User, Creator} = require("../models/mongo");

const login = async (req, res) => {
    let query = {};

    if (req.query.username) {
        query.username = req.query.username;
    }
    if (req.query.email) {
        query.email = req.query.email;
    }
    if (req.query.user_id) {
        query.user_id = req.query.user_id;
    }
    if (req.query.password) {
        query.password = req.query.password;
    }

    const user = await User.findOne(query);
    console.log(user)
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({ error: 'User not found' });
    }
}

const signup = async (req, res) => {
    const lastUser = await User.findOne({}, {}, { sort: { 'user_id': -1 } });

    const newUserId = lastUser ? lastUser.user_id + 1 : 1;

    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

    // Создание нового документа User
    const newUser = new User({ ...req.body, user_id: newUserId, role:'creator', join_date: currentTimeInSeconds });

    // Сохранение нового документа User
    const savedUser = await newUser.save();

    // Создание объекта Creator с тем же user_id
    const newCreator = new Creator({
        _id:newUserId,
        user_id: newUserId,
        subscribers: 0,
        channel_description: `${req.body.username}'s channel.`,
        total_posts: 0,
        username: req.body.username
    });

    // Сохранение нового документа Creator
    await newCreator.save();

    res.status(201).json(savedUser);
}



module.exports = {
    login,
    signup
}