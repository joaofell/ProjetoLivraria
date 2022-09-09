const ENDPOINT = "http://localhost:3000";

const loadTableBook = () => {
    axios.get(`${ENDPOINT}/books`)
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
                    trHTML += '<td>' + element.CategoryId + '</td>';
                    trHTML += '<td>' + element.PublisherId + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showBookEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="bookDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytableBooks").innerHTML = trHTML;
            }
        })
};

loadTableBook();

const showBookCreateBox = () => {
    Swal.fire({
        title: 'Create user',
        html:
            '<input id="id" type="hidden">' +
            '<input id="title" class="swal2-input" placeholder="title">' +
            '<input id="author" class="swal2-input" placeholder="author">' +
            '<input id="publication_year" class="swal2-input" placeholder="publication_year">' +
            '<input id="pages" class="swal2-input" placeholder="pages">' +
            '<input id="CategoryId" class="swal2-input" placeholder="CategoryId">' +
            '<input id="PublisherId" class="swal2-input" placeholder="PublisherId">',
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
    const CategoryId = document.getElementById("CategoryId").value;
    const PublisherId = document.getElementById("PublisherId").value;

    axios.post(`${ENDPOINT}/books`, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategoryId:CategoryId,
        PublisherId:PublisherId,
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
    Swal.fire({
        title: 'Edit Book',
        html:
        '<input id="id" type="hidden" value=' + data.id + '>' +
        '<input id="title" class="swal2-input" placeholder="title" value="' + data.title + '">' +
        '<input id="author" class="swal2-input" placeholder="author" value="' + data.author + '">' +
        '<input id="publication_year" class="swal2-input" placeholder="publication_year" value="' + data.publication_year + '">' +
        '<input id="pages" class="swal2-input" placeholder="pages" value="' + data.pages + '">' + 
        '<input id="CategoryId" class="swal2-input" placeholder="CategoryId" value="' + data.CategoryId + '">'+
        '<input id="PublisherId" class="swal2-input" placeholder="PublisherId" value="' + data.PublisherId + '">',
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
    const CategoryId = document.getElementById("CategoryId").value;
    const PublisherId = document.getElementById("PublisherId").value;

    axios.put(`${ENDPOINT}/books/` + id, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategoryId:CategoryId,
        PublisherId:PublisherId,
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


