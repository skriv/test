let cropper;

document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById('image');
        img.src = e.target.result;
        img.style.display = 'block';

        if (cropper) {
            cropper.destroy();
        }

        cropper = new Cropper(img, {
            aspectRatio: 1, 
            viewMode: 2,
            autoCropArea: 1, 
            ready: function () {
                cropper.setCropBoxData({width: 600, height: 600}); 
            },
            crop: () => {
                
                const canvasData = cropper.getCroppedCanvas({
                    width: 600,
                    height: 600  
                });
                updateCanvas(canvasData);
            }
        });

        document.getElementById('download').style.display = 'inline';
    };
    reader.readAsDataURL(file);
});

document.getElementById('radiusSlider').addEventListener('input', function() {
    document.getElementById('radiusValue').textContent = this.value;
    if (cropper) {
        const canvasData = cropper.getCroppedCanvas({
            width: 600,
            height: 600
        });
        updateCanvas(canvasData);
    }
});

function updateCanvas(croppedCanvas) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const cornerRadius = parseInt(document.getElementById('radiusSlider').value);
        canvas.width = 600;
        canvas.height = 600;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(cornerRadius, 0);
        ctx.lineTo(canvas.width - cornerRadius, 0);
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, cornerRadius);
        ctx.lineTo(canvas.width, canvas.height - cornerRadius);
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - cornerRadius, canvas.height);
        ctx.lineTo(cornerRadius, canvas.height);
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - cornerRadius);
        ctx.lineTo(0, cornerRadius);
        ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, 0, 0);

        canvas.style.display = 'block';
    };
    img.src = croppedCanvas.toDataURL('image/png');
}

document.getElementById('download').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = image;
    link.click();
});
