const nameInput = document.getElementsByName("PIB");

function validateForm() {
  let formFields = document.forms["userForm"];

  for (let i = 0; i < formFields.length; i++) {
    formFields[i].style.backgroundColor = "none";
  }
  let pib = document.forms["userForm"]["PIB"].value;
  let group = document.forms["userForm"]["group"].value;
  let idCard = document.forms["userForm"]["id-card"].value;
  let birthDate = document.forms["userForm"]["date-of-birth"].value;
  let mail = document.forms["userForm"]["e-mail"].value;

  if (!pib) {
    document.forms["userForm"]["PIB"].style.backgroundColor = "#FFC5C5";
    alert("Поле П.І.Б. повинно бути заповнено");
    return false;
  }

  const pibData = pib.split(" ");
  if (!pibData[1]) {
    document.forms["userForm"]["PIB"].style.backgroundColor = "#FFC5C5";
    alert("You should enter initials (Т.Т.)");
    return false;
  }

  const initials = pibData[1].split(".");
  initials.pop();

  if (initials.length !== 2) {
    document.forms["userForm"]["PIB"].style.backgroundColor = "#FFC5C5";
    alert("invalid PIB format, should be ТТТТТТ Т.Т.");
    return false;
  }

  if (!group) {
    document.forms["userForm"]["group"].style.backgroundColor = "#FFC5C5";
    alert("Поле група повинно бути заповнено");
    return false;
  }

  if (group.includes("-")) {
    const splittedGroup = group.split("-");
    if (splittedGroup[0].length != 2 || splittedGroup[1].length != 2) {
      document.forms["userForm"]["group"].style.backgroundColor = "#FFC5C5";
      alert("Група введена некоректно. Повинно бути формату ТТ-ЧЧ");
      return false;
    }
  } else {
    document.forms["userForm"]["group"].style.backgroundColor = "#FFC5C5";
    alert("Група введена некоректно. Повинно бути формату ТТ-ЧЧ");
    return false;
  }

  const idCardPattern = /^[a-zA-Z]{2}№\d{6}$/;
  if (!idCard) {
    document.forms["userForm"]["id-card"].style.backgroundColor = "#FFC5C5";
    alert("Поле ID-card повинно бути заповнено");
    return false;
  }
  if (!idCardPattern.test(idCard)) {
    document.forms["userForm"]["id-card"].style.backgroundColor = "#FFC5C5";
    alert("ID-card введено некоректно. Повинно бути формату ТТ №ЧЧЧЧЧЧ");
    return false;
  }

  const birthDatePattern = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!birthDate) {
    document.forms["userForm"]["date-of-birth"].style.backgroundColor =
      "#FFC5C5";
    alert("Поле дата народження повинно бути заповнено");
    return false;
  }
  if (!birthDatePattern.test(birthDate)) {
    document.forms["userForm"]["date-of-birth"].style.backgroundColor =
      "#FFC5C5";
    alert(
      "Дата народження введена некоректно. Повинно бути формату ЧЧ.ЧЧ.ЧЧЧЧ",
    );

    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!mail) {
    alert("Поле e-mail повинно бути заповнено");
    document.forms["userForm"]["e-mail"].style.backgroundColor = "#FFC5C5";

    return false;
  }
  if (!emailPattern.test(mail)) {
    alert("E-mail введено некоректно. Повинно бути формату тттттт@ттттт.com");
    document.forms["userForm"]["e-mail"].style.backgroundColor = "#FFC5C5";

    return false;
  }

  let outputDiv = document.getElementById("formOutput");
  outputDiv.innerHTML = `
        <h3>Form Data Submitted:</h3>
        <p><strong>ПІБ:</strong> ${pib}</p>
        <p><strong>Група:</strong> ${group}</p>
        <p><strong>ID-карта:</strong> ${idCard}</p>
        <p><strong>Дата народження:</strong> ${birthDate}</p>
        <p><strong>E-mail:</strong> ${mail}</p>
    `;

  return false;
}

const table = document.getElementsByTagName("table")[0];
const rows = table.rows;
let variantNumber = 8;
let coordinates = findCoordinates(variantNumber);
let variantCell = rows[coordinates.i].cells[coordinates.j];

variantCell.addEventListener("mouseover", () => {
  variantCell.style.backgroundColor = getRandomColor();
});

const colorPicker = document.getElementById("colorPicker");
variantCell.addEventListener("dblclick", () => {
  paintColumns(coordinates);
});
variantCell.addEventListener("click", () => {
  colorPicker.click();
});

colorPicker.addEventListener("input", (event) => {
  const selectedColor = event.target.value;
  variantCell.style.backgroundColor = selectedColor;
});

function paintColumns(coordinates) {
  for (let j = coordinates.j; j < rows[0].cells.length; j += 2) {
    for (let i = 0; i < rows.length; i++) {
      rows[i].cells[j].style.backgroundColor = colorPicker.value;
    }
  }
}

function findCoordinates(variantNumber) {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].cells.length; j++) {
      let cell = rows[i].cells[j];
      if (Number(cell.innerHTML) === variantNumber) {
        return { i, j };
      }
    }
  }
}

function getRandomColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  return `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
}
