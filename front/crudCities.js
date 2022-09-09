
const loadTableCities = () => {
    axios.get(`${ENDPOINT}/cities`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.StateId + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCityEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="cityDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytableCities").innerHTML = trHTML;
            }
        })
};

loadTableCities();


const showCityCreateBox = () => {
    Swal.fire({
        title: 'Create cities',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="name">'+
            '<input id="StateId" class="swal2-input" placeholder="StateId">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            cityCreate();
        }
    });
}

const cityCreate = () => {
    const name = document.getElementById("name").value;
    const StateId = document.getElementById("StateId").value;

    axios.post(`${ENDPOINT}/cities`, {
        name: name,
        StateId: StateId,

    })
        .then((response) => {
            Swal.fire(`city ${response.data.name} created`);
            loadTableCities();
        }, (error) => {
            Swal.fire(`Error to create cities: ${error.response.data.error} `)
                .then(() => {
                    showCityCreateBox();
                })
        });
}

const getCities = (id) => {
    return axios.get(`${ENDPOINT}/cities/` + id);
}

const cityDelete = async (id) => {
    const user = await getCities(id);
    const data = user.data;
    axios.delete(`${ENDPOINT}/cities/` + id)
    .then((response) => {
        Swal.fire(`city ${data.name} deleted`);
        loadTableCities();
    }, (error) => {
        Swal.fire(`Error to delete city: ${error.response.data.error} `);
        loadTableCities();
    });
};


const showCityEditBox = async (id) => {
    const user = await getCities(id);
    const data = user.data;
    Swal.fire({
        title: 'Edit City',
        html:
        '<input id="id" type="hidden" value=' + data.id + '>' +
        '<input id="name" class="swal2-input" placeholder="name" value="' + data.name + '">'+
        '<input id="StateId" class="swal2-input" placeholder="StateId" value="' + data.StateId + '">',
        showCancelButton: true,
        preConfirm: () => {
            cityEdit();
        }
    });
}

const cityEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const StateId = document.getElementById("StateId").value;

    axios.put(`${ENDPOINT}/cities/` + id, {
        name: name,
        StateId: StateId,
    })
        .then((response) => {
            Swal.fire(`city ${response.data.name} updated`);
            loadTableCities();
        }, (error) => {
            Swal.fire(`Error to update city: ${error.response.data.error} `)
                .then(() => {
                    showCityEditBox(id);
                })
        });
}