document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("dropdown");
  const hamburgerEl = document.getElementById("hamburger");
  const headerEl =  document.getElementsByTagName('header')
  hamburgerEl.addEventListener("click", () => {
    if ((dropdown.style.display = "none")) {
      dropdown.style.display = "block";
    }
  });
  window.addEventListener('scroll',()=>{
    dropdown.style.display = 'none'
    headerEl.classlist.add('addsha')
  })

});

const val = [
  "dream",
  "Plans",
  "desire",
  "future",
  "Careers",
  "Trips",
  "life",
  "growth",
  "more"
];
const randonValue = Math.floor(Math.random() * val.length);

const dreamEl = document.getElementById("dream");

function changeVal() {
  val.forEach((value) => {
    dreamEl.innerHTML = val[randonValue];
  });
}
changeVal();
setInterval(() => {
  changeVal();
}, 10);

const backEl = document.getElementsById('back-btn')

backEl.addEventListener('click',()=>{
  dropdown.style.display = 'none'
  alert('hello')
})