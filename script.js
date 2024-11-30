const mediaLinkInput = document.getElementById('media-link');
const formatButtons = document.querySelectorAll('.format-btn');
const downloadButton = document.getElementById('download-btn');
const statusMessage = document.getElementById('status-message');

let selectedFormat = null;

// Enable or disable the download button based on input
mediaLinkInput.addEventListener('input', () => {
    if (mediaLinkInput.value.trim() !== "") {
        downloadButton.classList.add('active');
        downloadButton.disabled = false;
    } else {
        downloadButton.classList.remove('active');
        downloadButton.disabled = true;
    }
});

// Format selection
formatButtons.forEach(button => {
    button.addEventListener('click', () => {
        formatButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedFormat = button.getAttribute('data-format');
    });
});

// Simulate download
downloadButton.addEventListener('click', () => {
    const link = mediaLinkInput.value.trim();
    if (!link) {
        statusMessage.textContent = "Please provide a valid link.";
        return;
    }
    if (!selectedFormat) {
        statusMessage.textContent = "Please select a format.";
        return;
    }

    statusMessage.style.color = '#4caf50';
    statusMessage.textContent = `Downloading ${selectedFormat} from the provided link...`;

    // Simulate the download action
    setTimeout(() => {
        alert(`${selectedFormat.toUpperCase()} downloaded successfully!`);
        mediaLinkInput.value = "";
        downloadButton.classList.remove('active');
        downloadButton.disabled = true;
        selectedFormat = null;
        statusMessage.textContent = "";
    }, 2000);
});