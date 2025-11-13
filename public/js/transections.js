const myModal = new bootstrap.Modal("#transection-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
  transections: []
};

document.getElementById("button-logout").addEventListener("click", logout);


//Adicionar lançamento
document.getElementById("transection-form").addEventListener("submit", function(e){
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  data.transections.unshift({
    value: value, type: type, description: description, date: date
  });
  
  saveData(data);
  e.target.reset();
  myModal.hide();

  getTransections();

  alert("Lançamento adicionado com sucesso");

});


checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
      data = JSON.parse(dataUser);
    }

    getTransections();
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

function getTransections() {
  const transections = data.transections;
  let transectionsHtml = ``;

  if(transections.length) {
    transections.forEach((item) => {
      let type = "Entrada";

      if(item.type === "2") {
        type = "Saída";
      }

      transectionsHtml += `
      <tr>
          <th scope="row">${item.date}</th>
          <td>${item.value.toFixed(2)}</td>
          <td>${type}</td>
          <td>${item.description}</td>
      </tr>
      `;
    })

  }

  document.getElementById("transections-list").innerHTML = transectionsHtml;
}


function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}