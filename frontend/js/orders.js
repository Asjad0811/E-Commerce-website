const root = document.getElementById("ordersPage");

async function loadOrders() {
  if (!token()) {
    root.innerHTML = `<div class="empty"><h3>Sign in to see your orders</h3><a class="btn btn-primary" href="/login.html?next=/orders.html">Sign in</a></div>`;
    return;
  }
  try {
    const res = await fetch("/api/orders/mine", { headers: { Authorization: "Bearer " + token() }});
    const orders = await res.json();
    if (!res.ok) throw new Error(orders.message);
    if (!orders.length) {
      root.innerHTML = `<div class="empty"><h3>No orders yet</h3><p>Your purchases will appear here.</p><a class="btn btn-primary" href="/">Shop now</a></div>`;
      return;
    }
    root.innerHTML = orders.map(o => `
      <div class="order-card">
        <div class="order-top">
          <div><strong>Order #${String(o._id).slice(-8).toUpperCase()}</strong><div class="item-meta">${new Date(o.createdAt).toLocaleString()}</div></div>
          <span class="status">${o.status}</span>
        </div>
        ${o.items.map(i => `<div class="order-item"><span>${i.name} × ${i.quantity}</span><strong>${money(i.price * i.quantity)}</strong></div>`).join("")}
        <div class="order-total">Total: ${money(o.total)}</div>
      </div>`).join("");
  } catch (err) {
    root.innerHTML = `<div class="empty"><h3>${err.message}</h3></div>`;
  }
}
loadOrders();
