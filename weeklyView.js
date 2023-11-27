const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = ["7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
    "11:00 PM", "11:30 PM", "12:00 AM"];
const weekDates = ["06/03/2024", "06/04/2024", "06/05/2024", "06/06/2024", "06/07/2024", "06/08/2024", "06/09/2024"];

let scheduleActivities = [
    {
        name: "Beach Volleyball",
        price: "$15",
        location: "Florida Beach",
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        date: "06/03/2024"
    },
    {
        name: "Guided City Tour",
        price: "$30",
        location: "Downtown",
        startTime: "1:00 PM",
        endTime: "4:00 PM",
        date: "06/04/2024"
    },
    {
        name: "Landmark",
        price: "$50",
        location: "Downtown",
        startTime: "7:00 PM",
        endTime: "9:00 PM",
        date: "06/07/2024"
    },
    // Add more activities as needed
];

function createSchedule() {
    const scheduleContainer = document.getElementById('scheduleContainer');
    scheduleContainer.innerHTML = ''; // Clear existing content

    // Create the header row for days with dates
    const headerRow = document.createElement('tr');
    headerRow.appendChild(createCell('Time', true)); // Time label
    weekDates.forEach((date, index) => {
        headerRow.appendChild(createCell(`${days[index]}<br>${date}`, true)); // Day labels with dates
    });
    scheduleContainer.appendChild(headerRow);

    // Create rows for each time slot
    times.forEach(time => {
        const timeRow = document.createElement('tr');
        timeRow.appendChild(createCell(time, false)); // Time label

        days.forEach(() => {
            timeRow.appendChild(createCell('', false)); // Empty cells for each day and time
        });

        scheduleContainer.appendChild(timeRow);
    });
}

function createCell(content, isHeader) {
    const cell = document.createElement(isHeader ? 'th' : 'td');
    cell.innerHTML = content;
    return cell;
}

// This utility function converts 12-hour time format to a Date object on today's date
function timeStringToDate(timeString) {
    const [timePart, period] = timeString.split(' ');
    let [hours, minutes] = timePart.split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (hours === 12) hours = 0; // Convert "12" to "0"
    if (period === 'PM') hours += 12; // Convert to 24-hour time

    // Create a new date object with the time set to the hours and minutes
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

function populateScheduleWithActivities() {
    // First, clear any existing activities in the schedule
    clearScheduleActivities(); 


    scheduleActivities.forEach(activity => {
        // Working version
        const activityDate = new Date(activity.date);
        const activityStart = timeStringToDate(activity.startTime);
        const activityEnd = timeStringToDate(activity.endTime);

        // Determine the correct day column and time rows for the activity
        const dayColumnIndex = days.indexOf(activityDate.toLocaleDateString('en-us', { weekday: 'long' }));
        const startRowIndex = times.findIndex(time => time === activity.startTime);
        const endRowIndex = times.findIndex(time => time === activity.endTime);

        // Find the correct cell in the schedule and add the activity
        const rows = document.getElementById('scheduleContainer').getElementsByTagName('tr');
        const cell = rows[startRowIndex + 1].getElementsByTagName('td')[dayColumnIndex + 1];
        cell.rowSpan = endRowIndex - startRowIndex;
        cell.classList.add('has-activity');
        cell.innerHTML = `     
            <strong>${activity.name}</strong><br>
            ${activity.location}<br>
            ${activity.price}
            <button onclick="editActivity('${activity.name.replace(/'/g, "\\'")}')" class="btn btn-sm btn-outline-secondary edit-cell-btn">Edit</button>
        `;

        // Set a random background color for the activity
        // cell.style.backgroundColor = getRandomColor();

        // Hide cells that are covered by the rowspan
        for (let i = startRowIndex + 1; i < endRowIndex; i++) {
            const row = rows[i + 1];
            if (row) {
                const cellToHide = row.getElementsByTagName('td')[dayColumnIndex + 1];
                if (cellToHide) {
                    cellToHide.style.display = 'none';
                }
            }
        }
    });
}

function clearScheduleActivities() {
    const scheduleTable = document.getElementById('scheduleContainer');

    if (!scheduleTable) {
        console.error('Schedule table not found');
        return;
    }

    // Loop through each row in the table
    const rows = scheduleTable.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) { // Starting from 1 to skip the header row
        const cells = rows[i].getElementsByTagName('td');

        // Reset each cell in the row
        for (let j = 1; j < cells.length; j++) { // Starting from 1 to skip the time label cell
            cells[j].innerHTML = ''; // Clear the cell's content
            cells[j].removeAttribute('style'); // Remove any inline styles
            cells[j].removeAttribute('rowspan'); // Remove rowspan attribute if any
            cells[j].classList.remove('has-activity'); // Remove the 'has-activity' class if it's there
            cells[j].style.display = ''; // Reset any display styles
        }
    }
}


