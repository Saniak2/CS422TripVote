// *********************************************************************
// Activity
// *********************************************************************

// Add event listeners to like buttons
// ------------------------------------------------------------------
// this code does not permanently store the like count anywhere
// it will reset when the page is refreshed
// document.querySelectorAll('.like-btn').forEach(button => {
//     button.addEventListener('click', function () {
//         // Retrieve the current like count from data-likes attribute
//         let likeCount = parseInt(this.getAttribute('data-likes'));
        
//         // Check if the button is already highlighted (green)
//         if (this.style.backgroundColor === 'rgb(119, 221, 119)') { // RGB value of green
//             // Decrement the like count and reset the color
//             likeCount--;
//             this.style.backgroundColor = ''; // Reset to default
//         } else {
//             // Increment the like count and change the color to green
//             likeCount++;
//             this.style.backgroundColor = '#77dd77'; // Green color
//         }
        
//         // Update the data-likes attribute and the display
//         this.setAttribute('data-likes', likeCount);
//         this.querySelector('.like-count').textContent = likeCount;
//     });
// });

// Edit Trip Form
// ------------------------------------------------------------------
// Get the modal
// document.addEventListener("DOMContentLoaded", function () {
//   // Get the modal
//     var modalTripEdit = document.getElementById("editModalTrip");

//     // Get the button that opens the modal
//     var btnTripEdit  = document.querySelectorAll(".edit-btn-trip");

//     // Get the <span> element that closes the modal
//     var spanTripEdit  = document.getElementsByClassName("close edit trip")[0];

//     // When the user clicks on the button, open the modal
//     btnTripEdit.forEach(function (editBtn) {
//         editBtn.onclick = function () {
//             modalTripEdit.style.display = "block";
//         }
//     });

//     // When the user clicks on <span> (x), close the modal
//     spanTripEdit.onclick = function () {
//         modalTripEdit.style.display = "none";
//     }
// });


// Edit Activity Form
// ------------------------------------------------------------------
// Get the modal
var modal = document.getElementById("editModal");

// Get the button that opens the modal
var btn = document.querySelectorAll(".edit-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close edit")[0];

// When the user clicks on the button, open the modal
btn.forEach(function (editBtn) {
    editBtn.onclick = function () {
        modal.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Add Activity Form
// ------------------------------------------------------------------
// Get the modal
var modal2 = document.getElementById("addModal");

// Get the button that opens the modal
var btn2 = document.querySelectorAll(".add-btn");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close add")[0];

// When the user clicks on the button, open the modal
btn2.forEach(function (addBtn) {
    addBtn.onclick = function () {
        modal2.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
span2.onclick = function () {
    modal2.style.display = "none";
}

// document.getElementById('activityForm').addEventListener('submit', function (e) {
//     e.preventDefault();

//     // Collect data from the form
//     var activityData = {
//         name: document.getElementById('activityName').value,
//         price: document.getElementById('price').value,
//         location: document.getElementById('location').value,
//         time: document.getElementById('time').value,
//         additionalInfo: document.getElementById('additionalInfo').value
//     };

//     // Send data to server
//     fetch('/activities', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(activityData),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//             // Here you can also add code to dynamically add the new card to the page
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// });

// // Function to dynamically add a new activity card
// function addActivityCard(activity) {
//     const activitiesGrid = document.getElementById('activitiesGrid'); // Assuming this is your grid's ID
//     const newCard = `
//         <div class="col">
//             <div class="card">
//                 <div class="card-body">
//                     <h5 class="card-title">${activity.name}</h5>
//                     <p class="card-text">
//                         Price: ${activity.price}<br>
//                         Location: ${activity.location}<br>
//                         Time: ${activity.time}<br>
//                         Additional Info: ${activity.additionalInfo}
//                     </p>
//                     <!-- Other card elements -->
//                 </div>
//             </div>
//         </div>
//     `;
//     activitiesGrid.innerHTML += newCard;
// }


// *********************************************************************
// Attendees
// *********************************************************************

// Edit Attendee Form
// ------------------------------------------------------------------
// Get the modal
var modalAttendEdit = document.getElementById("editModalAttendees");

// Get the button that opens the modal
var btnAttendEdit  = document.querySelectorAll(".edit-btn-attendee");

// Get the <span> element that closes the modal
var spanAttendEdit  = document.getElementsByClassName("close edit attendees")[0];

// When the user clicks on the button, open the modal
btnAttendEdit.forEach(function (editBtn) {
    editBtn.onclick = function () {
        modalAttendEdit.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
spanAttendEdit.onclick = function () {
    modalAttendEdit.style.display = "none";
}

// Add Attendee Form
// ------------------------------------------------------------------
// Get the modal
var modalAttend = document.getElementById("addModalAttendees");

// Get the button that opens the modal
var btnAttend = document.querySelectorAll(".add-btn-attendee");

// Get the <span> element that closes the modal
var spanAttend = document.getElementsByClassName("close add attendees")[0];

// When the user clicks on the button, open the modal
btnAttend.forEach(function (addBtn) {
    addBtn.onclick = function () {
        modalAttend.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
spanAttend.onclick = function () {
    modalAttend.style.display = "none";
}


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



var inst = mobiscroll.eventcalendar('#demo-desktop-week-view', {
    theme: 'ios',
    themeVariant: 'light',
    clickToCreate: true,
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    eventDelete: true,
    view: {
        schedule: { type: 'week' }
    },
    onEventClick: function (event, inst) {
        mobiscroll.toast({
            message: event.event.title
        });
    }
});

mobiscroll.util.http.getJson('https://trial.mobiscroll.com/events/?vers=5', function (events) {
    inst.setEvents(events);
}, 'jsonp');
