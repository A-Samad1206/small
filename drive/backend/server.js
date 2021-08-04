const mongoose = require('mongoose');
const Document = require('./Document');

mongoose.connect('mongodb://localhost/google-docs-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const defaultValue = `defaultValue ${Math.random()}`;
const io = require('socket.io')(3002, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('get-document', async (docId) => {
    const { data } = await findOrCreateDoc(docId);

    socket.join(docId);

    socket.emit('load-document', data);
    socket.on('send-changes', (delta) => {
      socket.broadcast.to(docId).emit('receive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      await Document.findByIdAndUpdate(docId, { data });
    });
  });
});

async function findOrCreateDoc(id) {
  if (id === null) return;
  const doc = await Document.findById(id);
  if (doc) return doc;
  return await Document.create({ _id: id, data: defaultValue });
}