// -------------------- Handel add to schedule button --------------------
// Function to open the modal
function openScheduleModal() {
    const modal = document.getElementById('addModalSchedule');
    modal.style.display = 'block';
}

// Function to add a single new activity to the visual schedule
function addActivityToSchedule(newActivity) {
    // First, convert the start and end times to Date objects
    const activityStart = timeStringToDate(newActivity.startTime);
    const activityEnd = timeStringToDate(newActivity.endTime);
    const activityDay = new Date(newActivity.date).toLocaleDateString('en-us', { weekday: 'long' }).toLowerCase();

    // Find the start and end time index
    const startSlotIndex = times.findIndex(time => timeStringToDate(time) >= activityStart);
    const endSlotIndex = times.findIndex(time => timeStringToDate(time) >= activityEnd);

    // Calculate the number of slots the activity will take up
    const rowspan = endSlotIndex - startSlotIndex;

    // Determine the column for the day of the week
    const dayColumnIndex = days.findIndex(day => day.toLowerCase() === activityDay);

    if (rowspan > 0) {
        // Find the correct row and cell in the table to insert the activity
        const rows = document.getElementById('scheduleContainer').getElementsByTagName('tr');
        const cell = rows[startSlotIndex + 1].getElementsByTagName('td')[dayColumnIndex + 1]; // +1 for the time label column
        cell.rowSpan = rowspan;
        cell.classList.add('has-activity');
        cell.innerHTML = `
            <strong>${newActivity.name}</strong><br>
            ${newActivity.location}<br>
            ${newActivity.price}
        `;

        // // Apply a random background color
        // cell.style.backgroundColor = getRandomColor();

        // Remove cells that are now covered by the rowspan
        for (let i = 1; i < rowspan; i++) {
            const rowToClean = rows[startSlotIndex + 1 + i];
            if (rowToClean && rowToClean.cells.length > dayColumnIndex + 1) {
                rowToClean.deleteCell(dayColumnIndex + 1); // +1 for the time label column
            }
        }
    }
}


// Function to handle form submission and add activity to the schedule
function handleFormSubmission() {
    const form = document.getElementById('tripFormSchedule');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Retrieve values from the form inputs
        var activityName = document.getElementById('activityNameSchedule').value;
        var price = document.getElementById('priceSchedule').value;
        var location = document.getElementById('locationSchedule').value;
        var startTime = document.getElementById('startTime').value;
        var endTime = document.getElementById('endTime').value;
        var activityDate = document.getElementById('activityDate').value;

        // Log the values for debugging
        console.log('Form Values:', { activityName, price, location, startTime, endTime, activityDate });

        // Convert the date format to MM/DD/YYYY
        var formattedDate = formatDateForActivity(activityDate);

        // Create a new activity object
        var newActivity = {
            name: activityName,
            price: price,
            location: location,
            startTime: startTime,
            endTime: endTime,
            date: formattedDate
        };

        // Log the new activity for debugging
        console.log('New Activity:', newActivity);

        // Add the new activity to the array of activities
        scheduleActivities.push(newActivity);

        // Call function to update the visual schedule
        createSchedule();
        populateScheduleWithActivities();

        // Optionally, reset the form fields
        form.reset();

        // Close the modal
        document.getElementById('addModalSchedule').style.display = 'none';
    });
}

// Function to close the "Add to Schedule" form
function closeAddScheduleModal() {
    var modal = document.getElementById('addModalSchedule');
    if (modal) {
        modal.style.display = 'none';
    }
}

document.querySelector('.close.add.schedule').addEventListener('click', closeAddScheduleModal);


