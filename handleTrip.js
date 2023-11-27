let trips = [
    {
        "id": 1,
        "name": "Florida Tropical Beach",
        "dateRange": "06/03/2024 to 06/09/2024",
        "location": "Florida",
        "additionalInfo": "Hotel is Hotel Tampa Riverwalk",
    }
];


// JavaScript function to redirect to the trip page
function redirectToTrip(tripUrl) {
    window.location.href = tripUrl;
}

// JavaScript function to copy the invite link to the clipboard
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

// Display Trips
function displayTrips() {
    const tripsContainer = document.getElementById('tripsContainer');
    tripsContainer.innerHTML = ''; // Clear existing content

    trips.forEach(trip => {
        // Check for additional information
        const additionalInfo = trip.additionalInfo ? trip.additionalInfo : "N/A";

        // Create HTML content for each trip
        const tripContent = `
            <h3 id="tripNameDisplay">Trip: ${trip.name}</h3>
            <p>Date Range: <span id="dateRangeDisplay">${trip.dateRange}</span></p>
            <p>Location: <span id="locationDisplay">${trip.location}</span></p>
            <p>Additional Info: <span id="additionalInfoDisplay">${trip.additionalInfo}</span></p>
            <button class="btn btn-outline-secondary edit-btn-trip" onclick="openEditTripModal(${trip.id})">
                <i class="bi bi-pencil-square"></i> Edit
            </button>
        `;
        tripsContainer.innerHTML += tripContent; // Append the new content
    });
}


document.addEventListener('DOMContentLoaded', function () {
    displayTrips();
});


// Open Edit Modal with Trip Information
function openEditTripModal(tripId) {
    // Find the trip with the given id
    const trip = trips.find(t => t.id === tripId);
    if (trip) {
        // Populate the edit form with trip data
        document.getElementById('editTrip-tripName').value = trip.name;
        document.getElementById('editTrip-dateRange').value = trip.dateRange;
        document.getElementById('editTrip-location').value = trip.location;
        document.getElementById('editTrip-additionalInfo').value = trip.additionalInfo;

        // Store the editing trip's id in the form for reference
        document.getElementById('tripForm').dataset.editingTripId = tripId;

        // Open the modal
        var modal = document.getElementById('editModalTrip');
        modal.style.display = 'block';
    }
}

// Edit Trip
function editTrip() {
    // Retrieve the trip's id that is being edited
    const tripId = parseInt(document.getElementById('tripForm').dataset.editingTripId);

    // Find the trip in the array
    const tripIndex = trips.findIndex(t => t.id === tripId);
    if (tripIndex !== -1) {
        // Update the trip information
        trips[tripIndex].name = document.getElementById('editTrip-tripName').value;
        trips[tripIndex].dateRange = document.getElementById('editTrip-dateRange').value;
        trips[tripIndex].location = document.getElementById('editTrip-location').value;
        trips[tripIndex].additionalInfo = document.getElementById('editTrip-additionalInfo').value || "N/A";

        // Refresh the display
        displayTrips();
    }

    // Close the modal
    var modal = document.getElementById('editModalTrip');
    modal.style.display = 'none';
}




// -------------------------------------- Handle Weekly View -------------------------------------- //

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// const times = ["7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
//     "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
//     "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
//     "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
//     "11:00 PM", "11:30 PM", "12:00 AM"];
// const weekDates = ["06/03/2024", "06/04/2024", "06/05/2024", "06/06/2024", "06/07/2024", "06/08/2024", "06/09/2024"];


// // function formatDate(date) {
// //     if (!(date instanceof Date) || isNaN(date.valueOf())) {
// //         console.error('formatDate received an invalid date:', date);
// //         return 'Invalid date';
// //     }

// //     const day = ('0' + date.getDate()).slice(-2); // Pad single digits with leading 0
// //     const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-indexed, pad single digits with leading 0
// //     const year = date.getFullYear();
// //     const formattedDate = `${month}/${day}/${year}`;

// //     console.log(`Formatted date: ${formattedDate}`); // This should log the formatted date in MM/DD/YYYY format
// //     return formattedDate;
// // }


// // function getWeekDatesFromTrips() {
// //     // Assuming your trips array has at least one trip and the dateRange is correctly formatted
// //     const startDateString = trips[0].dateRange.split(' to ')[0];
// //     // Create a date object from the startDateString
// //     const startDate = parseDateString(startDateString);

// //     // Check if startDate is valid
// //     if (!startDate) {
// //         console.error(`Invalid startDate generated from dateRange: ${trips[0].dateRange}`);
// //         return [];
// //     }

// //     const weekDates = [];
// //     for (let i = 0; i < 7; i++) {
// //         const date = new Date(startDate);
// //         date.setDate(date.getDate() + i);
// //         weekDates.push(formatDate(date)); // Call formatDate for each date
// //     }

// //     console.log(weekDates); // This should log the array of week dates
// //     return weekDates;
// // }

// // function parseDateString(dateStr) {
// //     const parts = dateStr.split('/');
// //     if (parts.length === 3) {
// //         const month = parseInt(parts[0], 10);
// //         const day = parseInt(parts[1], 10);
// //         const year = parseInt(parts[2], 10);
// //         if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
// //             return new Date(year, month - 1, day);
// //         }
// //     }
// //     return null;
// // }


// function createSchedule() {
//     const scheduleContainer = document.getElementById('scheduleContainer');
//     // const weekDates = getWeekDatesFromTrips();
//     // console.log('weekDates:', weekDates);

//     // Create the header row for days
//     const headerRow = document.createElement('div');
//     headerRow.className = 'row';
//     headerRow.appendChild(createCell('Time', true)); // Time label
//     // days.forEach(day => headerRow.appendChild(createCell(day, true))); // Day labels
//     days.forEach((day, index) => {
//         headerRow.appendChild(createCell(day + ' ' + weekDates[index], true)); // Day labels with dates
//     });
//     scheduleContainer.appendChild(headerRow);

//     // Create rows for each time slot
//     times.forEach(time => {
//         const timeRow = document.createElement('div');
//         timeRow.className = 'row';
//         timeRow.appendChild(createCell(time, true)); // Time label

//         days.forEach(day => {
//             const timeCellId = day.toLowerCase() + '-' + time.replace(/[:\s]/g, '');
//             timeRow.appendChild(createCell('', false, timeCellId)); // Cells for each day and time
//         });

//         scheduleContainer.appendChild(timeRow);
//     });
// }

// function createCell(text, isHeader, id = '') {
//     const cell = document.createElement('div');
//     cell.className = isHeader ? 'col text-center font-weight-bold' : 'col';
//     cell.textContent = text;
//     if (id) cell.id = id;
//     return cell;
// }

// document.addEventListener('DOMContentLoaded', createSchedule);
