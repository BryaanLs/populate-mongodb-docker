import { MongoClient } from 'mongodb';

export const conn = async () => {
  const URI = 'mongodb://localhost:27017';
  const client = new MongoClient(URI);
  try {
    await client.connect();
    return client;
  } catch (e) {
    throw `Erro ao conectar ao banco de dados: ${e}`;
  }
};
