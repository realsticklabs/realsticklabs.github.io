const imagePattern = /^image\d+\.jpg$/; // Regex for matching image#.jpg
const imageDirectory = './images/'; // Directory where the images are stored
const maxImageCount = 100; // Maximum number of images to check
let images = []; // Array to store image metadata

// Fetch last-modified date for an image
async function fetchLastModified(imagePath) {
    try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        if (response.ok) {
            const lastModified = response.headers.get('Last-Modified');
            return new Date(lastModified);
        }
    } catch (error) {
        console.error(`Failed to fetch metadata for ${imagePath}:`, error);
    }
    return null;
}

// Dynamically scan for images and fetch metadata
async function scanImages() {
    for (let i = 1; i <= maxImageCount; i++) {
        const imageName = `image${i}.jpg`;
        if (imagePattern.test(imageName)) {
            const imagePath = `${imageDirectory}${imageName}`;
            const lastModified = await fetchLastModified(imagePath);
            if (lastModified) {
                images.push({
                    name: imageName,
                    path: imagePath,
                    date: lastModified,
                });
            }
        }
    }
    displayImages(images); // Display all images initially
}

// Display images in the gallery
function displayImages(imagesToDisplay) {
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = ''; // Clear the gallery

    imagesToDisplay.forEach(image => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        imageCard.innerHTML = `
            <img src="${image.path}" alt="${image.name}" />
            <p>${image.name} - ${image.date.toDateString()}</p>
        `;
        gallery.appendChild(imageCard);
    });
}

// Filter images by selected date
function filterImagesByDate() {
    const selectedDate = document.getElementById('date-picker').value;
    if (selectedDate) {
        const targetDate = new Date(selectedDate);
        const filteredImages = images.filter(image => {
            const imageDate = image.date;
            return imageDate.toDateString() === targetDate.toDateString();
        });
        displayImages(filteredImages);
    } else {
        displayImages(images); // Show all images if no date is selected
    }
}

// Start scanning for images when the page loads
window.onload = scanImages;
