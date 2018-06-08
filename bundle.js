(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  window.addEventListener('load', startup, false)
  let titleSubmit = document.querySelector('.title-submit')
  let printButton = document.querySelector('.print-button')
  let filters = Array.from(document.querySelectorAll('.filter-button'))
  let newFilter
  let newTitleValue
  let startButton = document.querySelector('#startbutton')
  let saveButton = document.querySelector('.save-button')
  let restartButton = document.querySelector('.restart-button')
  let camera = document.querySelector('.camera')


  function startup() {
    localStorage.clear()
    if(!!window.performance && window.performance.navigation.type == 2) {
      window.location.reload();
    }
    let width = 420
    let height = 400
    let streaming = false
    let video = document.getElementById('video')
    startButton = document.getElementById('startbutton');
    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia)
    navigator.getMedia(
      {
        video: true,
        audio: false,

      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream
        } else {
          let vendorURL = window.URL || window.webkitURL
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

    const changeFilter = (event) => {
      console.log('in change filter')
      let photos = Array.from(document.querySelectorAll('.photos'))
      newFilter = event.target.dataset.filter
      photos.forEach(function(photo) {
        photo.classList.remove("sepia")
        photo.classList.remove("grayscale")
        photo.classList.remove("none")
        photo.classList.add(newFilter)
      })
    }

    filters.forEach(element => element.addEventListener('click', changeFilter))

    titleSubmit.addEventListener('submit', function(event) {
      let paragraph = document.querySelector('.photo-title')
      let titleValue = document.querySelector('.title-value')
      event.preventDefault()
      newTitleValue = titleValue.value
      paragraph.innerText = titleValue.value
    })
    let reload = false

    startButton.addEventListener('click',  function(ev){
      if(reload === true){
         index = 0
         window.setTimeout(function() { takePicture(currentPhoto) }, 1000)
         ev.preventDefault();
         currentPhoto.canvas.classList.add('d-none')
         index++
      }else{
        window.setTimeout(function() { takePicture(currentPhoto) }, 1000)
        ev.preventDefault();
        currentPhoto.canvas.classList.add('d-none')
        index++
        reload = true
      }
    }, true);

    printButton.addEventListener('click', function(event) {
      window.localStorage.setItem('filter', newFilter)
      window.localStorage.setItem('newTitleValue', newTitleValue)
    })

    saveButton.addEventListener('click', function(event) {
      window.localStorage.setItem('filter', newFilter)
      window.localStorage.setItem('newTitleValue', newTitleValue)
    })

    restartButton.addEventListener('click', function(){
      location.reload()
    })
    }

    let photoData = [{ canvas : document.querySelector("#canvas1"), photo : document.querySelector("#photo1") },
      { canvas : document.querySelector("#canvas2"), photo : document.querySelector("#photo2") },
      { canvas : document.querySelector("#canvas3"), photo : document.querySelector("#photo3") },
      { canvas : document.querySelector("#canvas4"), photo : document.querySelector("#photo4") }]
    let index = 0
    let currentPhoto = photoData[index]

    function takePicture(currentPhoto) {
      if( index <= 4){
        flashToggle()
        videoToggle()
        currentPhoto.photo.classList.remove("d-none")
        let context = currentPhoto.canvas.getContext('2d')
        context.drawImage(video,50,50,700,650,0,0,400,220)
        let data = currentPhoto.canvas.toDataURL(`image${index}/png`)
        currentPhoto.photo.setAttribute('src', data)
        localStorage.setItem(`image${index}`, data.replace(/^data:image\/(png|jpg);base64,/, ""))
        currentPhoto = photoData[index]
        currentPhoto.canvas.classList.add('d-none')
        index++
        window.setTimeout(function () { takePicture(currentPhoto) }, 1000)
      }
        console.log('end of function');
    }

    function handleChange(input){
      if (newTitleValue === null) {alert("Value should be between 0 - 100")
      }
    }

    function flashToggle() {
      camera.classList.toggle('flash');
    }

    function videoToggle(){
      video.classList.toggle('flash')
    }

},{}]},{},[1]);
