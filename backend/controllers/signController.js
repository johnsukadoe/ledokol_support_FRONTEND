const {User} = require("../models/mongo");

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

    const newUser = new User({ ...req.body, user_id: newUserId, role:'watcher', join_date: currentTimeInSeconds });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
}


module.exports = {
    login,
    signup
}