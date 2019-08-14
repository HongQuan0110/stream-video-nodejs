function openStream() {
    const config  = { audio: true, video: true };
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

const peer = new Peer();

peer.on('open', id => {
    $("#my-peer").append(id);
})

$(document).ready(function(){
    var btnOpenStream = document.getElementById('btnOpenStream');
    btnOpenStream.addEventListener('click', () => {
        openStream().then(stream => {
            playStream("localStream", stream)
            peer.on('call', call => {
                call.answer(stream);
            })
        })
    })
})
