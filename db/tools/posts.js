const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'patreon';

async function queryCreatorsData() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db(dbName);
    const postsCollection = db.collection('posts');

    const posts = await postsCollection.find().toArray();
    console.log('Creators:', posts);
  } finally {
    await client.close();
    console.log('Connection to the database closed');
  }
}

queryCreatorsData();
