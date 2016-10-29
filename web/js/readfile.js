window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById("fileSelect"),
    file = document.getElementById("file"),
    body = document.getElementById("body");

fileSelect.addEventListener("click", function (e) {
    if (file) {
        file.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

function handleFiles(files) {
    body.background = window.URL.createObjectURL(files[0]);
    body.onload = function(e) {
        window.URL.revokeObjectURL(this.src);
        }
}