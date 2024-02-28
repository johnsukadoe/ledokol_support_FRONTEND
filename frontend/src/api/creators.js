import axios from "axios";
const server = 'https://ems-app.kz/ledokol-api/';

const localServer= 'http://localhost:3001/'

export const getCreator = async user_id => {
    const {data} = await axios.get(`${server}creator`, {
        params: {
            user_id:user_id,
        },
    });
    return data;
};
export const getCreators = async () => {
    const {data} = await axios.get(`${server}creators`);
    return data;
};

export const updateCreator = async creator => {
    const data = await axios.put(`${server}creator`, {
        params: {
            creator
        },
    });
    return data;
};