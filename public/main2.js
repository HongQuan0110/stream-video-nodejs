
const peer = new Peer();

function openStream() {
    const config  = { audio: true, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideo, stream){
    const video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.play();
}

peer.on('open', id => {
    console.log(id);
    
    // $("#my-peer").append(id);
})

const createEmptyAudioTrack = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, { enabled: false });
  };
  
const createEmptyVideoTrack = ({ width, height }) => {
    const canvas = Object.assign(document.createElement('canvas'), { width, height });
    canvas.getContext('2d').fillRect(0, 0, width, height);
  
    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];
  
    return Object.assign(track, { enabled: false });
  };

$(document).ready(function(){
    const audioTrack = createEmptyAudioTrack();
    const videoTrack = createEmptyVideoTrack({ width:640, height:480 });
    const mediaStream = new MediaStream([audioTrack, videoTrack]);
    var btnWatch = document.getElementById('btnWatchStream');
    btnWatch.addEventListener('click', () => {
        var peerId = $("#watchStream").val();
        var call = peer.call(peerId, mediaStream);
        call.on('stream', remoteStream => {
            console.log(remoteStream)
            playStream('remoteStream', remoteStream)
        })
    })
})