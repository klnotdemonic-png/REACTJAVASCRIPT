/* app.js
   - register()
   - autoLogin()
   - logout()
   - addItem(), editItem(), removeItem()
   - renderCart(), clearCart()
   - printReceipt() -> opens printable window and calls print()
*/

// ---------- HELPERS ----------
function money(n) {
  return Number(n).toLocaleString("id-ID");
}

// ---------- AUTH / REGISTER ----------
function register() {
  const u = document.getElementById("reg-username").value.trim();
  const p = document.getElementById("reg-password").value;

  if (!u || !p) return alert("Isi username & password dong.");

  // Simpel: simpan satu akun (demo). Overwrite kalau sama username.
  const account = { user: u, pass: p };
  localStorage.setItem("kasir_account", JSON.stringify(account));

  // auto login: set current user
  localStorage.setItem("kasir_user", u);

  alert("Registrasi sukses! langsung masuk ke kasir.");
  window.location = "kasir.html";
}

// kalau user klik 'langsung masuk' dari register, auto-login ke akun yg tersimpan (demo)
function autoLogin() {
  const acc = JSON.parse(localStorage.getItem("kasir_account") || "null");
  if (!acc) return alert("Belum ada akun. Silakan daftar dulu.");
  localStorage.setItem("kasir_user", acc.user);
  window.location = "kasir.html";
}

function logout() {
  localStorage.removeItem("kasir_user");
  // keep account, tapi hapus current session & cart
  localStorage.removeItem("kasir_cart");
  window.location = "register.html";
}

// ---------- KASIR / KERANJANG ----------
let cart = JSON.parse(localStorage.getItem("kasir_cart") || "[]");

function getUser() {
  return localStorage.getItem("kasir_user") || "-";
}

// Render user & cart on kasir.html if loaded
if (window.location.pathname.includes("kasir.html")) {
  const user = getUser();
  if (user === "-" || user === null) {
    alert("Belum terdaftar / login. Silakan registrasi dulu.");
    window.location = "register.html";
  } else {
    document.getElementById("userDisplay").innerText = user;
    renderCart();
  }
}

function saveCart() {
  localStorage.setItem("kasir_cart", JSON.stringify(cart));
}

function addItem() {
  const name = document.getElementById("item-name").value.trim();
  const price = Number(document.getElementById("item-price").value);
  const qty = Number(document.getElementById("item-qty").value) || 1;

  if (!name || !price || price <= 0 || qty <= 0) {
    return alert("Isi nama, harga (>0), dan qty (>0).");
  }

  // push item
  cart.push({ name, price: Number(price), qty: Number(qty) });
  saveCart();
  renderCart();

  // clear inputs
  document.getElementById("item-name").value = "";
  document.getElementById("item-price").value = "";
  document.getElementById("item-qty").value = "1";
}

function renderCart() {
  const ul = document.getElementById("cartList");
  ul.innerHTML = "";

  let total = 0;
  cart.forEach((it, idx) => {
    const lineTotal = it.price * it.qty;
    total += lineTotal;

    const li = document.createElement("li");

    li.innerHTML = `
      <div style="flex:1;">
        <div style="font-weight:600">${it.name}</div>
        <div style="font-size:13px; color:#555">
          Rp ${money(it.price)} × ${it.qty} = Rp ${money(lineTotal)}
        </div>
      </div>

      <div style="display:flex; gap:6px; align-items:center;">
        <button class="small-btn btn-edit" onclick="editItem(${idx})">Edit</button>
        <button class="small-btn btn-delete" onclick="removeItem(${idx})">Hapus</button>
      </div>
    `;

    ul.appendChild(li);
  });

  document.getElementById("grandTotal").innerText = money(total);
}

function removeItem(i) {
  if (!confirm("Yakin mau hapus item ini?")) return;
  cart.splice(i, 1);
  saveCart();
  renderCart();
}

function editItem(i) {
  const it = cart[i];
  const newName = prompt("Nama produk:", it.name);
  if (newName === null) return; // cancel

  const newPriceStr = prompt("Harga (angka):", it.price);
  if (newPriceStr === null) return;
  const newPrice = Number(newPriceStr);

  const newQtyStr = prompt("Qty:", it.qty);
  if (newQtyStr === null) return;
  const newQty = Number(newQtyStr);

  if (!newName.trim() || !newPrice || newPrice <= 0 || !newQty || newQty <= 0) {
    return alert("Data tidak valid. Edit dibatalkan.");
  }

  cart[i] = { name: newName.trim(), price: Number(newPrice), qty: Number(newQty) };
  saveCart();
  renderCart();
}

function clearCart() {
  if (!confirm("Kosongkan seluruh keranjang?")) return;
  cart = [];
  saveCart();
  renderCart();
}

// ---------- CETAK STRUK ----------
function printReceipt() {
  if (cart.length === 0) return alert("Keranjang masih kosong.");

  const user = getUser();
  let total = 0;
  let lines = "";

  cart.forEach((it) => {
    const lineTotal = it.price * it.qty;
    total += lineTotal;
    lines += `<tr>
      <td style="padding:6px">${escapeHtml(it.name)}</td>
      <td style="padding:6px; text-align:right">Rp ${money(it.price)}</td>
      <td style="padding:6px; text-align:right">${it.qty}</td>
      <td style="padding:6px; text-align:right">Rp ${money(lineTotal)}</td>
    </tr>`;
  });

  const now = new Date();
  const header = `<div style="text-align:center;">
    <h3>STRUK BELANJA</h3>
    <div style="font-size:13px">Kasir Mini — ${escapeHtml(user)}</div>
    <div style="font-size:12px; color:#444; margin-top:6px">
      ${now.toLocaleString()}
    </div>
    <hr/>
  </div>`;

  const table = `
    <table width="100%" style="border-collapse:collapse; font-family:Arial,Helvetica,sans-serif;">
      <thead>
        <tr style="background:#f2f2f2">
          <th style="text-align:left; padding:6px">Produk</th>
          <th style="text-align:right; padding:6px">Harga</th>
          <th style="text-align:right; padding:6px">Qty</th>
          <th style="text-align:right; padding:6px">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        ${lines}
      </tbody>
    </table>
  `;

  const footer = `
    <div style="margin-top:12px; text-align:right; font-weight:600">
      TOTAL: Rp ${money(total)}
    </div>

    <div style="margin-top:18px; font-size:12px; color:#666;">
      Terima kasih. Selamat datang lagi!
    </div>
  `;

  const html = `
    <html>
      <head>
        <title>Struk</title>
        <meta charset="utf-8" />
      </head>
      <body onload="window.print(); setTimeout(()=>window.close(), 250)">
        ${header}
        ${table}
        ${footer}
      </body>
    </html>
  `;

  const w = window.open("", "_blank", "width=600,height=700");
  w.document.open();
  w.document.write(html);
  w.document.close();
}

// small helper to avoid HTML injection in receipt
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
