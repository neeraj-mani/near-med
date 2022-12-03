let shopName = document.querySelector(".shop-name");
let userName = document.querySelector(".user-name");
let addItemForm = document.getElementById("add-item-form");
let medName = document.getElementById("medname");
let mfgDate = document.getElementById("mfg");
let brand = document.getElementById("brand");
let expDate = document.getElementById("exp");
let category = document.getElementById("catg");
let unit = document.getElementById("unit");
let price = document.getElementById("price");

const itemData = document.querySelector(".item-data");

let shopId;

async function load() {
  let email = localStorage.getItem("email") || sessionStorage.getItem("email");
  let pass = localStorage.getItem("pass") || sessionStorage.getItem("pass");
  let result = await fetch("/user/auth", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      pass,
    }),
  }).then((res) => res.json());
  if (!result.authenticated) {
    return window.location.assign("/login");
  }
  if (!result.shop) {
    return window.location.assign("/user/shop");
  }
  let user = await fetch("/user/dashboard", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      pass,
    }),
  }).then((res) => res.json());
  shopId = user.shopId;
  userName.textContent = user.name;
  shopName.textContent = user.shop;
  document.title += ` | ${user.shop}`;
  let response = await fetch("/user/dashboard/alldata", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      shopId,
    }),
  }).then((data) => data.json());
  console.log(response);
  drawElements(response);
}
load();

let logOut = document.getElementById("logout");
logOut.addEventListener("click", function (e) {
  localStorage.clear();
  sessionStorage.clear();
  console.log("cleared");
  window.location.assign("/login");
});

let addItemBtn = document.querySelector(".add-item-btn");
let modal = document.querySelector(".modal-bg");
let close = document.querySelector(".close");
addItemBtn.addEventListener("click", function () {
  modal.classList.remove("hide");
});

close.addEventListener("click", function () {
  modal.classList.add("hide");
});

addItemForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  let response = await fetch("/user/dashboard/data", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      shopId: shopId,
      name: medName.value,
      brand: brand.value,
      catg: category.value,
      mfg: mfgDate.value,
      exp: expDate.value,
      unit: unit.value,
      price: price.value,
    }),
  }).then((data) => data.json());

  response.medId;
  let item = document.createElement("div");
  item.classList.add("item");
  item.innerHTML = `
              <span class="col">${medName.value}</span>
              <span class="col">${brand.value}</span>
              <span class="col">${category.value}</span>
              <span class="col">${mfgDate.value}</span>
              <span class="col">${expDate.value}</span>
              <span class="col">${unit.value}</span>
              <span class="col">Rs.${price.value}</span>
              <div class="delete-btn" del-id='${response.medId}'>
              <svg class="icon-delete" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </div>
              `;
  itemData.appendChild(item);
  close.click();

  let deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((element) => {
    element.addEventListener("click", async function (e) {
      let response = await fetch("/user/dashboard/data", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ medId: this.getAttribute("del-id") }),
      }).then((res) => res.json());
      if (response.ok) {
        window.location.reload();
      }
    });
  });
});

function drawElements(data) {
  data.forEach((element) => {
    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
              <span class="col">${element.name}</span>
              <span class="col">${element.brand}</span>
              <span class="col">${element.category}</span>
              <span class="col">${element.mfg_date}</span>
              <span class="col">${element.exp_date}</span>
              <span class="col">${element.unit}</span>
              <span class="col">Rs.${element.price}</span>
              <div class="delete-btn" del-id='${element._id}'>
              <svg class="icon-delete" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </div>
              `;
    itemData.appendChild(item);
  });
  let deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((element) => {
    element.addEventListener("click", async function (e) {
      let response = await fetch("/user/dashboard/data", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ medId: this.getAttribute("del-id") }),
      }).then((res) => res.json());
      if (response.ok) {
        window.location.reload();
      }
    });
  });
}

document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
});

let query = document.getElementById("query");
query.addEventListener("input", function (e) {
  let value = this.value.toUpperCase();
  let item = document.querySelectorAll(".item");
  for (let i = 0; i < item.length; i++) {
    let itemValue = item[i].textContent.toUpperCase();
    if (itemValue.indexOf(value) > -1) {
      item[i].style.display = "flex";
    } else {
      item[i].style.display = "none";
    }
  }
});