// -------------------- Handel edit each activity from schedule --------------------
// Function to open the edit modal and populate it with the activity's data
function editActivity(activityName) {
    // Find the activity by name
    const activity = scheduleActivities.find(a => a.name === activityName);
    const deleteButton = document.getElementById('deleteActivityBtn');

    if (!activity) {
        console.error('Activity not found:', activityName);
        return;
    }

    // Set the activity name to the delete button
    deleteButton.setAttribute('data-activity-name', encodeURIComponent(activityName));

    // Format the date as YYYY-MM-DD for the date input field
    const dateForInput = formatDateForInput(activity.date);

    // Populate the form with the activity's data
    document.getElementById('editActivityName').value = activity.name;
    document.getElementById('editPrice').value = activity.price;
    document.getElementById('editLocation').value = activity.location;
    document.getElementById('editStartTime').value = activity.startTime;
    document.getElementById('editEndTime').value = activity.endTime;
    document.getElementById('editActivityDate').value = dateForInput;

    // Open the modal
    const modal = document.getElementById('editModalSchedule');
    modal.style.display = 'block';
}

function formatDateForInput(dateString) {
    const [month, day, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Attach this function to each 'Edit' button when creating the schedule
function attachEditButtonEvents() {
    scheduleActivities.forEach(activity => {
        // Assuming the edit button is part of the cell content and has a unique data attribute
        const editButtons = document.querySelectorAll(`button[data-activity-name='${activity.name}']`);
        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                editActivity(activity.name);
            });
        });
    });
}

function deleteScheduleActivity() {
    const deleteButton = document.getElementById('deleteActivityBtn');
    const activityName = decodeURIComponent(deleteButton.getAttribute('data-activity-name'));

    // Find and remove the activity from the array
    const activityIndex = scheduleActivities.findIndex(a => a.name === activityName);
    if (activityIndex !== -1) {
        scheduleActivities.splice(activityIndex, 1);

        // Re-render the schedule
        createSchedule();
        populateScheduleWithActivities();

        // Close the modal
        const modal = document.getElementById('editModalSchedule');
        modal.style.display = 'none';
    }
}


// Function to handle the submission of the edit form
function submitEditFormSchedule() {
    // Retrieve updated values from the edit form
    var editedName = document.getElementById('editActivityName').value;
    var editedPrice = document.getElementById('editPrice').value;
    var editedLocation = document.getElementById('editLocation').value;
    var editedStartTime = document.getElementById('editStartTime').value;
    var editedEndTime = document.getElementById('editEndTime').value;
    var editedDate = document.getElementById('editActivityDate').value;

    // Convert the date format to MM/DD/YYYY
    var formattedDate = formatDateForActivity(editedDate);

    const deleteButton = document.getElementById('deleteActivityBtn');
    const originalName = decodeURIComponent(deleteButton.getAttribute('data-activity-name'));

    // Find the activity in the scheduleActivities array
    var activity = scheduleActivities.find(a => a.name === originalName);
    if (activity) {
        // Update the activity information
        activity.name = editedName;
        activity.price = editedPrice;
        activity.location = editedLocation;
        activity.startTime = editedStartTime;
        activity.endTime = editedEndTime;
        activity.date = formattedDate;

        // Re-render the schedule
        createSchedule();
        populateScheduleWithActivities();
    }

    // Close the modal
    const modal = document.getElementById('editModalSchedule');
    modal.style.display = 'none';
}

// function formatDateForActivity(dateString) {
//     const [year, month, day] = dateString.split('-');
//     return `${month}/${day}/${year}`;
// }

// Utility function to format the date in MM/DD/YYYY format
function formatDateForActivity(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
}

// Function to close the edit modal
function closeEditModalSchedule() {
    const modal = document.getElementById('editModalSchedule');
    modal.style.display = 'none';
}





// Ensure this is called after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    createSchedule();
    populateScheduleWithActivities();
    attachEditButtonEvents();
    handleFormSubmission(); // Attach the event handler for the form submission
});

// Event listener for the "Add To Schedule" button
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-btn-schedule');
    addButton.addEventListener('click', openScheduleModal);
    const deleteButton = document.getElementById('deleteActivityBtn');
    deleteButton.addEventListener('click', deleteScheduleActivity);
    const editForm = document.getElementById('editFormSchedule');
    editForm.addEventListener('submit', submitEditFormSchedule);
});