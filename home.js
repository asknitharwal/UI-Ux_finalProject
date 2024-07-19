var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 2000); 
}
let logIn = JSON.parse(localStorage.getItem("loginUser")) || [];

if (logIn) {
  let users = JSON.parse(localStorage.getItem("userdetails")) || [];
  let user = users.find((user) => user.email === logIn.email);
  if (user) {
    document.getElementById("username").innerHTML = `${user.name}`;
  }
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("loginUser");
  window.location.href = "index.html";
});

let cont = document.getElementById("container");
let arr = [];
async function getValuefromApi() {
  try {
    let response = await axios.get("https://fakestoreapi.com/products");
    console.log(response.data);
    arr = response.data;
    displayData();
  } catch (error) {
    console.log(error);
  }
}

function displayData() {
  cont.innerHTML = "";
  arr.map((element) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let image = document.createElement("img");
    image.src = element.image;
    let title = document.createElement("h3");
    title.innerText = element.title;
    let price = document.createElement("p");
    price.innerText = `₹${element.price}`;
    let description = document.createElement("p");
    description.innerText = element.description;
    let rate = document.createElement("h3");
    rate.innerText = `Rating: ${element.rating.rate}`;

    let add = document.createElement("button");
    add.innerText = "Add to Cart";
    add.id = "add";
    let buy = document.createElement("button");
    buy.innerText = "Buy Now";
    buy.id = "buy";

    card.append(image, title, price, description, rate, add, buy);
    cont.append(card);
  });
}
getValuefromApi();
