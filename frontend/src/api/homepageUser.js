import axios from "axios";
const server = 'https://ems-app.kz/ledokol-api/';

const localServer = 'http://localhost:3001/';

export const getUser = async user_id=> {
    const {data} = await axios.get(`${server}users`, {
        params: {
            user_id:user_id,
            limit:1,
        },
    });
    return data[0];
};

export const getUsers = async ()  => {
    const {data} = await axios.get(`${server}users`);
    return data;
};