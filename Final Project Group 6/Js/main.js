const form = document.getElementById("contactForm");

if (form) {
  const handleError = (input, msg = "") => {
    input.nextElementSibling.innerText = msg;
    return msg === "";
  };

  const nameValidation = (element) => {
    const inputValue = element.value.trim();
    if (inputValue.length < 3) {
      return handleError(element, "Enter at least 3 characters");
    }
    return handleError(element);
  };

  const emailValidation = (element) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const inputValue = element.value.trim();

    return emailRegex.test(inputValue)
      ? handleError(element)
      : handleError(element, "Enter a valid email");
  };

  const phoneValidation = (element) => {
    const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
    const inputValue = element.value.trim();

    return phoneRegex.test(inputValue)
      ? handleError(element)
      : handleError(element, "Enter a valid phone number");
  };

  const messageValidation = (element) => {
    const inputValue = element.value.trim();
    if (inputValue.length < 10) {
      return handleError(element, "Enter at least 10 characters");
    }
    return handleError(element);
  };

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = nameValidation(nameInput);
    const isEmailValid = emailValidation(emailInput);
    const isPhoneValid = phoneValidation(phoneInput);
    const isMessageValid = messageValidation(messageInput);

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      alert("Form submitted!");
      form.reset();
    }
  });
}

const gridViewBtn = document.getElementById("btn-grid");
const listViewBtn = document.getElementById("btn-list");
const productGrid = document.querySelector(".product-grid");

const productCards = document.querySelectorAll(".product-box");
const categoryLinks = document.querySelectorAll(".filter-cat");
const priceLinks = document.querySelectorAll(".filter-price");
const clearBtn = document.querySelector(".btn-clear");
const itemsCountText = document.querySelector(".items-count");

let chosenCategory = "";
let chosenMinPrice = 0;
let chosenMaxPrice = 999999;

if (gridViewBtn && listViewBtn) {
  gridViewBtn.addEventListener("click", function () {
    productGrid.classList.remove("list-view");
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  });

  listViewBtn.addEventListener("click", function () {
    productGrid.classList.add("list-view");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  });
}

function runFilters() {
  let count = 0;

  for (let i = 0; i < productCards.length; i++) {
    let card = productCards[i];

    let cardCategory = card.getAttribute("data-category");
    let cardPrice = parseFloat(card.getAttribute("data-price"));

    let matchesCategory =
      chosenCategory === "" || cardCategory === chosenCategory;
    let matchesPrice =
      cardPrice >= chosenMinPrice && cardPrice <= chosenMaxPrice;

    if (matchesCategory && matchesPrice) {
      card.style.display = "";
      count++;
    } else {
      card.style.display = "none";
    }
  }

  if (itemsCountText) {
    itemsCountText.textContent = "Items 1-" + count + " of " + count;
  }
}

for (let i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener("click", function (event) {
    event.preventDefault();

    let clickedCategory = this.getAttribute("data-category");

    if (chosenCategory === clickedCategory) {
      chosenCategory = "";
      this.classList.remove("active");
    } else {
      for (let j = 0; j < categoryLinks.length; j++) {
        categoryLinks[j].classList.remove("active");
      }
      chosenCategory = clickedCategory;
      this.classList.add("active");
    }

    runFilters();
  });
}

for (let i = 0; i < priceLinks.length; i++) {
  priceLinks[i].addEventListener("click", function (event) {
    event.preventDefault();

    let min = parseFloat(this.getAttribute("data-min"));
    let max = parseFloat(this.getAttribute("data-max"));

    if (chosenMinPrice === min && chosenMaxPrice === max) {
      chosenMinPrice = 0;
      chosenMaxPrice = 999999;
      this.classList.remove("active");
    } else {
      for (let j = 0; j < priceLinks.length; j++) {
        priceLinks[j].classList.remove("active");
      }
      chosenMinPrice = min;
      chosenMaxPrice = max;
      this.classList.add("active");
    }

    runFilters();
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", function () {
    chosenCategory = "";
    chosenMinPrice = 0;
    chosenMaxPrice = 999999;

    for (let i = 0; i < categoryLinks.length; i++) {
      categoryLinks[i].classList.remove("active");
    }
    for (let i = 0; i < priceLinks.length; i++) {
      priceLinks[i].classList.remove("active");
    }

    runFilters();
  });
}

runFilters();

productCards.forEach((card) => {
  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    if (!e.target.closest("button, a")) {
      window.location.href = "About_product.html";
    }
  });
});
