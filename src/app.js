import { conn } from "./db/conn.js";
import { populateDB } from "./services/populate.js";

const simpleCollections = ["pessoas", "funcionarios", "usuarios", "cadastros"];
const complexCollections = ["complexCollection1", "complexCollection2"];

const main = async () => {
  const client = await conn();
  const db = client.db(process.env.DB_NAME ?? "myDatabase");

  const options = {
    simpleCollections: simpleCollections,
    complexCollections: complexCollections,
    collectionSize: 1e5,
    batchSize: 1100,
    db,
    concurrence: 4,
  };

  await populateDB(options);
  client.close();
};

await main();
