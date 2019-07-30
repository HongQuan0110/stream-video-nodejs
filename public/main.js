function openStream() {
    const config  = { video: true };
    if (navigator.mediaDevices.getDisplayMedia) {
        return navigator.mediaDevices.getDisplayMedia(config);
    } else {
        return navigator.getDisplayMedia(config);
    }
}

function playStream(idVIideo, stream){
    const video = document.getElementById(idVIideo);
    video.srcObject = stream;
    video.play();
}

openStream().then(stream => {
    console.log(stream);
    playStream("localStream", stream)
})