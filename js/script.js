"use strict";
//Navbar Toggle
const navbarToggler = document.querySelector(".navbar_toggler");
const navbarClose = document.querySelector(".close_navbar");
const navbarLinks = document.querySelector(".links");

navbarToggler.addEventListener("click", () => {
  navbarLinks.classList.add("show");
  document.body.style.setProperty("--before-opacity", "1");
  document.body.style.setProperty("--before-z-index", "10");
});
navbarClose.addEventListener("click", () => {
  navbarLinks.classList.remove("show");
  document.body.style.setProperty("--before-opacity", "0");
  document.body.style.setProperty("--before-z-index", "-1");
});

//Cart Toggle
const cartToggler = document.querySelector(".cart_toggler");
const cart = document.querySelector(".cart");

cartToggler.addEventListener("click", () => {
  cart.classList.add("show");
  cart.style.zIndex = "9";
});

//TO close the cart when i click on anything except the cart and its children
cart.addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("click", (e) => {
  if (e.target != cartToggler) {
    cart.classList.remove("show");
    cart.style.zIndex = "-1";
  }
});

//Quantity
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const quantity = document.querySelector(".quantity span");

plus.addEventListener("click", () => {
  quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
});

minus.addEventListener("click", () => {
  if (quantity.innerHTML >= 1) {
    quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
  }
});

//Set the quantity in the cart
const addToCart = document.querySelector(".add");
const cartQuantity = document.querySelector(".cart_icon");
const checkoutBtn = document.querySelector(".cart .checkout");
const cartWord = document.querySelector(".cart > p");

let flag = false;
let totalQuantity;

//Create the div element for the order
const order = document.createElement("div");
//"Your cart is empty" message
const cartEmpty = document.querySelector(".cart .none");
//To follow the orders number in order to display the message
const ordersArr = [];

//! Functions
// Reset function
function reset() {
  //Remove the "Your cart is empty" message
  cartEmpty.remove();
  //Set the height
  cart.style.height = "auto";
  //Add the checkout button
  checkoutBtn.style.display = "block";
}

//Add the first product
function addProcuct() {
  if (quantity.textContent > 0) {
    //Show the quantity red circle
    document
      .querySelector(".cart_icon")
      .style.setProperty("--before-opacity", "1");
    //Add the number of the purchased products
    totalQuantity = +quantity.textContent;
    cartQuantity.setAttribute("data-quantity", totalQuantity);
    //Reset
    reset();
    //Add the order
    const orderContent = `
    <img src="images/image-product-1-thumbnail.jpg" alt="" />
    <div>
    <p>Winter Limited Edition Boots</p>
    <span>$125.00 x</span><span>${+quantity.textContent}</span><span>$${
      +quantity.textContent * 125
    }</span>
    </div>
    <i class="fa-regular fa-trash-can delete"></i>`;
    order.insertAdjacentHTML("beforeend", orderContent);
    order.setAttribute("data-quantity", quantity.textContent);

    cart.append(order);
    //Add order to cart
    cartWord.after(order);
    //Add order to the array of orders
    ordersArr.push(order);
  }
  //Reset the quantity to 0
  quantity.innerHTML = "0";

  deleteOrder();
}

//Add another product
function addAnotherProduct() {
  if (quantity.textContent > 0) {
    document
      .querySelector(".cart_icon")
      .style.setProperty("--before-opacity", "1");

    totalQuantity += +quantity.textContent;
    cartQuantity.setAttribute("data-quantity", totalQuantity);
    //Order div
    const order = document.createElement("div");
    const orderContent = `
    <img src="images/image-product-1-thumbnail.jpg" alt="" />
    <div>
    <p>Winter Limited Edition Boots</p>
    <span>$125.00 x</span><span>${+quantity.textContent}</span><span>$${
      +quantity.textContent * 125
    }</span>
    </div>
    <i class="fa-regular fa-trash-can delete"></i>`;
    order.insertAdjacentHTML("beforeend", orderContent);
    order.setAttribute("data-quantity", quantity.textContent);
    cart.append(order);
    //Add order to cart
    cartWord.after(order);
    //Add order to the array of orders
    ordersArr.push(order);

    //Reset the quantity to 0
    quantity.innerHTML = "0";
    deleteOrder();
  }
}

//Delete

function theFunc(el) {
  if (el.target.classList.contains("delete")) {
    this.remove();
    //Remove order from the array
    ordersArr.pop();

    // Subtract the deleted orders number from the total quantity
    totalQuantity = totalQuantity - +this.dataset.quantity;
    cartQuantity.setAttribute("data-quantity", totalQuantity);
    if (totalQuantity <= 0) {
      document
        .querySelector(".cart_icon")
        .style.setProperty("--before-opacity", "0");
    }
  }
  //Check if the cart is empty
  if (cart.children.length == 2) {
    cart.append(cartEmpty);
    checkoutBtn.style.display = "none";
    cart.style.height = "200px";
  }
}

