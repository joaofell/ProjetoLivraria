
const ENDPOINT = "http://localhost:3000";


const verificarLogin = () => {

       const email = document.getElementById("email").value;
       const password = document.getElementById("senha").value;

     axios.get(`${ENDPOINT}/users?email=${email}&password=${password}`)
     .then((response) => {
        if (response.data.length == 1) {
            window.location.href = "menu.html";
            return true;
        }
        else
        {
            return false;
        }
     })
    }
