const main = document.getElementById('main');
const tbody = document.getElementById('tbody');

let tasks = ['Learn HTML', 'Learn CSS'];
let done = [true, false];

const renderTodoTable = () => {
    tbody.innerHTML = '';
    tasks.forEach((element, index) => {
        const taskHtml = 
            `<tr id="tr_${index}">
                <td>
                    <div id="task_${index}">${element}</div>
                </td>
                <td>
                    <div class="checkbox-wrapper text-center">
                        <input id="done_${index}" class="done" type="checkbox">
                    </div>
                </td>
                <td>
                    <button id="delete_${index}" class="delete button btn-danger">Delete</button>
                </td>
            </tr>`;
        tbody.innerHTML += taskHtml;
    });
    checkIfDone();
}

const checkIfDone = () => {
    const doneCheckbox = document.getElementsByClassName('done');
    Array.from(doneCheckbox).forEach((element, index) => {
        if(done[index]) {
            element.checked = true;
            const task = document.getElementById(`task_${index}`);
            task.style.textDecoration = 'line-through';
        } else {
            element.checked = false;
            const task = document.getElementById(`task_${index}`);
            task.style.textDecoration = 'none';
        }
    });
}

renderTodoTable();

const deleteEvent = () => {
    const deleteButtons = document.getElementsByClassName('delete');
    Array.from(deleteButtons).forEach(element => {
        element.addEventListener('click', function(event) {
            let idClicked = event.target.id.split('_')[1];
            tasks.splice(idClicked, 1);
            done.splice(idClicked, 1);
            renderTodoTable();
            deleteEvent();
        });
    });
}

deleteEvent();

const doneEvent = () => {
    const doneCheckbox = document.getElementsByClassName('done');
    Array.from(doneCheckbox).forEach(element => {
        element.addEventListener('change', function(event) {
            done[parseInt(event.target.id.split('_')[1])] = event.target.checked;
            checkIfDone();
        });
    });
}

doneEvent();

const add_button = document.getElementById('add-button');
add_button.addEventListener('click', () => {
    let newTodo = prompt("Enter new todo");
    if(newTodo) {
        tasks.push(newTodo);
        done.push(false);
        renderTodoTable();
        deleteEvent();
        doneEvent();
    } else {
        alert("No input given!")
    }
});

