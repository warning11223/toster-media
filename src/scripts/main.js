const selects = document.querySelectorAll('.js-choice');

selects.forEach(item => {
    const choice = new Choices(item, {
        searchEnabled: false,
        itemSelectText: ''
    })
})


/*-------------timer-----------------*/

function updateTimer() {
    const timerElement = document.querySelector('.offer__timer');
    const timerValue = timerElement.textContent.split(':');
    let hours = parseInt(timerValue[0]);
    let minutes = parseInt(timerValue[1]);
    let seconds = parseInt(timerValue[2]);

    if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "Time is up";
        return;
    }

    if (seconds > 0) {
        seconds--;
    } else {
        seconds = 59;
        if (minutes > 0) {
            minutes--;
        } else {
            minutes = 59;
            if (hours > 0) {
                hours--;
            }
        }
    }

    // Convert numbers to a two-digit string
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    // Update timer text
    timerElement.textContent = `${hoursStr}:${minutesStr}:${secondsStr}`;
}

// Update timer every second
const timerInterval = setInterval(updateTimer, 1000);

/*---------------preview-------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const previewThumbnails = document.querySelectorAll('.preview__small');
    const mainImage = document.getElementById('mainImage');


    function changeImage(thumbnail) {
        previewThumbnails.forEach(preview => {
            preview.classList.remove('active-preview');
        });

        thumbnail.classList.add('active-preview');

        mainImage.style.opacity = 0;

        // Start changing the image with a slight delay
        setTimeout(() => {
            // Replace the main image with the image from the preview
            mainImage.src = thumbnail.src;
            mainImage.alt = thumbnail.alt;


            mainImage.style.opacity = 1;
        }, 400);
    }

    // Set the first photo as default
    changeImage(previewThumbnails[0]);

    previewThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            changeImage(thumbnail);
        });
    });
});