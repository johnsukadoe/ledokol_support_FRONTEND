const mongoose = require('mongoose');
const uri = "mongodb+srv://johnsukadoe:qPz8am91@ledokol.iv6xhsg.mongodb.net/ledokol?retryWrites=true&w=majority&appName=ledokol";

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');

    mongoose.connection.db.admin().command({ ping: 1 }, (err, result) => {
        if (err) {
            console.error('Error pinging MongoDB:', err);
        } else {
            console.log('MongoDB ping successful:', result);
        }
    });
});

const User = mongoose.model('User', {
    user_id: Number,
    username: String,
    email: String,
    password: String,
    user_info_id:Number,
}, 'users');
const Post = mongoose.model('Post', {
    _id:Number,
    user_id: Number,
    title:String,
    description:String,
    timestamp:Number,
    preview:Array
}, 'posts');
const UserInfo = mongoose.model('UserInfo', {
    role:String,
    content_type: String,
    creation_frequency:String,
    monthly_earnings:Number,
    join_date:String,
    membership_level:String,
    monthly_contribution:Number,
    user_id:Number,
    _id:Number
}, 'users_infos');

module.exports = {
    User,
    Post,
    UserInfo
};