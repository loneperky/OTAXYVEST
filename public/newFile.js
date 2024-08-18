showPassWordEl.addEventListener("click", () => {
  if (passwordEl.hasAttribute("type")) {
    passwordEl.setAttribute("type", "text");
  } else {
    passwordEl.setAttribute("type", "password");
  }
});
