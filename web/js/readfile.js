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
    body.cssText= "background-image:"+ window.URL.createObjectURL(files[0])+";"+
                 "background-color: #464646;"

    //console.log(window.innerWidth,window.innerHeight);
    body.background = window.URL.createObjectURL(files[0]);
    body.onload = function(e) {
        window.URL.revokeObjectURL(this.src);
        }
}

window.check=function(){
    if(file.files){
        //读取图片数据
        var f = file.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            //加载图片获取图片真实宽度和高度
            var image = new Image();
            image.onload=function(){
                var width = image.width;
                var height = image.height;
                console.log(width+'======'+height+"====="+f.size);
            };
            image.src= data;
        };
        reader.readAsDataURL(f);
    }else{
        var image = new Image();
        image.onload =function(){
            var width = image.width;
            var height = image.height;
            var fileSize = image.fileSize;
            alert(width+'======'+height+"====="+fileSize);
        }
        image.src = file.value;
    }
}