function deleteOrder() {
  const orders = document.querySelectorAll(".cart > div");
  orders.forEach((e) => {
    e.addEventListener("click", theFunc);
  });
}
//! Event
addToCart.addEventListener("click", () => {
  if (!flag) {
    addProcuct();
    console.log("yes");
    flag = true;
  } else {
    if (cart.contains(cartEmpty)) reset();
    addAnotherProduct();
    console.log("no");
  }
});

//!===================================  SLider  ==============================
//Selectors
const mainSlider = document.querySelector(".main_slider");
const mainSlidesToggles = document.querySelectorAll(".main_slider .slides div");
const slidesToggles = document.querySelectorAll("main .slides div");
const mainSliderOpen = document.querySelector("main .current_slide");
const mainSliderCloseBtn = document.querySelector(".close_slider");
const bigMainSlides = document.querySelectorAll(
  ".main_slider .current_slide img"
);
const smallMainSlides = document.querySelectorAll("main .current_slide img");

//Media Query
const media = this.matchMedia("(width < 768px)");
//Functions
function activeToggles(slide) {
  mainSlidesToggles.forEach((toggle) => toggle.classList.remove("active"));
  document
    .querySelector(`.main_slider .slides div[data-slide="${slide}"]`)
    .classList.add("active");
}
function goToSlide(slide) {
  let slides;
  media.matches ? (slides = smallMainSlides) : (slides = bigMainSlides);
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

//Images switch
function imagesSwitching() {
  function curImage(s) {
    const imgSrc = `file:///W:/JavaScript/ecommerce-product-page-main/The%20Design/images/${s.dataset.slide}.jpg`;
    const curImg = [...smallMainSlides].find((slide) => slide.src === imgSrc);
    smallMainSlides.forEach((slide) => (slide.style.zIndex = "-1"));
    curImg.style.zIndex = "1";
    //Initialize
    goToSlide([...smallMainSlides].indexOf(curImg));
    activeToggles([...smallMainSlides].indexOf(curImg));
  }

  [...slidesToggles].forEach((e) => {
    //Activate the current image togglers
    e.addEventListener("click", () => {
      e.classList.add("active");
      [...slidesToggles].forEach((el) => {
        if (el !== e && el.classList.contains("active")) {
          el.classList.remove("active");
        }
      });
      curImage(e);
    });
  });
}

//Main SLider

const mediaToShowMainSlider = this.matchMedia("(width > 767px)");

mainSliderOpen.addEventListener("click", (e) => {
  mediaToShowMainSlider.matches
    ? mainSlider.classList.add("show")
    : mainSlider.classList.remove("show");
});

mainSliderCloseBtn.addEventListener("click", () => {
  mainSlider.classList.remove("show");
});

//Big slider
function bigSlider() {
  const next = document.getElementsByClassName("next")[1];
  const prev = document.getElementsByClassName("prev")[1];

  let bigCurSlide = 0;

  //Functions
  function nextSlide() {
    if (bigCurSlide == bigMainSlides.length - 1) bigCurSlide = 0;
    else bigCurSlide++;
    goToSlide(bigCurSlide);
    activeToggles(bigCurSlide);
  }
  function prevSlide() {
    if (bigCurSlide == 0) bigCurSlide = bigMainSlides.length - 1;
    else bigCurSlide--;
    goToSlide(bigCurSlide);
    activeToggles(bigCurSlide);
  }

  //Initialize
  goToSlide(0);

  //Events
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);
  mainSlidesToggles.forEach((e) => {
    e.addEventListener("click", () => {
      activeToggles(e.dataset.slide);
      goToSlide(e.dataset.slide);
    });
  });
}

//Small slider
function smallSlider() {
  const next = document.querySelector("main .next");
  const prev = document.querySelector("main .prev");
  const mainSlides = document.querySelectorAll("main .current_slide img");

  let smallCurSlide = 0;

  // function goToSlide(slide) {
  //   mainSlides.forEach((s, i) => {
  //     s.style.transform = `translateX(${100 * (i - slide)}%)`;
  //   });
  // }
  goToSlide(0);
  function nextSlide() {
    if (smallCurSlide == mainSlides.length - 1) smallCurSlide = 0;
    else smallCurSlide++;
    goToSlide(smallCurSlide);
  }
  function prevSlide() {
    if (smallCurSlide == 0) smallCurSlide = mainSlides.length - 1;
    else smallCurSlide--;
    goToSlide(smallCurSlide);
  }
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);
}

function setupSlider() {
  if (media.matches) {
    smallSlider();
  } else {
    bigSlider();
    imagesSwitching();
  }
}

// Call setupSlider() once when the page loads
setupSlider();

// Call setupSlider() again whenever the screen size changes
window.addEventListener("resize", setupSlider);
