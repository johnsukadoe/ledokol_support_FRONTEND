import axios from "axios";
const server = 'http://localhost:3001/';

export const getSubscriptions = async user_id=> {
    const {data} = await axios.get(`${server}subscriptions`, {
        params:{
            user_id
        }
    });
    return data;
};

export const unsubscribeCreator = async params=> {
    const { user_id, creator_id } = params;
    const {data} = await axios.post(`${server}subscriptions/unsubscribe`, {
        params:{
            user_id,
            creator_id
        }
    });
    return data;
};
