const API = "/api";

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cartCount").forEach(el => el.textContent = count);
}
function money(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}
function token() {
  return localStorage.getItem("token");
}
function updateAuthLinks() {
  document.querySelectorAll("#authLink").forEach(el => {
    if (token()) {
      el.textContent = "Logout";
      el.href = "#";
      el.onclick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        location.href = "/";
      };
    } else {
      el.textContent = "Login";
      el.href = "/login.html";
      el.onclick = null;
    }
  });
}
updateCartCount();
updateAuthLinks();
