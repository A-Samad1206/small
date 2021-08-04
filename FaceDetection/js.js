const video = document.getElementById('video');

const startideo = () => {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.log('Err', err)
  );
};
startideo();
