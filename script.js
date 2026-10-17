
const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const search = document.getElementById("search");
const count = document.getElementById("count");
const submitBtn = document.getElementById("submitBtn");

let students = [];
let editIndex = -1;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const regno = document.getElementById("regno").value.trim();
    const department = document.getElementById("department").value.trim();
    const marks = Number(document.getElementById("marks").value);

    if (!name || !regno || !department ||
        marks < 0 || marks > 100 ||
        document.getElementById("marks").value === "") {
        alert("Please enter valid student details.");
        return;
    }

    const duplicate = students.some((student, index) =>
        student.regno.toLowerCase() === regno.toLowerCase()
        && index !== editIndex
    );

    if (duplicate) {
        alert("Register number already exists.");
        return;
    }

    const student = { name, regno, department, marks };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
        submitBtn.textContent = "Add Student";
    }

    form.reset();
    displayStudents();
});

function displayStudents() {
    studentList.replaceChildren();

    const query = search.value.trim().toLowerCase();

    students.forEach((student, index) => {
        if (
            !student.name.toLowerCase().includes(query) &&
            !student.regno.toLowerCase().includes(query)
        ) {
            return;
        }

        const row = document.createElement("tr");

        [student.name, student.regno, student.department, student.marks]
            .forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actions = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.addEventListener("click", () => editStudent(index));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.addEventListener("click", () => deleteStudent(index));

        actions.append(editBtn, deleteBtn);
        row.appendChild(actions);
        studentList.appendChild(row);
    });

    count.textContent = "Total Students: " + students.length;
}

function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("regno").value = student.regno;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;

    editIndex = index;
    submitBtn.textContent = "Update Student";
    document.getElementById("name").focus();
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);

        if (editIndex === index) {
            editIndex = -1;
            form.reset();
            submitBtn.textContent = "Add Student";
        } else if (editIndex > index) {
            editIndex--;
        }

        displayStudents();
    }
}

search.addEventListener("input", displayStudents);

displayStudents();
