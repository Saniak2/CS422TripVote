// // Add Schedule Form
// // ------------------------------------------------------------------
// // Get the modal
// var modalSchedule = document.getElementById("addModalSchedule");

// // Get the button that opens the modal
// var btnSchedule = document.querySelectorAll(".add-btn-schedule");

// // Get the <span> element that closes the modal
// var spanSchedule = document.getElementsByClassName("close add schedule")[0];

// // When the user clicks on the button, open the modal
// btnSchedule.forEach(function (addBtn) {
//     addBtn.onclick = function () {
//         openScheduleModal();
//     };
// });

// // When the user clicks on <span> (x), close the modal
// spanSchedule.onclick = function () {
//     modalSchedule.style.display = "none";
// };

// // Function to open the schedule modal and clear previous fields
// function openScheduleModal() {
//     // Reset the form fields
//     var form = document.getElementById('tripFormSchedule');
//     form.reset();
//     modalSchedule.style.display = "block";
// }

// // Function to submit the form and close the modal
// function submitScheduleForm() {
//     // Your form submission logic here

//     // Close the modal
//     modalSchedule.style.display = "none";
// }


// // Define a variable to store the list of activities
// let activitiesList = [];

// // Function to get input values
// function getInputValue(id) {
//     const value = document.getElementById(id).value;
//     console.log(`Value of ${id}: ${value}`);
//     return value;
// }


// // Function to clear form fields
// function clearFormFields() {
//     const fieldIds = ['activityNameSchedule', 'priceSchedule', 'locationSchedule', 'startTime', 'endTime', 'activityDate'];

//     fieldIds.forEach((id) => {
//         document.getElementById(id).value = '';
//     });
// }

// // Function to add a new activity to the list
// function addNewActivityToList() {
//     const activityNameSchedule = getInputValue('activityNameSchedule');
//     const priceSchedule = getInputValue('priceSchedule');
//     const locationSchedule = getInputValue('locationSchedule');
//     const startTime = getInputValue('startTime');
//     const endTime = getInputValue('endTime');
//     const activityDate = getInputValue('activityDate');

//     console.log("activity", activityName);
//     const newActivity = {
//         activityNameSchedule: activityNameSchedule,
//         priceSchedule: priceSchedule,
//         locationSchedule: locationSchedule,
//         startTime: startTime,
//         endTime: endTime,
//         date: activityDate
//     };

//     activitiesList.push(newActivity);

//     // Update the display of the activities list
//     updateActivitiesList();

//     // Optionally, clear the form fields
//     clearFormFields();

//     var modal = document.getElementById('addModalSchedule');
//     if (modal) {
//         modal.style.display = 'none';
//     }
// }


// // Function to create activity item HTML
// function createActivityItem(activity, index) {
//     const activityItem = document.createElement('div');
//     activityItem.classList.add('activity-item', 'card', 'mb-3', 'col-md-4');

//     // Format the date string
//     const formattedDate = formatDate(activity.date);

//     // Add 1 to the index to display the order starting from 1 instead of 0
//     const order = index + 1;

//     activityItem.innerHTML = `
//         <div class="card-body">
//             <h5 class="card-title">${order}. ${activity.activityNameSchedule}</h5>
//             <p class="card-text">Date: ${formattedDate}</p>
//             <p class="card-text">Time: ${activity.startTime} - ${activity.endTime}</p>
//             <p class="card-text">Location: ${activity.locationSchedule}</p>
//             <p class="card-text">Price: ${activity.priceSchedule}</p>
//             <button class="btn btn-outline-secondary edit-btn-activity" onclick="openEditActivityModalSchedule(${index})">
//                 <i class="bi bi-pencil-square"></i> Edit
//             </button>
//         </div>
//     `;

//     return activityItem;
// }


// // Function to format date as MM/DD/YYYY
// function formatDate(dateString) {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

//     // Parse the input date string in UTC
//     const date = new Date(dateString + 'T00:00:00Z');

//     // Get the date components in UTC
//     const year = date.getUTCFullYear();
//     const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
//     const day = date.getUTCDate().toString().padStart(2, '0');

//     return `${month}/${day}/${year}`;
// }





// // Function to update the display of the activities list
// // function updateActivitiesList() {
// //     const activitiesListContainer = document.getElementById('activitiesListContainer');

// //     // Sort the activities list by date
// //     activitiesList.sort((a, b) => new Date(a.date) - new Date(b.date));

// //     // Clear the old cards
// //     activitiesListContainer.innerHTML = '';

// //     // Render the sorted activities
// //     activitiesList.forEach((activity, index) => {
// //         const activityItem = createActivityItem(activity, index);
// //         activitiesListContainer.appendChild(activityItem);
// //     });
// // }

// // Function to update the display of the activities list
// function updateActivitiesList() {
//     const activitiesListContainer = document.getElementById('activitiesListContainer');

//     // Sort the activities list by date and start time
//     activitiesList.sort((a, b) => {
//         console.log('Sorting:', a.date, a.startTime, 'vs', b.date, b.startTime);

//         const dateComparison = new Date(a.date) - new Date(b.date);
//         if (dateComparison !== 0) {
//             return dateComparison;
//         }

//         const parseTime = (timeString) => {
//             const [time, meridiem] = timeString.split(' ');
//             const [hours, minutes] = time.split(':').map(Number);
//             const adjustedHours = meridiem === 'PM' && hours !== 12 ? hours + 12 : hours;
//             return adjustedHours * 60 + minutes;
//         };

//         const startTimeA = parseTime(a.startTime);
//         const startTimeB = parseTime(b.startTime);

