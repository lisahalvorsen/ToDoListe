// Model
let tasks = [
    { description: 'Handle til middag', isDone: true, responsibility: 'Ole', deadline: '2024-04-15', completedDate: '2024-04-15' },
    { description: 'Vaske bad', isDone: false, responsibility: 'Petter', deadline: '2024-04-16', completedDate: '2024-04-19' },
    { description: 'Støvsuge kjøkken', isDone: false, responsibility: 'Lars', deadline: '2024-04-18', completedDate: '2024-04-23' },
];


// View
let tasksTable = document.getElementById('tasksTable');

updateView();

function updateView() {
    let html = /*HTML*/ `
    <tr>
        <th>Oppgave</th>
        <th>Gjort</th>
        <th>Ansvar</th>
        <th>Frist</th>
        <th>Gjort dato</th>
        <th></th>
    </tr>`

    for (let i = 0; i < tasks.length; i++) {
        html += createHtmlRow(i);
    }
    tasksTable.innerHTML = html;
}

function createHtmlRow(i) {
    const task = tasks[i];
    const checkedHtml = task.isDone ? 'checked="checked"' : '';

    if (!task.editMode) {
        return /*HTML*/ ` 
        <tr>
            <td>${task.description}</td>
            <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml}></td>
            <td>${task.responsibility}</td>
            <td><input type="date" value="${task.deadline}" disabled></td>
            <td><input type="date" value="${task.completedDate}" disabled></td>
            <td>
                <button onclick="deleteTask(${i})">Slett</button>
                <button onclick="editTask(${i})">Rediger</button>
            </td>
        </tr >
    `;
    } else {
        return /*HTML*/ ` 
        <tr>
            <td><input id="editDescription${i}" type="text" value="${task.description}"></td>
            <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml}></td>
            <td><input id="editResponsibility${i}" type="text" value="${task.responsibility}"></td>
            <td><input id="editDeadline${i}" type="date">${task.deadline}</td>
            <td><input id="editCompletedDate${i}" type="date" value="${task.completedDate}"></td>
            <td>
                <button onclick="updateTask(${i})">Lagre</button>
            </td>
        </tr >
    `;
    }
}

// Controller
function addTask() {
    let taskDescriptionInput = document.getElementById('taskDescription');
    let taskResponsibilityInput = document.getElementById('taskResponsibility');

    tasks.push(
        {
            description: taskDescriptionInput.value,
            isDone: false,
            responsibility: taskResponsibilityInput.value,
            deadline: '',
            completedDate: '',
        });
    taskDescriptionInput.value = '';
    taskResponsibilityInput.value = '';

    updateView();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateView();
}

function editTask(index) {
    tasks[index].editMode = !tasks[index].editMode;
    updateView();
}

function updateTask(index) {
    const descriptionId = /*HTML*/ `editDescription${index}`;
    const responsibilityId = /*HTML*/ `editResponsibility${index}`;
    const deadlineId = /*HTML*/ `editDeadline${index}`;
    const completedDateId = /*HTML*/ `editCompletedDate${index}`;

    const descriptionInput = document.getElementById(descriptionId);
    const responsibilityInput = document.getElementById(responsibilityId);
    const deadlineInput = document.getElementById(deadlineId);
    const completedDateInput = document.getElementById(completedDateId);

    const task = tasks[index];

    task.description = descriptionInput.value;
    task.responsibility = responsibilityInput.value;
    task.deadline = deadlineInput.value;
    task.completedDate = completedDateInput.value;

    task.editMode = false;

    updateView();
}

function changeIsDone(checkbox, index) {
    const task = tasks[index];
    task.isDone = checkbox.checked;

    // hvis oppgaven er markert med en checkmark, blir completedDate satt til nåværende dato
    if (task.isDone) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        task.completedDate = formattedDate;
    }

    updateView();
}