const buttons = document.querySelectorAll("li");
const inputEl = document.getElementById("imp");
const btnEl = document.getElementById("btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    inputEl.value = button.innerText;
    btnEl.style.backgroundColor = "blue";
    btnEl.style.color = "white";
  });
});

inputEl.addEventListener('keypress',()=>{
  if(inputEl){
    btnEl.style.backgroundColor = "blue";
    btnEl.style.color = "white";
  }else{
    btnEl.style.backgroundColor = "lightBlue";
    btnEl.style.color = "black";
  }
})

 


