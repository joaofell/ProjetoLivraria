
const loadTableStates = () => {
    axios.get(`${ENDPOINT}/states`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.province + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showStateEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="stateDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytableStates").innerHTML = trHTML;
            }
        })
};

loadTableStates();

const showStatesCreateBox = () => {
    Swal.fire({
        title: 'Create States',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="name">'+
            '<input id="province" class="swal2-input" placeholder="province">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            stateCreate();
        }
    });
}

const stateCreate = () => {
    const name = document.getElementById("name").value;
    const province = document.getElementById("province").value;

    axios.post(`${ENDPOINT}/states`, {
        name: name,
        province: province,

    })
        .then((response) => {
            Swal.fire(`state ${response.data.name} created`);
            loadTableStates();
        }, (error) => {
            Swal.fire(`Error to create states: ${error.response.data.error} `)
                .then(() => {
                    showStatesCreateBox();
                })
        });
}

const getStates = (id) => {
    return axios.get(`${ENDPOINT}/states/` + id);
}

const stateDelete = async (id) => {
    const user = await getStates(id);
    const data = user.data;
    axios.delete(`${ENDPOINT}/states/` + id)
    .then((response) => {
        Swal.fire(`state ${data.name} deleted`);
        loadTableStates();
    }, (error) => {
        Swal.fire(`Error to delete state: ${error.response.data.error} `);
        loadTableStates();
    });
};


const showStateEditBox = async (id) => {
    const user = await getStates(id);
    const data = user.data;
    Swal.fire({
        title: 'Edit State',
        html:
        '<input id="id" type="hidden" value=' + data.id + '>' +
        '<input id="name" class="swal2-input" placeholder="name" value="' + data.name + '">'+
        '<input id="province" class="swal2-input" placeholder="province" value="' + data.province + '">',
        showCancelButton: true,
        preConfirm: () => {
            stateEdit();
        }
    });
}

const stateEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const province = document.getElementById("province").value;

    axios.put(`${ENDPOINT}/states/` + id, {
        name: name,
        province: province,
    })
        .then((response) => {
            Swal.fire(`State ${response.data.name} updated`);
            loadTableStates();
        }, (error) => {
            Swal.fire(`Error to update state: ${error.response.data.error} `)
                .then(() => {
                    showStateEditBox(id);
                })
        });
}