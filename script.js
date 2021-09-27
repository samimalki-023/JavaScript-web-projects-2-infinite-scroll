const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey= '7cCojk-tepJTCtxZGMtgyecauDxyMNZkGnxkFo3ZYTM';
const apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;

//check loading 
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
     ready = true;
     loader.hidden=true;
  }
}
// Helper function to set attribute
function setAttributes(element , attributes) {
    for (const key in attributes ) {
        element.setAttribute(key , attributes[key]);
    }
}
// Create Elements For Links & photos , add to Dom
function displayPhotos() {
  imagesLoaded=0;
  totalImages = photosArray.length;
    // Run function for each object
    photosArray.forEach((photo) => {
      // create link to unsplash
      const item = document.createElement('a');
      setAttributes(item , {
        href: photo.links.html,
        target : '_blank',

      });
      // create img for photos
      const img = document.createElement('img');
      setAttributes(img , {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });

      // finish load
      img.addEventListener('load' , imageLoaded);
      // put img inside a , then put both inside imageContainer
      item.appendChild(img);
      imageContainer.appendChild(item);

    });
}

// Get photos from unsplash API
async function getPhotos() {
    try{
     const response = await fetch(apiUrl);
     photosArray = await response.json();
     displayPhotos();
    }catch(error) {

    }
}

// Scroll event 
 window.addEventListener('scroll' , () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 
    1000 && ready) {
      ready= false;
      getPhotos();
    }
}) 

// on Load
getPhotos();
