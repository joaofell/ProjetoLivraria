

const loadTablePublisher = () => {
    axios.get(`${ENDPOINT}/publishers`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                console.log(data)
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.City.name + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showPublisherEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="publishDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytablePublisher").innerHTML = trHTML;
            }
        })
};

loadTablePublisher();


const showPublisherCreateBox = async () => {
    const city = await showCityCreateCombo();
    Swal.fire({
        title: 'Create publisher',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="name">'+
            city,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publisherCreate();
        }
    });
}

const publisherCreate = () => {
    const name = document.getElementById("name").value;
    var select = document.getElementById('Select');
	var CityId = select.options[select.selectedIndex].value;

    axios.post(`${ENDPOINT}/publishers`, {
        name: name,
        CityId: CityId,

    })
        .then((response) => {
            Swal.fire(`publisher ${response.data.name} created`);
            loadTablePublisher();
        }, (error) => {
            Swal.fire(`Error to create publisher: ${error.response.data.error} `)
                .then(() => {
                    showPublisherCreateBox();
                })
        });
}

const getCity = () => {
    return axios.get(`${ENDPOINT}/cities/`);
}
const showCityCreateCombo = async (id) => {
    const states = await getCity();
    const data = states.data;
    var select = '<select class="swal2-input" id="Select">'
    data.forEach((element) => {
        select += `<option value='${element.id}'>'${element.name}'</option>` 
    })
    select += '</select>'
    return select;
    }

const getPublisher = (id) => {
    return axios.get(`${ENDPOINT}/publishers/`+ id);
}

const showPublisherEditBox = async (id) => {
    const user = await getPublisher(id);
    const data = user.data;
    Swal.fire({
        title: 'Edit Publisher',
        html:
        '<input id="id" type="hidden" value=' + data.id + '>' +
        '<input id="name" class="swal2-input" placeholder="name" value="' + data.name + '">'+
        '<input id="CityId" class="swal2-input" placeholder="CityId" value="' + data.CityId + '">',
        showCancelButton: true,
        preConfirm: () => {
            publisherEdit();
        }
    });
}

const publisherEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const CityId = document.getElementById("CityId").value;

    axios.put(`${ENDPOINT}/publishers/` + id, {
        name: name,
        CityId: CityId,
    })
        .then((response) => {
            Swal.fire(`publisher ${response.data.name} updated`);
            loadTablePublisher();
        }, (error) => {
            Swal.fire(`Error to update publisher: ${error.response.data.error} `)
                .then(() => {
                    showPublisherEditBox(id);
                })
        });
}


const publishDelete = async (id) => {
    const user = await getPublisher(id);
    const data = user.data;
    axios.delete(`${ENDPOINT}/publishers/` + id)
        .then((response) => {
            Swal.fire(`Publisher ${data.name} deleted`);
            loadTablePublisher();
        }, (error) => {
            Swal.fire(`Error to delete publisher: ${error.response.data.error} `);
            loadTablePublisher();
    });
};

