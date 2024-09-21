import { conn } from './db/conn.js';
import { populateDB } from './services/populate.js';

const simpleCollections = [
  'simpleCollection1',
  'simpleCollection2',
  'simpleCollection3',
  'simpleCollection4',
];
const complexCollections = ['complexCollection1', 'complexCollection2'];

const main = async () => {
  const client = await conn();
  const db = client.db('myDB');

  const options = {
    simpleCollections: simpleCollections,
    complexCollections: complexCollections,
    collectionSize: 1e6,
    batchSize: 5000,
    db,
  };

  await populateDB(options);
  client.close();
};

await main();
