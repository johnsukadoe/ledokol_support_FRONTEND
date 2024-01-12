import axios from "axios";
const server = 'http://localhost:3001/users';

export const getUser = async user_id=> {
    const {data} = await axios.get(server, {
        params: {
            user_id:user_id
        },
    });
    return data;
};