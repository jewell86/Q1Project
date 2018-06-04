
(function() {
  let width = 320;
  let height = 0;
  let streaming = false;
  let video = null;
  let canvas1 = document.querySelector('#canvas1')
  let canvas2 = document.querySelector('#canvas2')
  let canvas3 = document.querySelector('#canvas3')
  let canvas4 = document.querySelector('#canvas4')
  let photo1 = document.querySelector("#photo1");
  let photo2 = document.querySelector("#photo2");
  let photo3 = document.querySelector("#photo3");
  let photo4 = document.querySelector("#photo4");
  let image1 = null
  let image2 = null
  let image3 = null
  let image4 = null
  let data1 = null
  let data2 = null
  let data3 = null
  let data4 = null
  let photo1string = null
  let photo2string = null
  let photo3string = null
  let photo4string = null

  var startButton = null;


  function startup() {
    video = document.getElementById('video');
    // canvas = document.getElementById('canvas');
    // photo = document.getElementById('photo');
    startButton = document.getElementById('startbutton');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        if (isNaN(height)) {
          height = width / (4/3);
        }
//canvas?
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        // canvas.setAttribute('width', width);
        // canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    let index = 0



    let params = [[ canvas1, data1, 'image1', photo1, 'str1', photo1string ],
    [ canvas2, data2, 'image2', photo2, 'str2', photo2string ],
    [ canvas3, data3, 'image3', photo3, 'str3', photo3string ],
    [ canvas4, data4, 'image4', photo4, 'str4', photo4string ]]

let parameter = params[index]



  startButton.addEventListener('click', function(ev){
      window.setTimeout(function() { takepicture(...parameter) }, 1000)
      ev.preventDefault();
  }, false);


  function takepicture( can, dat, img, pho, strName, str) {
    console.log("takepic");
    let context = can.getContext('2d');

    if (width && height) {
    can.width = width;
    can.height = height;
    context.drawImage(video, 0, 0, width, height);
    dat = can.toDataURL(`${img}/png`);
    pho.setAttribute('src', dat);
    can.classList.add('d-none')
    str = dat.replace(/^data:image\/(png|jpg);base64,/, "")
    localStorage.setItem(strName, str)
    parameter = params[index]

    if( index < 4){
    index++
    console.log(parameter)
    window.setTimeout(function () { takepicture(...parameter) }, 1000)
  }
  }
}


}

  window.addEventListener('load', startup, false);



let hiddenEmail = document.querySelector('.hidden-email')
let emailButton = document.querySelector('.email-button')
let hiddenSubmit = document.querySelector('.hidden-submit')


emailButton.addEventListener("click", function(){
  hiddenEmail.classList.remove('d-none')
  hiddenSubmit.classList.remove('d-none')

})})()















module.exports = main
