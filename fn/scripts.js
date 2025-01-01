// Array of image file names
const imageFiles = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg"
    // Add more image files here
];

// Function to fetch and display images based on the selected date
function fetchImageMetadata(imageFile) {
    return fetch(imageFile, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                const lastModified = response.headers.get('Last-Modified');
                return { src: imageFile, date: new Date(lastModified), description: `Image for ${imageFile}` };
            }
            return null;
        })
        .catch(error => {
            console.error("Error fetching image metadata:", error);
            return null;
        });
}

// Function to display images based on their metadata
function displayImages(imagesToDisplay) {
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = ''; // Clear the gallery before displaying new images

    imagesToDisplay.forEach(image => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        imageCard.innerHTML = `
            <img src="${image.src}" alt="${image.src}" />
            <p class="fieldnomer">${image.description}</p>
        `;
        gallery.appendChild(imageCard);
    });
}

// Function to filter images based on the selected date
function filterImagesByDate() {
    const selectedDate = document.getElementById('date-picker').value;

    if (selectedDate) {
        const targetDate = new Date(selectedDate);
        const filteredImages = images.filter(image => {
            const imageDate = new Date(image.date);
            return imageDate.toDateString() === targetDate.toDateString();
        });
        displayImages(filteredImages);
    } else {
        // If no date is selected, display all images
        displayImages(images);
    }
}

// Fetch metadata for all images and store it
async function loadImages() {
    const imagePromises = imageFiles.map(imageFile => fetchImageMetadata(imageFile));
    const imageMetadata = await Promise.all(imagePromises);
    // Filter out any null results (in case of errors)
    images = imageMetadata.filter(image => image !== null);
    // Initially display all images
    displayImages(images);
}

// Initially load images on page load
window.onload = loadImages;
