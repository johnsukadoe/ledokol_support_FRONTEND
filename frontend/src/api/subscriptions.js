import axios from "axios";
const server = "https://ems-app.kz/ledokol-api/";

const localServer = "http://localhost:3001/";

export const getSubscriptions = async (user_id) => {
  const { data } = await axios.get(`${localServer}subscriptions`, {
    params: {
      user_id,
    },
  });
  return data;
};

export const unsubscribeCreator = async (params) => {
  const { user_id, creator_id } = params;
  const { data } = await axios.post(`${localServer}subscriptions/unsubscribe`, {
    params: {
      user_id,
      creator_id,
    },
  });
  return data;
};

export const subscribeCreator = async (params) => {
  const { user_id, creator_id } = params;
  const { data } = await axios.post(`${localServer}subscriptions/subscribe`, {
    params: {
      user_id,
      creator_id,
    },
  });
  return data;
};