//         console.log('Converted:', startTimeA, 'vs', startTimeB);

//         return startTimeA - startTimeB;
//     });


//     // Clear the old cards
//     activitiesListContainer.innerHTML = '';

//     // Render the sorted activities
//     activitiesList.forEach((activity, index) => {
//         const activityItem = createActivityItem(activity, index);
//         activitiesListContainer.appendChild(activityItem);
//     });
// }


// // Get the form element
// var tripFormSchedule = document.getElementById('tripFormSchedule');

// // Add an event listener for form submission
// tripFormSchedule.addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the default form submission
//     submitScheduleForm();    // Call your custom submission function
// });


// // Function to submit the form and close the modal
// function submitScheduleForm() {
//     // Your form submission logic here

//     // Call the function to add a new activity to the list
//     addNewActivityToList();

//     // Close the modal
//     modalSchedule.style.display = "none";
// }


// // Function to open the edit modal
// function openEditActivityModalSchedule(index) {
//     const activity = activitiesList[index];

//     // Populate the edit form fields with the selected activity's information
//     document.getElementById('editActivityName').value = activity.activityNameSchedule;
//     document.getElementById('editPrice').value = activity.priceSchedule;
//     document.getElementById('editLocation').value = activity.locationSchedule;
//     document.getElementById('editStartTime').value = activity.startTime;
//     document.getElementById('editEndTime').value = activity.endTime;
//     document.getElementById('editActivityDate').value = activity.date;

//     // Display the edit modal
//     document.getElementById('editModalSchedule').style.display = 'block';
// }

// // Function to close the edit modal
// function closeEditModalSchedule() {
//     document.getElementById('editModalSchedule').style.display = 'none';
// }

// // Function to submit the edit form
// function submitEditFormSchedule() {
//     // Get the edited values from the form fields
//     const editedActivityName = document.getElementById('editActivityName').value;
//     const editedPrice = document.getElementById('editPrice').value;
//     const editedLocation = document.getElementById('editLocation').value;
//     const editedStartTime = document.getElementById('editStartTime').value;
//     const editedEndTime = document.getElementById('editEndTime').value;
//     const editedActivityDate = document.getElementById('editActivityDate').value;

//     // Get the index of the activity to edit from the global variable
//     const indexToEdit = window.indexToDelete;

//     // Check if the index is valid
//     if (indexToEdit >= 0 && indexToEdit < activitiesList.length) {
//         // Update the activity in the list with the edited information
//         activitiesList[indexToEdit].activityNameSchedule = editedActivityName;
//         activitiesList[indexToEdit].priceSchedule = editedPrice;
//         activitiesList[indexToEdit].locationSchedule = editedLocation;
//         activitiesList[indexToEdit].startTime = editedStartTime;
//         activitiesList[indexToEdit].endTime = editedEndTime;
//         activitiesList[indexToEdit].date = editedActivityDate;

//         // Update the display of the activities list
//         updateActivitiesList();
//     }

//     // Close the edit modal
//     closeEditModalSchedule();
// }


// // Function to open the edit modal
// function openEditActivityModalSchedule(index) {
//     const activity = activitiesList[index];

//     // Populate the edit form fields with the selected activity's information
//     document.getElementById('editActivityName').value = activity.activityNameSchedule;
//     document.getElementById('editPrice').value = activity.priceSchedule;
//     document.getElementById('editLocation').value = activity.locationSchedule;
//     document.getElementById('editStartTime').value = activity.startTime;
//     document.getElementById('editEndTime').value = activity.endTime;
//     document.getElementById('editActivityDate').value = activity.date;

//     // Set the indexToDelete in the global scope
//     window.indexToDelete = index;

//     // Display the edit modal
//     document.getElementById('editModalSchedule').style.display = 'block';
// }

// // Function to delete the selected activity
// function deleteScheduleActivity() {
//     // Get the index of the activity to delete from the global variable
//     const indexToDelete = window.indexToDelete;

//     // Check if the index is valid
//     if (indexToDelete >= 0 && indexToDelete < activitiesList.length) {
//         // Ask for confirmation before deleting
//         const confirmation = confirm('Are you sure you want to delete this activity on the schedule?');

//         if (confirmation) {
//             // Remove the activity from the list
//             activitiesList.splice(indexToDelete, 1);

//             // Update the display of the activities list
//             updateActivitiesList();
//         }
//     }

//     // Close the edit modal
//     closeEditModalSchedule();
// }

// // Load example activities when the page is loaded
// document.addEventListener('DOMContentLoaded', function () {
//     const examples = [
//         {
//             activityNameSchedule: "Beach Volleyball",
//             priceSchedule: "$15",
//             locationSchedule: "Florida Beach",
//             startTime: "9:00 AM",
//             endTime: "11:00 AM",
//             date: "2024-06-03"
//         },
//         {
//             activityNameSchedule: "Guided City Tour",
//             priceSchedule: "$30",
//             locationSchedule: "Downtown",
//             startTime: "1:00 PM",
//             endTime: "4:00 PM",
//             date: "2024-06-04"
//         },
//         {
//             activityNameSchedule: "Landmark",
//             priceSchedule: "$50",
//             locationSchedule: "Downtown",
//             startTime: "7:00 PM",
//             endTime: "9:00 PM",
//             date: "2024-06-07"
//         }
//     ];

//     examples.forEach(function (example) {
//         // Set the date format as YYYY-MM-DD for the input field
//         example.date = example.date.split('/').reverse().join('-');

//         // Add each example activity to the list
//         activitiesList.push(example);
//     });

//     // Update the display of the activities list
//     updateActivitiesList();
// });


