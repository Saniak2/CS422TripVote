let activities = [
    {
        "id": 1,
        "title": "Ben T Davis beach",
        "price": "$10 - $30",
        "location": "3025 N Rocky Point Dr, Tampa, FL 33607",
        "time": "7AM - 9AM",
        "additionalInfo": "Fee for parking. Bring sunscreen and towels.",
        "likes": 6,
        "image": "images/activities/beach.jpeg"
    },
    {
        "id": 2,
        "title": "JumpFlorida Skydiving",
        "price": "$235 - $255",
        "location": "9002 Paul Buchmman Hwy, Plant City Fl, 33565",
        "time": "9 AM - 10 AM",
        "additionalInfo": "Over 18 years old. Price includes video and pictures.",
        "likes": 5,
        "image": "images/activities/skyDiving.jpeg"
    },
    {
        "id": 3,
        "title": "ZooTampa at Lowry Park",
        "price": "$38 - $48",
        "location": "1101 W Sligh Ave, Tampa, FL 33604",
        "time": "10 AM - 1 PM",
        "additionalInfo": "Bring sunscreen and water.",
        "likes": 3,
        "image": "images/activities/ZooTampa.jpeg"
    },
    {
        "id": 4,
        "title": "Museum of Science & Industry",
        "price": "$10 - $14",
        "location": "4801 E Fowler Ave, Tampa, FL 33617",
        "time": "12 PM - 5 PM",
        "additionalInfo": "Wear comfortable shoes.",
        "likes": 2,
        "image": "images/activities/museum.jpeg"
    }
];


function deleteActivity() {
    const activityIdToDelete = document.getElementById('delete-activity-id').value;
    console.log(activityIdToDelete);
    const confirmed = confirm("Are you sure you want to delete this activity?");
    if (confirmed) {
        console.log(activityIdToDelete);
        deleteActivityById(+activityIdToDelete);
        var modal = document.getElementById('editModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

function openModal() {
    var modal = document.getElementById('addModal');
    if (modal) {
        // Reset the form fields
        var form = document.getElementById('activityForm');
        form.reset();

        modal.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Find the first button with the class add-btn
    var addButton = document.querySelector('.add-btn');

    // Attach the openModal function to the button's click event
    addButton.addEventListener('click', openModal);
});


// Example function to delete an activity by ID
function deleteActivityById(activityId) {
    const activityIndex = activities.findIndex(activity => activity.id === activityId);
    if (activityIndex !== -1) {
        activities.splice(activityIndex, 1);
        refreshActivitiesDisplay();
    }
}


document.getElementById('activityForm').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Form submitted");

    var activityData = {
        id: getNextActivityId(), // Assign a unique ID
        title: document.getElementById('activityName').value,
        price: document.getElementById('price').value,
        location: document.getElementById('location').value,
        time: document.getElementById('time').value,
        additionalInfo: document.getElementById('additionalInfo').value || "N/A",
        likes: 0
    };

    var imageFile = document.getElementById('imageUpload').files[0];
    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            activityData.image = e.target.result; // Set the image only after it's loaded
            activities.push(activityData);
            addActivityCard(activityData);
            closeModal();
        };
        reader.readAsDataURL(imageFile);
    } else {
        activityData.image = "images/activities/default.jpeg"; // Default image path
        activities.push(activityData);
        addActivityCard(activityData);
        closeModal();
    }
});


// Function to get the next unique activity ID
function getNextActivityId() {
    return activities.length > 0 ? Math.max(...activities.map(activity => activity.id)) + 1 : 1;
}

function closeModal() {
    var modal = document.getElementById('addModal');
    if (modal) {
        modal.style.display = 'none';
    }
}


