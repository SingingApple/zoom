const socket = io("/");
let myVideoStream;
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    console.log(stream);
    addVideoStream(myVideo, stream);
  });

const connectToNewUser = () => {
  console.log("New user");
};

socket.emit("join-room", ROOM_ID);
socket.on("user-connected", () => {
  connectToNewUser();
});
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
