
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
                    trHTML += '<td>' + element.State.name + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCityEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="cityDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytableCities").innerHTML = trHTML;
            }
        })
};

loadTableCities();


const showCityCreateBox = async () => {
    const state = await showStateCreateCombo();
    Swal.fire({
        title: 'Create cities',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="name">'+
             state,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            cityCreate();
        }
    });
}

const getState = () => {
    return axios.get(`${ENDPOINT}/states/`);
}

const showStateCreateCombo = async (id) => {
const states = await getState();
const data = states.data;
var select = '<select class="swal2-input" id="Select">'
data.forEach((element) => {
    select += `<option value='${element.id}'>'${element.name}'</option>` 
})
select += '</select>'
return select;
}


const cityCreate = () => {
    const name = document.getElementById("name").value;

    var select = document.getElementById('Select');
	var StateId = select.options[select.selectedIndex].value;

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
    const stateEdit = await showStateCreateCombo();
    Swal.fire({
        title: 'Edit City',
        html:
        '<input id="id" type="hidden" value=' + data.id + '>' +
        '<input id="name" class="swal2-input" placeholder="name" value="' + data.name + '">'+
        stateEdit,
        showCancelButton: true,
        preConfirm: () => {
            cityEdit();
        }
    });
}

const cityEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;

    var select = document.getElementById('Select');
	const StateId = select.options[select.selectedIndex].value;

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