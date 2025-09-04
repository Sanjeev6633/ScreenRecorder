(function() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const videoPreview = document.getElementById('videoPreview');
    let mediaRecorder;
    let recordedChunks = [];

    startBtn.onclick = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            });
            videoPreview.srcObject = stream;
            videoPreview.play();

            mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs=vp9'
            });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) recordedChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, {
                    type: 'video/webm'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'screen-recording.webm';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
                recordedChunks = [];
            };

            mediaRecorder.start();
            startBtn.disabled = true;
            stopBtn.disabled = false;
        } catch (err) {
            alert('Error: ' + err);
        }
    };

    stopBtn.onclick = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    };
})();