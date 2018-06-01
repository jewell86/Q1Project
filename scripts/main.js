// let takePhotos = require(./takePhotos )
// const takePrequire('./takePhotos')

(function() {
  var width = 320;
  var height = 0;
  var streaming = false;
  var video = null;
  var canvas = null;
  var photo1 = document.querySelector("#photo1");
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

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

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
          height = width / (4/3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas1.getContext('2d');
    if (width && height) {
      canvas1.width = width;
      canvas1.height = height;
      context.drawImage(video, 0, 0, width, height);
      var data = canvas1.toDataURL('image/png');
      photo1.setAttribute('src', data);
      canvas1.classList.add('d-none')
      setTimeout(takepicture2, 1000);
    } else {
      clearphoto();
    }
  }

  function takepicture2() {
    var context = canvas2.getContext('2d');
    if (width && height) {
      canvas2.width = width;
      canvas2.height = height;
      context.drawImage(video, 0, 0, width, height);
      var data2 = canvas2.toDataURL('image2/png');
      photo2.setAttribute('src', data2);
      canvas2.classList.add('d-none')
      setTimeout(takepicture3, 1000);
    } else {
      clearphoto();
    }
  }

  function takepicture3() {
    var context = canvas3.getContext('2d');
    if (width && height) {
      canvas3.width = width;
      canvas3.height = height;
      context.drawImage(video, 0, 0, width, height);
      var data3 = canvas3.toDataURL('image3/png');
      photo3.setAttribute('src', data3);
      canvas3.classList.add('d-none')
      setTimeout(takepicture4, 1000);
    } else {
      clearphoto();
    }
  }

  function takepicture4() {
    var context = canvas4.getContext('2d');
    if (width && height) {
      canvas4.width = width;
      canvas4.height = height;
      context.drawImage(video, 0, 0, width, height);
      var data4 = canvas4.toDataURL('image4/png');
      photo4.setAttribute('src', data4);
      canvas4.classList.add('d-none')
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();

module.exports = main
