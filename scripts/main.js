
(function() {
  let width = 420
  let height = 400
  let streaming = false
  let video = null
  let startButton = null
  let paragraph = document.querySelector('.photo-title')
  let titleSubmit = document.querySelector('.title-submit')
  let titleValue = document.querySelector('.title-value')

  let filters = Array.from(document.querySelectorAll('.filter-button'))
  let photos = Array.from(document.querySelectorAll('.photos'))

  filters.forEach(function(filter) {
    filter.addEventListener('click', function(ev){
      let newFilter = filter.dataset.filter
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

let hiddenEmail = document.querySelector('.hidden-email')
let emailButton = document.querySelector('.email-button')
let hiddenSubmit = document.querySelector('.hidden-submit')

emailButton.addEventListener("click", function(){
  hiddenEmail.classList.remove('d-none')
  hiddenSubmit.classList.remove('d-none')

})})()








module.exports = main
