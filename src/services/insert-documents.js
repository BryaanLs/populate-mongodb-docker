export const insertDocuments = async (collectionName, documentGenerator, options, multiBar) => {
  const collectionSize = options.collectionSize ?? 1e6;
  const batchSize = options.batchSize ?? 1000;
  const progressBar = multiBar.create(collectionSize, 0, { collectionName });
  const { db } = options;

  for (let i = 0; i < collectionSize; i += batchSize) {
    const batch = Array.from(
      { length: Math.min(batchSize, collectionSize - i) },
      documentGenerator,
    );
    await db.collection(collectionName).insertMany(batch);
    progressBar.update(i + batch.length);
  }

  progressBar.stop();
};
