let reviewData=[
    {
        text: "My first order arrived today in perfect condition. From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch. Such great service. I look forward to shopping on your site in the future and would highly recommend it.",
        author: "- Tama Brown"
    },
    {
        text: "Great products and awesome customer service! Ordering was smooth and delivery was faster than expected. The packaging was extremely secure, and the item quality completely exceeded my expectations. I will definitely be recommending this store to all my friends and family.",
        author: "- Jessy Leman"
    },
    {
        text: "The PC components arrived very well packaged and working perfectly. Highly recommended tech store! The technical support team helped me verify compatibility before buying, which saved me a lot of time. Outstanding experience from start to finish.",
        author: "- Joun Rebo"
    },
    {
        text: "Top tier support and really competitive prices. Will definitely be ordering my next setup from here. The website interface made finding specific hardware so easy, and the fast order tracking kept me updated every step of the way until it hit my doorstep.",
        author: "- Solla Hail"
    }
];
let reviewText = document.getElementById("review-text");
let reviewAuthor = document.getElementById('review-author');
let dotsContainer = document.querySelector('.dots-container');
dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('review-dot')) {
    document.querySelectorAll('.review-dot').forEach(dot => {
      dot.classList.remove('bg-primary');
      dot.classList.add('bg-secondary')
      dot.classList.add('opacity-50');
    });
    e.target.classList.remove('bg-secondary');
    e.target.classList.remove('opacity-50');
    e.target.classList.add('bg-primary');
    let index = e.target.getAttribute('data-index');
    reviewText.textContent = reviewData[index].text;
    reviewAuthor.textContent = reviewData[index].author;
  }
});
let newForm=document.getElementById('newForm');
let newEmail=document.getElementById('newEmail');
newForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let errorSmall=newEmail.nextElementSibling;
    let emailValue=newEmail.value.trim();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue == "") {
        errorSmall.innerText = "Please enter your email!";
    } 
    else if (!emailPattern.test(emailValue)) {
        errorSmall.innerText = "Invalid email address!";
    } 
    else {
        errorSmall.innerText = ""; 
        newEmail.value = ""; 
    }
});
$(document).ready(function(){
  $("#new-products-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    navClass : ['prev','next'],
    dots: false
  });

  $(document).on('click', '.custom-product-card', function(e) {
    if (!$(e.target).closest('button, a').length) {
      window.location.href = 'About_product.html';
    }
  });
  $('.custom-product-card').css('cursor', 'pointer');
});