const id = new URLSearchParams(location.search).get("id");
const detail = document.getElementById("productDetail");

async function load() {
  if (!id) return detail.innerHTML = '<div class="empty"><h3>Product not found</h3></div>';
  try {
    const res = await fetch(`/api/products/${id}`);
    const p = await res.json();
    if (!res.ok) throw new Error(p.message);
    detail.innerHTML = `
      <img class="detail-image" src="${p.image}" alt="${p.name}">
      <div class="detail-copy">
        <p class="eyebrow">${p.category}</p>
        <h1>${p.name}</h1>
        <div class="rating">★ ${p.rating.toFixed(1)} / 5</div>
        <p class="description">${p.description}</p>
        <div class="detail-price">${money(p.price)}</div>
        <div class="stock">${p.stock > 0 ? `${p.stock} units available` : "Out of stock"}</div>
        <div class="quantity"><button id="minus">−</button><span id="qty">1</span><button id="plus">+</button></div>
        <button class="btn btn-primary" id="add">Add to cart</button>
      </div>`;
    let qty = 1;
    const qtyEl = document.getElementById("qty");
    document.getElementById("minus").onclick = () => { qty = Math.max(1, qty - 1); qtyEl.textContent = qty; };
    document.getElementById("plus").onclick = () => { qty = Math.min(p.stock, qty + 1); qtyEl.textContent = qty; };
    document.getElementById("add").onclick = () => {
      const cart = getCart();
      const existing = cart.find(x => x._id === p._id);
      if (existing) existing.quantity = Math.min(p.stock, existing.quantity + qty);
      else cart.push({ ...p, quantity: qty });
      saveCart(cart);
      location.href = "/cart.html";
    };
  } catch (e) {
    detail.innerHTML = `<div class="empty"><h3>${e.message}</h3></div>`;
  }
}
load();
