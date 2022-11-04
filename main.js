let recordBtn = document.querySelector("#recordBtn")
let recordBtn2 = document.querySelector("#recordBtn2")

recordBtn.addEventListener('click', recordStream)
recordBtn2.addEventListener('click', ()=>{
    chrome.tabs.update({
        url: "http://127.0.0.1:5500/main.html"
   });
})

function recordStream(){
    navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: {
            mediaSource: 'screen'
        }
    }).then((stream)=>{
        recordVideo(stream)
    })
}

function recordVideo(stream) {
    let recordedChunks = []

    let mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = (e)=>{
        if(e.data.size > 0){
            recordedChunks.push(e.data)
        }
    }

    mediaRecorder.onstop = (e)=>{
        recordStream = []
        saveFile(recordedChunks)
    }

    mediaRecorder.start(200)
}


function saveFile(chunks){
    let blob = new Blob(chunks, {
        type:"video/webm"
    })

    let filename = prompt("Enter your filename");

    let downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    document.body.appendChild(downloadLink);
    downloadLink.download = `${filename}.webm`;
    downloadLink.click()

    URL.revokeObjectURL(blob)
    document.removeChild(downloadLink);
}

