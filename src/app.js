import { conn } from "./db/conn.js";
import { populateDB } from "./services/populate.js";

const simpleCollections = [
  "simpleCollection1",
  "simpleCollection2",
  "simpleCollection3",
  "simpleCollection4",
];
const complexCollections = ["complexCollection1", "complexCollection2"];

const main = async () => {
  const client = await conn();
  const db = client.db(process.env.DB_NAME ?? "myDatabase");

  const options = {
    simpleCollections: simpleCollections,
    complexCollections: complexCollections,
    collectionSize: 1e5,
    batchSize: 2500,
    db,
    concurrence: 2,
  };

  await populateDB(options);
  client.close();
};

await main();
