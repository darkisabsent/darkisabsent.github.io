const menuToggle = document.getElementById('menu-toggle');
const body = document.body;
document.addEventListener('DOMContentLoaded', () => {
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

    let assetsLoaded = 0;
    const totalAssets = videos.length + images.length;

    // Preload all videos and images
    const checkAssetsLoaded = () => {
        assetsLoaded++;
        if (assetsLoaded === totalAssets) {
            setTimeout(() => {
                preloader.style.display = 'none'; // Hide the preloader
                startImageContainer.style.display = 'block'; // Show the image container
                startSoundButton.style.display = 'block'; // Show the button
            }, 2000); // Delay to show the preloader for 2 seconds
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
            image.addEventListener('error', checkAssetsLoaded); // Handle broken images
        }
    });

    // Start button logic
    startSoundButton.addEventListener('click', () => {
        startSoundContainer.style.display = 'none'; // Hide the start container
        frontVideo.play(); // Play the entry video

        // Set opacity of elements to 0
        header.style.opacity = '0';
        homeContent.style.opacity = '0';
        profileImage.style.opacity = '0';
        body.style.overflowY = 'hidden';
        // After 13 seconds (video duration), set opacity back to 1
        setTimeout(() => {
            header.style.transition = 'opacity 3s ease-in-out';
            profileImage.style.transition = 'opacity 3s ease-in-out';

            header.style.opacity = '1';
            homeContent.style.opacity = '1';
            profileImage.style.opacity = '1';
            body.style.overflowY = 'auto';
            fro
        }, 8500); // 13 seconds
    });
});

const navbar = document.querySelector('.navbar');
const carousel = document.querySelector('.carousel-container');

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

let isHovered = false;

carousel.addEventListener('mouseenter', () => {
    isHovered = true;
    carousel.style.animationPlayState = 'paused';
});

carousel.addEventListener('mouseleave', () => {
    isHovered = false;
    carousel.style.animationPlayState = 'running';
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    emailjs.sendForm('service_ggib6r2', 'template_j3pnqqf', this) // Replace with your Service ID and Template ID
        .then(() => {
            alert('Message sent successfully!');
            this.reset(); // Reset the form after submission
        }, (error) => {
            alert('Failed to send message. Please try again later.');
            console.error('EmailJS Error:', error);
        });
});



