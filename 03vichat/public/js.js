const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001',
});
const myVideo = document.createElement('video');
myVideo.muted = true;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    socket.on('user-connected', (userId) => {
      connectedToNewUser(userId, stream);
    });
  });
myPeer.on('open', (id) => {
  socket.emit('join-room', ROOM_ID, id);
});

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
    videoGrid.append(video);
  });
}
function connectedToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  call.on('stream', (userVideoStream) => {
    addVideoStream(userVideoStream);
  });
}
