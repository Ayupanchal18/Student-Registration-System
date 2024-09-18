document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements
    const form = document.getElementById('studentForm');
    const table = document.getElementById('studentList');
    let selectedRow = null;

    // Event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); //to Prevent the default form submission

        const formData = readFormData(); // Get form data

        // Check if a row is selected for editing
        if (selectedRow === null) {
            insertNewRecord(formData); // Insert new record if no row is selected
        } else {
            updateRecord(formData); // Update the existing record
        }

        resetForm(); // Clear the form fields
        saveToLocalStorage(); // Save data to local storage
    });

    // Function to read form data
    function readFormData() {
        return {
            name: document.getElementById('name').value,
            class: document.getElementById('class').value,
            address: document.getElementById('address').value,
            contact: document.getElementById('contact').value
        };
    }

    // Function to insert a new record into the table
    function insertNewRecord(data) {
        const newRow = table.insertRow(); // Insert a new row at the end of the table

        // Insert cells into the new row and set their content
        const cell1 = newRow.insertCell(0);
        cell1.textContent = data.name;

        const cell2 = newRow.insertCell(1);
        cell2.textContent = data.class;

        const cell3 = newRow.insertCell(2);
        cell3.textContent = data.address;

        const cell4 = newRow.insertCell(3);
        cell4.textContent = data.contact;

        // Add action buttons in the last cell
        const cell5 = newRow.insertCell(4);
        cell5.innerHTML = `
            <a href="#" onclick="onEdit(this)" class="text-indigo-600 hover:text-indigo-900 cursor-pointer">Edit</a> |
            <a href="#" onclick="onDelete(this)" class="text-red-600 hover:text-red-900 cursor-pointer">Delete</a>
        `;
    }

    // Function to update an existing record
    function updateRecord(data) {
        // Update the cells in the selected row
        selectedRow.cells[0].textContent = data.name;
        selectedRow.cells[1].textContent = data.class;
        selectedRow.cells[2].textContent = data.address;
        selectedRow.cells[3].textContent = data.contact;
    }

    // Function to reset the form fields
    function resetForm() {
        document.getElementById('name').value = '';
        document.getElementById('class').value = '';
        document.getElementById('address').value = '';
        document.getElementById('contact').value = '';
        selectedRow = null; // Deselect the row
    }

    // Function to handle the Edit button click
    window.onEdit = function (link) {
        selectedRow = link.closest('tr'); // Find the closest table row
        // Populate form fields with data from the selected row
        document.getElementById('name').value = selectedRow.cells[0].textContent;
        document.getElementById('class').value = selectedRow.cells[1].textContent;
        document.getElementById('address').value = selectedRow.cells[2].textContent;
        document.getElementById('contact').value = selectedRow.cells[3].textContent;
    };

    // Function to handle the Delete button click
    window.onDelete = function (link) {
        if (confirm('Are you sure you want to delete this record?')) {
            // Remove the selected row from the table
            const row = link.closest('tr');
            row.remove();
            resetForm(); // Clear the form fields
            saveToLocalStorage(); // Save data to local storage
        }
    };

    // Function to save data to local storage
    function saveToLocalStorage() {
        const students = [];
        // Loop through all table rows and collect data
        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            const student = {
                name: row.cells[0].textContent,
                class: row.cells[1].textContent,
                address: row.cells[2].textContent,
                contact: row.cells[3].textContent
            };
            students.push(student);
        }
        localStorage.setItem('students', JSON.stringify(students)); // Save to local storage
    }

    // Function to load data from local storage
    function loadFromLocalStorage() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        // Insert each student record into the table
        students.forEach(student => insertNewRecord(student));
    }

    // Load data from local storage when the page loads
    loadFromLocalStorage();
});
