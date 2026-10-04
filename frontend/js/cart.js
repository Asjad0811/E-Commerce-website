const root = document.getElementById("cartPage");

function render() {
  const cart = getCart();
  if (!cart.length) {
    root.innerHTML = `<div class="empty"><h3>Your cart is empty</h3><p>Find something you love and add it here.</p><a class="btn btn-primary" href="/">Start shopping</a></div>`;
    return;
  }

  const subtotal = cart.reduce((sum, x) => sum + x.price * x.quantity, 0);
  const delivery = subtotal >= 999 ? 0 : 99;
  const total = subtotal + delivery;

  root.innerHTML = `
    <div>
      <div class="cart-items">
        ${cart.map(x => `
          <div class="cart-item">
            <img src="${x.image}" alt="${x.name}">
            <div><div class="item-name">${x.name}</div><div class="item-meta">${x.category}</div></div>
            <div class="quantity"><button onclick="changeQty('${x._id}',-1)">−</button><span>${x.quantity}</span><button onclick="changeQty('${x._id}',1)">+</button></div>
            <div class="item-price"><strong>${money(x.price * x.quantity)}</strong><br><button class="mini-btn" onclick="removeItem('${x._id}')">Remove</button></div>
          </div>`).join("")}
      </div>
    </div>
    <aside class="summary">
      <h3>Order summary</h3>
      <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      <div class="summary-row"><span>Delivery</span><span>${delivery ? money(delivery) : "Free"}</span></div>
      <div class="summary-total"><span>Total</span><span>${money(total)}</span></div>
      <button class="btn btn-primary" onclick="showCheckout()">Checkout</button>
      <div id="checkoutBox" class="checkout-form hidden">
        <form id="checkoutForm" class="form">
          <label>Name<input id="shipName" required></label>
          <label>Phone<input id="shipPhone" required></label>
          <label>Address<textarea id="shipAddress" required></textarea></label>
          <label>City<input id="shipCity" required></label>
          <label>PIN code<input id="shipPincode" required></label>
          <button class="btn btn-primary">Place order</button>
          <p id="checkoutMessage" class="message"></p>
        </form>
      </div>
    </aside>`;
}
window.changeQty = (id, delta) => {
  const cart = getCart(); const item = cart.find(x => x._id === id);
  item.quantity = Math.max(1, Math.min(item.stock, item.quantity + delta)); saveCart(cart); render();
};
window.removeItem = id => { saveCart(getCart().filter(x => x._id !== id)); render(); };
window.showCheckout = () => {
  if (!token()) return location.href = "/login.html?next=/cart.html";
  document.getElementById("checkoutBox").classList.remove("hidden");
};
document.addEventListener("submit", async e => {
  if (e.target.id !== "checkoutForm") return;
  e.preventDefault();
  const msg = document.getElementById("checkoutMessage");
  const cart = getCart();
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {"Content-Type":"application/json","Authorization":"Bearer " + token()},
      body: JSON.stringify({
        items: cart.map(x => ({ product: x._id, quantity: x.quantity })),
        shipping: {
          name: shipName.value, phone: shipPhone.value, address: shipAddress.value,
          city: shipCity.value, pincode: shipPincode.value
        }
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    location.href = "/orders.html";
  } catch (err) { msg.textContent = err.message; }
});
render();
