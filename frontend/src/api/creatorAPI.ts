import axios from "axios";

const server = "https://ems-app.kz/ledokol-api/";

const localServer = "http://localhost:3001/";

export const getCreator = async (user_id: number) => {
  const { data } = await axios.get(`${localServer}creator`, {
    params: {
      user_id: user_id,
    },
  });
  return data;
};
export const getCreators = async () => {
  const { data } = await axios.get(`${localServer}creators`);
  return data;
};

export const updateCreator = async (creator: object) => {
  const data = await axios.put(`${localServer}creator`, {
    params: {
      creator,
    },
  });
  return data;
};
