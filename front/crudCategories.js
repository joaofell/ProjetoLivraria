
const loadTablecategories = () => {
    axios.get(`${ENDPOINT}/categories`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.description + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCategoryEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="categoryDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytableCategories").innerHTML = trHTML;
            }
        })
};
loadTablecategories();


const showCategoryCreateBox = () => {
    Swal.fire({
        title: 'Create category',
        html:
            '<input id="id" type="hidden">' +
            '<input id="description" class="swal2-input" placeholder="description">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            categoryCreate();
        }
    });
}

const categoryCreate = () => {
    const description = document.getElementById("description").value;

    axios.post(`${ENDPOINT}/categories`, {
        description: description,

    })
        .then((response) => {
            Swal.fire(`category ${response.data.description} created`);
            loadTablecategories();
        }, (error) => {
            Swal.fire(`Error to create book: ${error.response.data.error} `)
                .then(() => {
                    showCategoryCreateBox();
                })
        });
}

const getCategory = (id) => {
    return axios.get(`${ENDPOINT}/categories/` + id);
}

const categoryDelete = async (id) => {
    const user = await getCategory(id);
    const data = user.data;
    axios.delete(`${ENDPOINT}/categories/` + id)
    .then((response) => {
        Swal.fire(`Publisher ${data.description} deleted`);
        loadTablecategories();
    }, (error) => {
        Swal.fire(`Error to delete publisher: ${error.response.data.error} `);
        loadTablecategories();
    });
};

const showCategoryEditBox = async (id) => {
    const user = await getCategory(id);
    const data = user.data;
    Swal.fire({
        title: 'Edit Book',
        html:
        '<input id="id" type="hidden" value=' + data.id + '>' +
        '<input id="description" class="swal2-input" placeholder="description" value="' + data.description + '">',
        showCancelButton: true,
        preConfirm: () => {
            categoryEdit();
        }
    });
}

const categoryEdit = () => {
    const id = document.getElementById("id").value;
    const description = document.getElementById("description").value;

    axios.put(`${ENDPOINT}/categories/` + id, {
        description: description,
    })
        .then((response) => {
            Swal.fire(`User ${response.data.name} updated`);
            loadTablecategories();
        }, (error) => {
            Swal.fire(`Error to update user: ${error.response.data.error} `)
                .then(() => {
                    showCategoryEditBox(id);
                })
        });
}