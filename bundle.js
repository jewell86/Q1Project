(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

(function() {
  let width = 420
  let height = 400
  let streaming = false
  let video = null
  let startButton = null
  let paragraph = document.querySelector('.photo-title')
  let titleSubmit = document.querySelector('.title-submit')
  let titleValue = document.querySelector('.title-value')
  let printButton = document.querySelector('.print-button')
  let filters = Array.from(document.querySelectorAll('.filter-button'))
  let photos = Array.from(document.querySelectorAll('.photos'))
  let newFilter =

  filters.forEach(function(filter) {
    filter.addEventListener('click', function(ev){
      newFilter = filter.dataset.filter
      photos.forEach(function(photo) {
      photo.removeAttribute("class")
      photo.classList.add(newFilter)
      })
    })
  })

  function startup() {
    video = document.getElementById('video')
    startButton = document.getElementById('startbutton');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia)
    navigator.getMedia(
      {
        video: true,
        audio: false,
        width: 420,
        height: 555,
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream
        } else {
          var vendorURL = window.URL || window.webkitURL
          video.src = vendorURL.createObjectURL(stream)
        }
        video.play()
      },
      function(err) {
        console.log("An error occured! " + err)
      }
    )

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width)
        if (isNaN(height)) {
          height = width / (4/3)
        }
        video.setAttribute('width', width)
        video.setAttribute('height', height)
        streaming = true
      }
    }, false)

    titleSubmit.addEventListener('submit', function(event) {
      paragraph.innerText = titleValue.value
      event.preventDefault()
    })

    // let hiddenEmail = document.querySelector('.hidden-email')
    // let emailButton = document.querySelector('.email-button')
    // let hiddenSubmit = document.querySelector('.hidden-submit')
    //
    //   emailButton.addEventListener("click", function(){
    //   hiddenEmail.classList.remove('d-none')
    //   hiddenSubmit.classList.remove('d-none')
    //
    // })
    //
    let filter = JSON.stringify(newFilter);

    printButton.addEventListener('click', function(event) {
      window.localStorage.setItem('filter', newFilter);
    })

    let photoData = [{ canvas : document.querySelector("#canvas1"), photo : document.querySelector("#photo1") },
      { canvas : document.querySelector("#canvas2"), photo : document.querySelector("#photo2") },
      { canvas : document.querySelector("#canvas3"), photo : document.querySelector("#photo3") },
      { canvas : document.querySelector("#canvas4"), photo : document.querySelector("#photo4") }]
    let index = 0
    let currentPhoto = photoData[index]

    startButton.addEventListener('click', function(ev){
        window.setTimeout(function() { takePicture(currentPhoto) }, 1000)
        ev.preventDefault();
    }, false);

    function takePicture(currentPhoto) {
      currentPhoto.photo.classList.remove("d-none")
      let context = currentPhoto.canvas.getContext('2d')
      context.drawImage(video,50,50,700,650,0,0,400,220)
      let data = currentPhoto.canvas.toDataURL(`image${index+1}/png`)
      currentPhoto.photo.setAttribute('src', data)
      localStorage.setItem(`image${index+1}`, data.replace(/^data:image\/(png|jpg);base64,/, ""))
      currentPhoto = photoData[index]
      currentPhoto.canvas.classList.add('d-none')
      if( index < 4){
        index++
        window.setTimeout(function () { takePicture(currentPhoto) }, 1000)
      }
    }
}
  window.addEventListener('load', startup, false)

})()








// module.exports = main

},{}]},{},[1]);
