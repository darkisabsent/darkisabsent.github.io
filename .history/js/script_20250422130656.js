const menuToggle = document.getElementById('menu-toggle');
const body = document.body;
const navbar = document.querySelector('.navbar');
const carousel = document.querySelector('.carousel-container');
const imageUpload = document.getElementById('image-upload');
const confirmAddImageButton = document.getElementById('confirm-add-image-button');
const uploadImageButton = document.getElementById('upload-image-button');
const carouselContainer = document.getElementById('carousel-container');
const startSoundContainer = document.getElementById('start-sound-container');
const startSoundButton = document.getElementById('start-sound-button');
const preloader = document.getElementById('preloader');
const startImageContainer = document.getElementById('start-image-container');
const frontVideo = document.getElementById('front-video');
const header = document.querySelector('header');
const homeContent = document.querySelector('.home-content');
const profileImage = document.querySelector('.profile-image');
const videos = document.querySelectorAll('video');
const images = document.querySelectorAll('img');
let selectedFile = null;
let isHovered = false;
let assetsLoaded = 0;
const totalAssets = videos.length + images.length;

const checkAssetsLoaded = () => {
    assetsLoaded++;
    if (assetsLoaded === totalAssets) {
        setTimeout(() => {
            preloader.style.display = 'none'; 
            startImageContainer.style.display = 'block'; 
            startSoundButton.style.display = 'block'; 
        }, 2000); 
    }
};

videos.forEach((video) => {
    video.load();
    video.addEventListener('canplaythrough', checkAssetsLoaded);
});

images.forEach((image) => {
    if (image.complete) {
        checkAssetsLoaded();
    } else {
        image.addEventListener('load', checkAssetsLoaded);
        image.addEventListener('error', checkAssetsLoaded); 
    }
});

startSoundButton.addEventListener('click', () => {
    startSoundContainer.style.display = 'none'; 
    frontVideo.play(); 

    header.style.opacity = '0';
    homeContent.style.opacity = '0';
    profileImage.style.opacity = '0';
    body.style.overflowY = 'hidden';
    setTimeout(() => {
        header.style.transition = 'opacity 3s ease-in-out';
        profileImage.style.transition = 'opacity 3s ease-in-out';

        header.style.opacity = '1';
        homeContent.style.opacity = '1';
        profileImage.style.opacity = '1';
        body.style.overflowY = 'auto';
        frontVideo.style.display = 'none';
    }, 10000); 
});

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('bx-x');
});

document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navbar.contains(e.target)) {
        navbar.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('bx-x');
    }
});

navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('bx-x');
    });
});

function showContent(event, contentId) {
    event.preventDefault();
    const content = document.getElementById(contentId);
    const titleId = contentId.replace('content', 'title');
    const title = document.getElementById(titleId);
    const readButton = event.target;

    if (content.classList.contains('content-visible')) {
        content.classList.remove('content-visible');
        setTimeout(() => {
            content.style.display = 'none';
            title.classList.remove('text-hidden');
        }, 300);
        readButton.textContent = 'Learn more';
    } else {
        title.classList.add('text-hidden');
        content.style.display = 'block';
        setTimeout(() => {
            content.classList.add('content-visible');
        }, 10);
        readButton.textContent = 'Show less';
    }
}

carousel.addEventListener('mouseenter', () => {
    isHovered = true;
    carousel.style.animationPlayState = 'paused';
});

carousel.addEventListener('mouseleave', () => {
    isHovered = false;
    carousel.style.animationPlayState = 'running';
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_ggib6r2', 'template_j3pnqqf', this) 
        .then(() => {
            alert('Message sent successfully!');
            this.reset(); 
        }, (error) => {
            alert('Failed to send message. Please try again later.');
            console.error('EmailJS Error:', error);
        });
});

function loadImages() {
    console.log('Fetching images...');
    fetch('fetch_images.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(images => {
            console.log('Images fetched:', images);
            carouselContainer.innerHTML = ''; 

            if (images.length === 0) {
                carouselContainer.innerHTML = '<p>No images to display.</p>';
                return;
            }

            images.forEach(image => {
                const div = document.createElement('div');
                div.classList.add('carousel-item');
                div.innerHTML = `<img src="${image}" alt="Achievement">`;
                carouselContainer.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
}

confirmAddImageButton.addEventListener('click', () => {
    selectedFile = imageUpload.files[0];
    if (!selectedFile) {
        alert('Please select an image to confirm.');
        return;
    }
    console.log('Confirmed file:', selectedFile.name);
    alert(`File "${selectedFile.name}" confirmed. You can now upload it.`);
});

uploadImageButton.addEventListener('click', () => {
    if (!selectedFile) {
        alert('Please confirm an image before uploading.');
        return;
    }

    console.log('Uploading file:', selectedFile.name);

    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('http://localhost:8000/upload_images.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Upload result:', data);
            if (data.success) {
                alert('Image uploaded successfully!');
                loadImages(); 
            } else {
                alert(data.error || 'Failed to upload image.');
            }
        })
        .catch(error => console.error('Error uploading image:', error));
});

loadImages();