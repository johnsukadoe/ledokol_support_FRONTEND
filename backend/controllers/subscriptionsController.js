const {User, Creator} = require("../models/mongo");

const getSubscriptions = async (req, res) => {
    let user = {};
    let users_ids = [];
    let subscriptions = [];
    console.log(req.query)
    user = await User.findOne({ user_id: req.query.user_id })
    users_ids = [...user.subscriptions]

    subscriptions = await Creator.find({ user_id: { $in: users_ids } }).limit(req.query.limit);
    if(subscriptions){
        res.status(200).json(subscriptions);
    }else{
        res.status(404).json({ error: 'Users not found' });
    }
}

const unsubcribeCreator = async (req, res) => {
    const { user_id, creator_id } = req.body.params;
    console.log(user_id)
    console.log(creator_id)
    try {
        const user = await User.findOneAndUpdate(
            { user_id },
            { $pull: { subscriptions: creator_id } },
            { new: true }
        );

        console.log(user)

        res.status(200).json({ message: 'Successfully unsubscribed.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to unsubscribe.' });
    }
}


module.exports = {
    getSubscriptions,
    unsubcribeCreator
}