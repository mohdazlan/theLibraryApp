const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the server');

        const db = client.db(dbName);

        const col = await db.collection('books');
        const books = await col.find().toArray();
        res.render('bookListView', {
          nav,
          title: 'Library',
          books,
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    })();
  });

  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the server');

        const db = client.db(dbName);

        const col = await db.collection('books');
        const book = await col.findOne({ _id: new ObjectId(id) });
        debug(book);
        res.render('bookView', {
          nav,
          title: 'Library',
          book: book,
        });
      } catch (err) {
        debug(err.stack);
      }
    })();
  });
  return bookRouter;
}
module.exports = router;
