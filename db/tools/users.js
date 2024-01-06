const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'patreon';

async function queryCreatorsData() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    const users = await usersCollection.find().toArray();
    console.log('Creators:', users);
  } finally {
    await client.close();
    console.log('Connection to the database closed');
  }
}

queryCreatorsData();