// add activity card to the page
// -----------------------------------------------------------------------------
function addActivityCard(activity) {
    const activitiesGrid = document.getElementById('activitiesGrid');
    const additionalInfo = activity.additionalInfo ? '${activity.additionalInfo}' : 'N/A';
    // const image = activity.image ? `<img src="${activity.image}" class="card-img-top activity-image" alt="Activity Image">` : 'images/activities/default.jpeg';
    
    const newCard = `
        <div class="col">
            <div class="card">
                ${activity.image ? `<img src="${activity.image}" class="card-img-top activity-image" alt="Activity Image">` : ''}
                <div class="card-body">
                    <h5 class="card-title">${activity.title}</h5>
                    <p class="card-text">
                        Price: ${activity.price}<br>
                        Location: ${activity.location}<br>
                        Time: ${activity.time}<br>
                        Additional Info: ${activity.additionalInfo} <br>
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-link text-muted p-1 like-btn" style="text-decoration: none;" data-likes="2" data-activity-id="${activity.id}">
                            <i class="bi bi-hand-thumbs-up like-icon"></i> <span class="like-count">${activity.likes}</span> likes
                        </button>
                        <button class="btn btn-outline-secondary edit-btn" onclick="populateEditForm(${activity.id})">
                            <i class="bi bi-pencil-square"></i> Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    activitiesGrid.innerHTML += newCard;
    // activitiesGrid.appendChild(colDiv);
}

// edit activity card
// -----------------------------------------------------------------------------
let currentEditingActivityId = null;

function populateEditForm(activityId) {
    currentEditingActivityId = activityId; // Set the currently editing activity ID
    // Find the activity data by ID
    var activity = activities.find(act => act.id === activityId);

    // Populate the form fields
    if (activity) {
        // ... (existing code)
        document.getElementById('edit-activityName').value = activity.title || '';
        document.getElementById('edit-price').value = activity.price || '';
        document.getElementById('edit-location').value = activity.location || '';
        document.getElementById('edit-time').value = activity.time || '';
        document.getElementById('edit-additionalInfo').value = activity.additionalInfo || '';
        var currentImageEl = document.getElementById('edit-currentImage');
        if (activity.image) {
            currentImageEl.src = activity.image;
            currentImageEl.style.display = 'block'; // Show the image element
        } else {
            currentImageEl.style.display = 'none'; // Hide the image element if there's no image
        }

        // Store the current editing activity ID for delete functionality
        document.getElementById('delete-activity-id').value = activity.id;
    }

    // Open the modal
    var modal = document.getElementById('editModal');
    modal.style.display = 'block';
}


function closeEditModal() {
    var modal = document.getElementById('editModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('editActivityForm').addEventListener('submit', function (e) {
    console.log("Edit form submitted"); // Test log
    e.preventDefault();

    if (currentEditingActivityId === null) {
        console.error('No activity is currently being edited');
        return;
    }

    var selectedFile = document.getElementById('edit-imageUpload').files[0];

    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function (event) {
            updateActivity(currentEditingActivityId, event.target.result);
            // closeEditModal();
        };
        reader.readAsDataURL(selectedFile);
    } else {
        updateActivity(currentEditingActivityId, activities.find(act => act.id === currentEditingActivityId).image);
        // closeEditModal();
    }

    closeEditModal();
    // Clear the file input field
    document.getElementById('edit-imageUpload').value = '';
});

function updateActivity(activityId, newImage) {
    var activityIndex = activities.findIndex(act => act.id === activityId);
    if (activityIndex !== -1) {
        activities[activityIndex].image = newImage;
        activities[activityIndex].title = document.getElementById('edit-activityName').value;
        activities[activityIndex].price = document.getElementById('edit-price').value;
        activities[activityIndex].location = document.getElementById('edit-location').value;
        activities[activityIndex].time = document.getElementById('edit-time').value;
        activities[activityIndex].additionalInfo = document.getElementById('edit-additionalInfo').value;
        refreshActivitiesDisplay();
    }
    // updateActivityCard(activityId);
}

function refreshActivitiesDisplay() {
    const activitiesGrid = document.getElementById('activitiesGrid');
    activitiesGrid.innerHTML = ''; // Clear the current content
    activities.forEach(activity => addActivityCard(activity));
}

// change color of the like button
// -----------------------------------------------------------------------------
document.getElementById('activitiesGrid').addEventListener('click', function (event) {
    // Check if the clicked element is a like button
    if (event.target.classList.contains('like-btn') || event.target.closest('.like-btn')) {
        const button = event.target.closest('.like-btn');
        let likeCountSpan = button.querySelector('.like-count');
        let likes = parseInt(likeCountSpan.textContent) || 0;

        if (button.classList.contains('like-btn-active')) {
            likes = Math.max(likes - 1, 0);
            button.classList.remove('like-btn-active');
            button.style.backgroundColor = '';
            console.log('like button unclicked');
        } else {
            likes++;
            button.classList.add('like-btn-active');
            // Set color to green when clicked
            button.style.backgroundColor = '#B2FBA5';
            // update html to show the number of likes and the color of the like button
            console.log('like button clicked');
        }

        likeCountSpan.textContent = likes;
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.like-btn').forEach(button => {
        let likes = parseInt(button.dataset.likes) || 0;
        let likeCountSpan = button.querySelector('.like-count');
        likeCountSpan.textContent = likes;
    }
    );
    activities.forEach(activity => addActivityCard(activity));
});
