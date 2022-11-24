const tableName = "department";
const selector = document.querySelector('.id');
const table = document.querySelector('.tabletable');

let flag = false;
let newRows = "";

db = openDatabase("MyDB", "0.1", "department", 1024 * 10);
if (!db) {
    alert("Не удалось подключиться к базе данных.");
};



db.transaction((tx) => {          
    

    tx.executeSql("CREATE TABLE IF NOT EXISTS department ( id integer primary key autoincrement, title TEXT, fio TEXT, phone TEXT, naz TEXT, weight INTEGER);", []);
},
    tx => {
        console.log("Таблица создана");
        updateSelector();
    }
);

function updateSelector() {
    for (let i = selector.options.length; i >= 0; i--) {
        selector.remove(i);
    }
    db.transaction((tx) => {
        tx.executeSql('SELECT id FROM ' + tableName, [], function (tx, r) {
            for (let i = 0; i < r.rows.length; i++) {
                let j = r.rows.item(i)['id'];
                selector.options[selector.options.length] = new Option(j, j);
            }
        }, function (tx, e) {
            alert("Ошибка: " + e.message);
        });
    })
};

function updateTable() {

    const tableRef = document.querySelector(".tabletable");

    while (tableRef.rows.length > 1) {
        tableRef.deleteRow(1);
    }

    db.transaction(function (tx) {
        tx.executeSql(`SELECT * FROM department`, [], function (tx, result) {


            for (var i = 0; i < result.rows.length; i++) {
                let newRow = tableRef.insertRow(i + 1);

                if (flag) {
                    let newRowsCell = newRow.insertCell(0);
                    newRowsCell.innerHTML = result.rows.item(i)[newRows];
                }
                let weightCell = newRow.insertCell(0);
                let nazCell = newRow.insertCell(0);
                let phoneCell = newRow.insertCell(0);
                let fioCell = newRow.insertCell(0);
                let titleCell = newRow.insertCell(0);
                let idCell = newRow.insertCell(0);

                idCell.innerHTML = result.rows.item(i)['id'];
                titleCell.innerHTML = result.rows.item(i)['title'];
                fioCell.innerHTML = result.rows.item(i)['fio']
                phoneCell.innerHTML = result.rows.item(i)['phone']
                nazCell.innerHTML = result.rows.item(i)['naz']
                weightCell.innerHTML = result.rows.item(i)['weight']

            }
        }, null)
    });
    updateSelector();
};

document.querySelector('.but-add').addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value,
        fio = document.querySelector('#fio').value,
        phone = document.querySelector('#phone').value,
        naz = document.querySelector('#naz').value,
        weight = document.querySelector('#weight').value;

    if (flag) {
        const newRowsValue = document.getElementById(newRows).value;
        db.transaction(function (tx) {
            tx.executeSql("INSERT INTO department (title, fio, phone, naz, weight, " + newRows + ") values (?, ?, ?, ?, ?, ?)",
                [title, fio, phone, naz, weight, newRowsValue],
                function (tx, result) {
                    console.log("Запись добавлена.");
                },
                function (tx, error) {
                    console.log("Ошибка: " + error.message);
                });
        });
    } else {
        db.transaction(function (tx) {
            tx.executeSql("INSERT INTO department (title, fio, phone, naz, weight) values (?, ?, ?, ?, ?)",
                [title, fio, phone, naz, weight],
                function (tx, result) {
                    console.log("Запись добавлена.");
                },
                function (tx, error) {
                    console.log("Ошибка: " + error.message);
                });
        });
    }
    updateTable();
});

document.querySelector('.but-delete').addEventListener('click', () => {
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM department WHERE id=?`, [selector.value])
    },
        err => console.error("Невозможно удалить запись", err),
        tx => {
            console.log("Запись удалена, id= " + selector.value);
            updateTable();
        });
});

document.querySelector(".but-show").addEventListener('click', () => {
    updateTable();
});



document.querySelector(".but-modal").addEventListener('click', () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
});

document.querySelector(".modalClose").addEventListener('click', () => {
    newRows = document.querySelector("#modalText").value;

    db.transaction((tx) => {
        tx.executeSql(`ALTER TABLE department ADD ` + newRows + ` TEXT;`, [],
            (tx, result) => {
                err => console.error("Колонка не добавлена", err),
                    tx => {
                        console.log("Колонка:" + newRows + "успешно добавлена");
                    }
            })
    });
    const element = document.createElement('input');
    element.type = "text";
    element.id = newRows;
    element.placeholder = "Введите значение " + newRows;
    document.querySelector('.form1').appendChild(element);

    flag = true;

    const modal = document.querySelector(".modal");
    modal.style.display = "none";

    let tableRef = table.getElementsByTagName("tr");
    let newCell = document.createElement('th');
    newText = document.createTextNode(newRows);
    newCell.appendChild(newText);
    tableRef[0].appendChild(newCell);
});

document.querySelector(".butMinMax").addEventListener('click', () => {
    const tableRef = document.querySelector(".tabletable");

    while (tableRef.rows.length > 1) {
        tableRef.deleteRow(1);
    }
    db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM department ORDER BY weight`, [],
            (tx, result) => {
                let newRow = tableRef.insertRow(1);

                if (flag) {
                    let newRowsCell = newRow.insertCell(0);
                    newRowsCell.innerHTML = result.rows.item(0)[newRows];
                }
                let weightCell = newRow.insertCell(0);
                let nazCell = newRow.insertCell(0);
                let phoneCell = newRow.insertCell(0);
                let fioCell = newRow.insertCell(0);
                let titleCell = newRow.insertCell(0);
                let idCell = newRow.insertCell(0);

                idCell.innerHTML = result.rows.item(0)['id'];
                titleCell.innerHTML = result.rows.item(0)['title'];
                fioCell.innerHTML = result.rows.item(0)['fio']
                phoneCell.innerHTML = result.rows.item(0)['phone']
                nazCell.innerHTML = result.rows.item(0)['naz']
                weightCell.innerHTML = result.rows.item(0)['weight']


                let i = result.rows.length - 1;
                newRow = tableRef.insertRow(-1);

                if (flag) {
                    let newRowsCell = newRow.insertCell(0);
                    newRowsCell.innerHTML = result.rows.item(i)[newRows];
                }
                weightCell = newRow.insertCell(0);
                nazCell = newRow.insertCell(0);
                phoneCell = newRow.insertCell(0);
                fioCell = newRow.insertCell(0);
                titleCell = newRow.insertCell(0);
                idCell = newRow.insertCell(0);

                idCell.innerHTML = result.rows.item(i)['id'];
                titleCell.innerHTML = result.rows.item(i)['title'];
                fioCell.innerHTML = result.rows.item(i)['fio']
                phoneCell.innerHTML = result.rows.item(i)['phone']
                nazCell.innerHTML = result.rows.item(i)['naz']
                weightCell.innerHTML = result.rows.item(i)['weight']
            }, null)

        err => console.error("Не могу удалить запись!", err),
            tx => { console.log("Запись удалена! id=" + selector.value); }
    });
    table.style.display = "block";
});