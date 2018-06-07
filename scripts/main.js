  window.addEventListener('load', startup, false)
  let titleSubmit = document.querySelector('.title-submit')
  let printButton = document.querySelector('.print-button')
  let filters = Array.from(document.querySelectorAll('.filter-button'))
  let newFilter
  let newTitleValue
  let startButton = document.querySelector('#startbutton')
  let saveButton = document.querySelector('.save-button')


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

    const changeFilter = (event) => {
      let photos = Array.from(document.querySelectorAll('.photos'))
      newFilter = event.target.dataset.filter
      photos.forEach(function(photo) {
        photo.removeAttribute("class")
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

    startButton.addEventListener('click',  function(ev){
        window.setTimeout(function() { takePicture(currentPhoto) }, 1000)
        ev.preventDefault();
    }, false);

    printButton.addEventListener('click', function(event) {
      window.localStorage.setItem('filter', newFilter)
      window.localStorage.setItem('newTitleValue', newTitleValue)
    })

    saveButton.addEventListener('click', function(event) {
      window.localStorage.setItem('filter', newFilter)
      window.localStorage.setItem('newTitleValue', newTitleValue)
    })
    }



    let photoData = [{ canvas : document.querySelector("#canvas1"), photo : document.querySelector("#photo1") },
      { canvas : document.querySelector("#canvas2"), photo : document.querySelector("#photo2") },
      { canvas : document.querySelector("#canvas3"), photo : document.querySelector("#photo3") },
      { canvas : document.querySelector("#canvas4"), photo : document.querySelector("#photo4") }]
    let index = 0
    let currentPhoto = photoData[index]

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
