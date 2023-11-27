// Sample data
let attendees = [
    { name: 'Person 1', info: 'Allergic to nuts' },
    { name: 'Person 2', info: '' },
    { name: 'Person 3', info: '' },
    { name: 'Person 4', info: '' },
    { name: 'Person 5', info: 'Scared of heights' },
    { name: 'Person 6', info: '' },
];

document.addEventListener("DOMContentLoaded", function () {
    const attendeeListContainer = document.getElementById('attendeeList');
    const editForm = document.getElementById('editAttendeeForm');
    const addForm = document.getElementById('addAttendeeForm');

    // Initial display of attendees
    updateAttendeesDisplay();

    // Add event listener to open edit modal when clicking on edit buttons
    document.querySelectorAll('.edit-btn-attendee').forEach((button, index) => {
        button.addEventListener('click', () => openEditModal(index));
    });

    // Add event listener for editing an attendee
    editForm.addEventListener('submit', function (event) {
        event.preventDefault();
        editAttendee();
    });

    // Add event listener for adding an attendee
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addAttendee();
    });
});

function updateAttendeesDisplay() {
    const attendeeListContainer = document.getElementById('attendeeList');
    attendeeListContainer.innerHTML = '';

    attendees.forEach((attendee, index) => {
        const listItem = document.createElement('a');
        listItem.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'align-items-center');
        listItem.innerHTML = `
            <div class="flex-grow-1 ms-3">
                <div><strong>${index + 1}) ${attendee.name}</div></strong> 
                <small>${attendee.info}</small>
            </div>
            <span class="ml-auto">
                <button class="btn btn-outline-secondary edit-btn-attendee btn-sm" data-target="#editModalAttendees" onclick="openEditModal(${index})">
                    <i class="bi bi-pencil-square"></i>
                </button>
            </span>
        `;
        attendeeListContainer.appendChild(listItem);
    });
}


function openEditModal(index) {
    const editAttendeeNameInput = document.getElementById('editAttendeeName');
    const editAttendeeInfoInput = document.getElementById('editAttendeeInfo');

    // Set input values based on the selected attendee
    editAttendeeNameInput.value = attendees[index].name;
    editAttendeeInfoInput.value = attendees[index].info;

    // Save the index in the form for later use
    editAttendeeNameInput.setAttribute('data-index', index);

    // Open the modal
    openModalEditAttend('#editModalAttendees');
}

function editAttendee() {
    const editAttendeeNameInput = document.getElementById('editAttendeeName');
    const editAttendeeInfoInput = document.getElementById('editAttendeeInfo');
    const index = editAttendeeNameInput.getAttribute('data-index');

    attendees[index].name = editAttendeeNameInput.value;
    attendees[index].info = editAttendeeInfoInput.value;

    updateAttendeesDisplay();
    closeModalAttend('#editModalAttendees');
}

function deleteAttendee() {
    const editAttendeeNameInput = document.getElementById('editAttendeeName');
    const index = editAttendeeNameInput.getAttribute('data-index');

    // Ask for confirmation before deleting
    const confirmDelete = confirm("Are you sure you want to delete this attendee?");
    
    if (confirmDelete) {
        attendees.splice(index, 1);
        updateAttendeesDisplay();
    }

    closeModalAttend('#editModalAttendees');
}


function addAttendee() {
    const addAttendeeNameInput = document.getElementById('addAttendeeName');
    const addAttendeeInfoInput = document.getElementById('addAttendeeInfo');

    const newAttendee = {
        name: addAttendeeNameInput.value,
        info: addAttendeeInfoInput.value,
    };

    attendees.push(newAttendee);

    updateAttendeesDisplay();
    var modal = document.getElementById('addModalAttendees');
    if (modal) {
        // Reset the form fields
        var form = document.getElementById('addAttendeeForm');
        form.reset();

        modal.style.display = 'block';
    }
    closeModalAttend('#addModalAttendees');
}

function closeModalAttend(modalSelector) {
    const modal = document.querySelector(modalSelector);
    if (modal) {
        modal.style.display = 'none';
    }
}

function openModalAttend(modalSelector) {
    const modal = document.querySelector(modalSelector);
    if (modal) {
        // Reset the form fields
        const form = modal.querySelector('form');
        form.reset();

        modal.style.display = 'block';
    }
}

function openModalEditAttend(modalSelector) {
    const modal = document.querySelector(modalSelector);
    if (modal) {
        // Reset the form fields
        const form = modal.querySelector('form');

        modal.style.display = 'block';
    }
}


let tripDetails = {
    tripName: 'Florida Tropical Beach',
    dateRange: '06/03/2024 to 06/09/2024',
    location: 'Florida',
    additionalInfo: 'Hotel is Hotel Tampa Riverwalk'
};

function updateTripDetailsDisplay() {
    // Update trip details display
    document.getElementById('tripNameDisplay').textContent = tripDetails.tripName;
    document.getElementById('dateRangeDisplay').textContent = tripDetails.dateRange;
    document.getElementById('locationDisplay').textContent = tripDetails.location;
    document.getElementById('additionalInfoDisplay').textContent = tripDetails.additionalInfo;
}

function openEditTripModal() {
    const tripNameInput = document.getElementById('tripName');
    const dateRangeInput = document.getElementById('dateRange');
    const locationInput = document.getElementById('location');
    const additionalInfoInput = document.getElementById('additionalInfo');

    // Set input values based on the current trip details
    tripNameInput.value = tripDetails.tripName;
    dateRangeInput.value = tripDetails.dateRange;
    locationInput.value = tripDetails.location;
    additionalInfoInput.value = tripDetails.additionalInfo;
    console.log(locationInput.value, additionalInfoInput.value,);

    const modal = document.querySelector('#editModalTrip');
    if (modal) {
        // Reset the form fields
        const form = modal.querySelector('form');

        modal.style.display = 'block';
    }
}

function editTrip() {
    const tripNameInput = document.getElementById('tripName');
    const dateRangeInput = document.getElementById('dateRange');
    const locationInput = document.getElementById('location');
    const additionalInfoInput = document.getElementById('additionalInfo');

    tripDetails = {
        tripName: tripNameInput.value,
        dateRange: dateRangeInput.value,
        location: locationInput.value,
        additionalInfo: additionalInfoInput.value
    };

    updateTripDetailsDisplay();
    closeModalAttend('#editModalTrip');
}

// Edit Trip Form
// ------------------------------------------------------------------
// Get the modal
document.addEventListener("DOMContentLoaded", function () {
    // Get the modal
      var modalTripEdit = document.getElementById("editModalTrip");
  
      // Get the <span> element that closes the modal
      var spanTripEdit  = document.getElementsByClassName("close edit trip")[0];
  
      // When the user clicks on <span> (x), close the modal
      spanTripEdit.onclick = function () {
          modalTripEdit.style.display = "none";
      }
  });

