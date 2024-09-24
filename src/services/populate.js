import Bottleneck from 'bottleneck';
import cliProgress from 'cli-progress';
import { generateComplexDocument, generateSimpleDocument } from './generate-documents.js';
import { insertDocuments } from './insert-documents.js';

const limiter = new Bottleneck({
  maxConcurrent: 8,
});
export const populateDB = async (options) => {
  let simpleCollectionsPromises,
    complexCollectionsPromises = [];

  const multiBar = new cliProgress.MultiBar({
    format: '{collectionName} | {bar} | {percentage}% | {duration_formatted} | {value}/{total}',
    barCompleteChar: '※',
    barIncompleteChar: '⁍',
  });

  const { simpleCollections, complexCollections } = options;

  if (simpleCollections) {
    simpleCollectionsPromises = simpleCollections.map((collectionName) => {
      return limiter.schedule(() =>
        insertDocuments(collectionName, generateSimpleDocument, options, multiBar),
      );
    });
  }

  if (complexCollections) {
    complexCollectionsPromises = complexCollections.map((collectionName) => {
      return limiter.schedule(() =>
        insertDocuments(collectionName, generateComplexDocument, options, multiBar),
      );
    });
  }

  await Promise.all([...simpleCollectionsPromises, ...complexCollectionsPromises]);
  multiBar.stop();
  console.log('Banco de dados populado com sucesso!');
};