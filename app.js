document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('studentForm').addEventListener('submit', addStudent);

    let selectedRow = null;
    loadFromLocalStorage(); // Load data from local storage when the page loads

    function addStudent(e) {
        e.preventDefault();

        const formData = readFormData();
        if (selectedRow === null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        resetForm();
        saveToLocalStorage(); // Save data to local storage after adding/updating
    }

    function readFormData() {
        const formData = {};
        formData["name"] = document.getElementById("name").value;
        formData["class"] = document.getElementById("class").value;
        formData["address"] = document.getElementById("address").value;
        formData["contact"] = document.getElementById("contact").value;
        return formData;
    }

    function insertNewRecord(data) {
        const table = document.getElementById("studentList");
        const newRow = table.insertRow(table.length);

        const cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.name;

        const cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.class;

        const cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.address;

        const cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.contact;

        const cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<a onClick="onEdit(this)" class="text-indigo-600 hover:text-indigo-900 cursor-pointer">Edit</a> | 
                           <a onClick="onDelete(this)" class="text-red-600 hover:text-red-900 cursor-pointer">Delete</a>`;
    }

    function updateRecord(formData) {
        selectedRow.cells[0].innerHTML = formData.name;
        selectedRow.cells[1].innerHTML = formData.class;
        selectedRow.cells[2].innerHTML = formData.address;
        selectedRow.cells[3].innerHTML = formData.contact;
    }

    function resetForm() {
        document.getElementById("name").value = "";
        document.getElementById("class").value = "";
        document.getElementById("address").value = "";
        document.getElementById("contact").value = "";
        selectedRow = null;
    }

    window.onEdit = function (td) {
        selectedRow = td.parentElement.parentElement;
        document.getElementById("name").value = selectedRow.cells[0].innerHTML;
        document.getElementById("class").value = selectedRow.cells[1].innerHTML;
        document.getElementById("address").value = selectedRow.cells[2].innerHTML;
        document.getElementById("contact").value = selectedRow.cells[3].innerHTML;
    };

    window.onDelete = function (td) {
        if (confirm('Are you sure you want to delete this record?')) {
            const row = td.parentElement.parentElement;
            row.remove();
            resetForm();
            saveToLocalStorage(); // Save data to local storage after deletion
        }
    };

    function saveToLocalStorage() {
        const table = document.getElementById("studentList");
        const students = [];
        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            const student = {
                name: row.cells[0].innerHTML,
                class: row.cells[1].innerHTML,
                address: row.cells[2].innerHTML,
                contact: row.cells[3].innerHTML
            };
            students.push(student);
        }
        localStorage.setItem('students', JSON.stringify(students));
    }

    function loadFromLocalStorage() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        for (const student of students) {
            insertNewRecord(student);
        }
    }
});
