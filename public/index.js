document.addEventListener("DOMContentLoaded", () => {
  const hamburgerEl = document.getElementById("hamburger");
  const dropmenu = document.getElementById('dropmenu')
  hamburgerEl.addEventListener("click", () => {
    if ((dropmenu.style.display = "none")) {
     dropmenu.style.display = "block";
    }
  });
  window.addEventListener('scroll',()=>{
    dropmenu.style.display = 'none'
  })
 const home = document.getElementById('home')
 const save = document.getElementById('save')
 const invest = document.getElementById('invest')
 const payment = document.getElementById('payment')
 const referral = document.getElementById('referral')

 const manage = document.getElementById('manage')
manage.addEventListener('click',()=>{
  dropmenu.style.display = 'none'
})
});
const passwordEl = document.getElementById('fpassword')
const showPassWordEl = document.getElementById('showme')

showPassWordEl.addEventListener('change',()=>{
    passwordEl.setAttribute('type','text')
});

