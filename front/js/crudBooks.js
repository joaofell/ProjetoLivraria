const ENDPOINT = "http://localhost:3000";

const loadTableBook = () => {
    const title = document.getElementById("nameParams").value;
    const categoria = document.getElementById("select").value;
    console.log(categoria)
    axios.get(`${ENDPOINT}/books?title=${title}&CategoryId=${categoria}`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.title + '</td>';
                    trHTML += '<td>' + element.author + '</td>';
                    trHTML += '<td>' + element.publication_year + '</td>';
                    trHTML += '<td>' + element.pages + '</td>';
                    trHTML += '<td>' + element.Category.description + '</td>';
                    trHTML += '<td>' + element.Publisher.name + '</td>';
                    trHTML += '<td>' + element.Format.description + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showBookEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="bookDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytableBooks").innerHTML = trHTML;
            }
        })
};
loadTableBook();

const showBookCreateBox = async () => {
    const categories = await showCategoryCreateCombo();
    const publishers = await showPublishCreateCombo();
    const formats = await showFormatCreateCombo();
    Swal.fire({
        title: 'Create user',
        html:
            '<input id="id" type="hidden">' +
            '<input id="title" class="swal2-input" placeholder="title">' +
            '<input id="author" class="swal2-input" placeholder="author">' +
            '<input id="publication_year" class="swal2-input" placeholder="publication_year">' +
            '<input id="pages" class="swal2-input" placeholder="pages">' +
            categories +
            publishers+
            formats,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            bookCreate();
        }
    });
}

const bookCreate = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    var select = document.getElementById('Select1');
	var CategoryId = select.options[select.selectedIndex].value;
    var select = document.getElementById('Select2');
	var PublisherId = select.options[select.selectedIndex].value;
    var formats = document.getElementById('Select3');
	var FormatId = formats.options[select.selectedIndex].value;

    axios.post(`${ENDPOINT}/books`, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategoryId:CategoryId,
        PublisherId:PublisherId,
        FormatId:FormatId,
    })
        .then((response) => {
            Swal.fire(`Book ${response.data.title} created`);
            loadTableBook();
        }, (error) => {
            Swal.fire(`Error to create book: ${error.response.data.error} `)
                .then(() => {
                    showBookCreateBox();
                })
        });
}

const getBooks = (id) => {
    return axios.get(`${ENDPOINT}/books/` + id);
}

const bookDelete = async (id) => {
    const user = await getBooks(id);
    const data = user.data;
    axios.delete(`${ENDPOINT}/books/` + id)
        .then((response) => {
            Swal.fire(`User ${data.name} deleted`);
            loadTableBook();
        }, (error) => {
            Swal.fire(`Error to delete user: ${error.response.data.error} `);
            loadTableBook();
        });
};


const showBookEditBox = async (id) => {
    const user = await getBooks(id);
    const data = user.data;
    const categories = await showCategoryCreateCombo();
    const publishers = await showPublishCreateCombo();
    const formats = await showFormatCreateCombo();
    Swal.fire({
        title: 'Edit Book',
        html:
        '<input id="id" type="hidden" value=' + data.id + '>' +
        '<input id="title" class="swal2-input" placeholder="title" value="' + data.title + '">' +
        '<input id="author" class="swal2-input" placeholder="author" value="' + data.author + '">' +
        '<input id="publication_year" class="swal2-input" placeholder="publication_year" value="' + data.publication_year + '">' +
        '<input id="pages" class="swal2-input" placeholder="pages" value="' + data.pages + '">' + 
        categories+
        publishers+
        formats,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            bookEdit();
        }
    });
}

const bookEdit = () => {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    var select = document.getElementById('Select1');
	var CategoryId = select.options[select.selectedIndex].value;
    var select = document.getElementById('Select2');
	var PublisherId = select.options[select.selectedIndex].value;
    var formats = document.getElementById('Select3');
	var FormatId = formats.options[select.selectedIndex].value;

    axios.put(`${ENDPOINT}/books/` + id, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategoryId:CategoryId,
        PublisherId:PublisherId,
        FormatId:FormatId,
    })
        .then((response) => {
            Swal.fire(`User ${response.data.title} updated`);
            loadTableBook();
        }, (error) => {
            Swal.fire(`Error to update user: ${error.response.data.error} `)
                .then(() => {
                    showBookEditBox(id);
                })
        });
}

const getCategory = () => {
    return axios.get(`${ENDPOINT}/categories/`);
}

const showCategoryCreateCombo = async (id) => {
const categories = await getCategory();
const data = categories.data;
var select = '<select class="swal2-input" id="Select1">'
data.forEach((element) => {
    select += `<option value='${element.id}'>'${element.description}'</option>` 
})
select += '</select>'
return select;
}

const getpublisher = () => {
    return axios.get(`${ENDPOINT}/publishers/`);
}

const showPublishCreateCombo = async (id) => {
const publishers = await getpublisher();
const data = publishers.data;
var select = '<select class="swal2-input" id="Select2">'
data.forEach((element) => {
    select += `<option value='${element.id}'>'${element.name}'</option>` 
})
select += '</select>'
return select;
}


const getFormat = () => {
    return axios.get(`${ENDPOINT}/formats/`);
}

const showFormatCreateCombo = async (id) => {
const categories = await getFormat();
const data = categories.data;
var select = '<select class="swal2-input" id="Select3">'
data.forEach((element) => {
    select += `<option value='${element.id}'>'${element.description}'</option>` 
})
select += '</select>'
return select;
}

const select = async () => {
var select = document.getElementById("select");
const categories = await getCategory();
const data = categories.data;

for(let i = 0; i < data.length; i++) {
    var option = document.createElement("option")
    option.setAttribute('value', `${data[i].id}`);
    option.text = `${data[i].description}`
    select.add(option)
}
return select
}

const recarregar = async () => {
    document.location.reload(true);
}