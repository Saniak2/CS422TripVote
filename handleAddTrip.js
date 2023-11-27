// Define the 'trips' array somewhere in your code before calling updateTripsDisplay
let trips = [
    {
        "id": 1,
        "name": "Florida Tropical Beach",
        "dateRange": "06/03/2024 to 06/09/2024",
        "location": "Florida",
        "additionalInfo": "Hotel is Hotel Tampa Riverwalk",
    }
];

document.addEventListener("DOMContentLoaded", function () {
    // Get the modal for editing trips
    var modalTripEdit = document.getElementById("editModalTrip");

    // Get the button that opens the modal for editing trips
    var btnTripEdit = document.querySelectorAll(".edit-btn-trip");

    // Get the <span> element that closes the modal for editing trips
    var spanTripEdit = document.getElementsByClassName("close edit trip")[0];

    // When the user clicks on the button to edit trips, open the modal
    btnTripEdit.forEach(function (editBtn) {
        editBtn.onclick = function () {
            modalTripEdit.style.display = "block";
        };
    });

    // When the user clicks on <span> (x) to close the modal for editing trips
    spanTripEdit.onclick = function () {
        modalTripEdit.style.display = "none";
    };

    // Find the first button with the class add-btn for adding trips
    var addButton = document.querySelector('.edit-btn-trip');

    // Attach the openModal function to the button's click event for adding trips
    addButton.addEventListener('click', openModal);
});

// Function to open the modal for adding trips
function openModal() {
    var modal = document.getElementById('editModalTrip');
    if (modal) {
        // Reset the form fields
        var form = document.getElementById('tripForm');
        form.reset();

        modal.style.display = 'block';
    }
}

// Function to add a new trip
function addNewTrip() {
    const tripName = document.getElementById('tripName').value;
    const dateRange = document.getElementById('dateRange').value;
    const location = document.getElementById('location').value;
    const additionalInfo = document.getElementById('additionalInfo').value || "N/A";

    const newTrip = { name: tripName, dateRange: dateRange, location: location, additionalInfo: additionalInfo };
    trips.push(newTrip);

    updateTripsDisplay();
    openModal();
    closeModal();
}

// Function to update the display of trips
function updateTripsDisplay() {
    const currentTripsContainer = document.querySelector('.current-trips');
    currentTripsContainer.innerHTML = '<h3 class="trip-section-title mb-3">Current Trips</h3>';

    trips.forEach((trip, index) => {
        const tripContainer = document.createElement('div');
        tripContainer.classList.add('trip-info', 'trip-info-homepage', 'card', 'mb-3');
        tripContainer.innerHTML = `
            <h4>Trip: ${trip.name}</h4>
            <p>Date Range: ${trip.dateRange}</p>
            <button class="btn btn-link" onclick="event.stopPropagation(); copyInviteLink('CS422TripVote/index.html')">
                <i class="bi bi-link-45deg"></i> Invite Link
            </button>
        `;

        // Add the event listener to redirect to the trip page
        tripContainer.addEventListener('click', function () {
            redirectToTrip('index.html');
        });

        currentTripsContainer.appendChild(tripContainer);
    });
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById('editModalTrip');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to redirect to the trip page
function redirectToTrip(tripUrl) {
    window.location.href = tripUrl;
}

// Function to copy the invite link to the clipboard
function copyInviteLink(tripUrl) {
    // Construct the full URL
    const fullUrl = window.location.origin + '/' + tripUrl;

    // Copy to clipboard logic
    const textArea = document.createElement("textarea");
    textArea.value = fullUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();

    // Show toast notification
    showNotification();
}

// Function to show the toast notification
function showNotification() {
    const toast = document.getElementById("toast");
    const toastBody = document.getElementById("toast-body");

    // Show the toast
    toast.classList.add("show");

    // Hide the toast after 3 seconds (adjust as needed)
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
