const MENU_ITEMS = [
  { name: "Sate Taichan", price: 15000, category: "Makanan" },
  { name: "Mie Pangsit", price: 20000, category: "Makanan" },
  { name: "Ayam Penyet", price: 15000, category: "Makanan" },
  { name: "Kupat Tahu", price: 15000, category: "Makanan" },
  { name: "Nasi Bakar", price: 10000, category: "Makanan" },
  { name: "Air Mineral", price: 5000, category: "Minuman" },
  { name: "Lemon Tea", price: 10000, category: "Minuman" },
  { name: "Es Dugan", price: 10000, category: "Minuman" },
  { name: "Jus Alpukat", price: 15000, category: "Minuman" },
  { name: "Jus Mangga", price: 15000, category: "Minuman" }
];

const TAX_RATE = 0.1;
const SERVICE_FEE = 20000;
const MAX_DISTINCT_ITEMS = 4;

const state = {
  orderItems: []
};

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

function findMenuItemByName(name) {
  return MENU_ITEMS.find(item => item.name.toLowerCase() === name.toLowerCase());
}

function canAddNewDistinctItem(name) {
  const isAlreadyInOrder = state.orderItems.some(it => it.name === name);
  if (isAlreadyInOrder) return true;
  return state.orderItems.length < MAX_DISTINCT_ITEMS;
}

function addToOrder(name) {
  if (!canAddNewDistinctItem(name)) {
    return;
  }
  const existing = state.orderItems.find(it => it.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    const found = findMenuItemByName(name);
    if (!found) return;
    state.orderItems.push({ name: found.name, price: found.price, category: found.category, quantity: 1 });
  }
  render();
}

function removeFromOrder(name) {
  state.orderItems = state.orderItems.filter(it => it.name !== name);
  render();
}

function updateQuantity(name, quantity) {
  const qty = Math.max(1, Math.min(99, Number(quantity) || 1));
  const target = state.orderItems.find(it => it.name === name);
  if (!target) return;
  target.quantity = qty;
  render();
}

function increment(name) {
  const target = state.orderItems.find(it => it.name === name);
  if (!target) return;
  target.quantity += 1;
  render();
}

function decrement(name) {
  const target = state.orderItems.find(it => it.name === name);
  if (!target) return;
  target.quantity = Math.max(1, target.quantity - 1);
  render();
}

function computeTotals() {
  const subtotal = state.orderItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const tax = subtotal * TAX_RATE;
  const service = SERVICE_FEE;

  let discountTenPercent = 0;
  if (subtotal > 100000) {
    discountTenPercent = subtotal * 0.1;
  }

  let freeDrinkDiscount = 0;
  let promoDrinkName = "";
  if (subtotal > 50000) {
    const firstDrink = state.orderItems.find(it => it.category === "Minuman");
    if (firstDrink) {
      freeDrinkDiscount = firstDrink.price;
      promoDrinkName = firstDrink.name;
    }
  }

  const total = subtotal + tax + service - discountTenPercent - freeDrinkDiscount;

  return {
    subtotal,
    tax,
    service,
    discountTenPercent,
    freeDrinkDiscount,
    promoDrinkName,
    total
  };
}

function renderMenu() {
  const makananEl = document.getElementById("menu-makanan");
  const minumanEl = document.getElementById("menu-minuman");
  makananEl.innerHTML = "";
  minumanEl.innerHTML = "";

  const reachedLimit = state.orderItems.length >= MAX_DISTINCT_ITEMS;

  MENU_ITEMS.forEach(item => {
    const container = document.createElement("div");
    container.className = "menu-card";

    const title = document.createElement("h4");
    title.textContent = item.name;
    container.appendChild(title);

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = formatRupiah(item.price);
    container.appendChild(price);

    const actions = document.createElement("div");
    actions.className = "actions";
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary";
    addBtn.type = "button";
    addBtn.textContent = "Tambah";
    const disabled = reachedLimit && !state.orderItems.some(it => it.name === item.name);
    addBtn.disabled = disabled;
    addBtn.addEventListener("click", () => addToOrder(item.name));
    actions.appendChild(addBtn);
    container.appendChild(actions);

    if (item.category === "Makanan") {
      makananEl.appendChild(container);
    } else {
      minumanEl.appendChild(container);
    }
  });
}

function renderOrder() {
  const orderContainer = document.getElementById("order-items");
  orderContainer.innerHTML = "";

  if (state.orderItems.length === 0) {
    const empty = document.createElement("div");
    empty.className = "hint";
    empty.textContent = "Belum ada item. Tambahkan dari daftar menu.";
    orderContainer.appendChild(empty);
    return;
  }

  state.orderItems.forEach(item => {
    const row = document.createElement("div");
    row.className = "order-item";

    const nameEl = document.createElement("div");
    nameEl.className = "name";
    nameEl.textContent = item.name;
    row.appendChild(nameEl);

    const qtyEl = document.createElement("div");
    qtyEl.className = "qty-input";
    const dec = document.createElement("button");
    dec.type = "button";
    dec.textContent = "−";
    dec.addEventListener("click", () => decrement(item.name));
    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.max = "99";
    input.value = String(item.quantity);
    input.addEventListener("change", e => updateQuantity(item.name, e.target.value));
    const inc = document.createElement("button");
    inc.type = "button";
    inc.textContent = "+";
    inc.addEventListener("click", () => increment(item.name));
    qtyEl.appendChild(dec);
    qtyEl.appendChild(input);
    qtyEl.appendChild(inc);
    row.appendChild(qtyEl);

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.type = "button";
    removeBtn.setAttribute("aria-label", `Hapus ${item.name}`);
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", () => removeFromOrder(item.name));
    row.appendChild(removeBtn);

    orderContainer.appendChild(row);
  });
}

function renderReceipt() {
  const linesEl = document.getElementById("receipt-lines");
  const totalsEl = document.getElementById("receipt-totals");
  linesEl.innerHTML = "";
  totalsEl.innerHTML = "";

  if (state.orderItems.length === 0) {
    const empty = document.createElement("div");
    empty.className = "hint";
    empty.textContent = "Struk akan tampil di sini.";
    linesEl.appendChild(empty);
    return;
  }

  state.orderItems.forEach(item => {
    const line1 = document.createElement("div");
    line1.className = "receipt-line";
    const name = document.createElement("div");
    name.textContent = item.name;
    const spacer = document.createElement("div");
    spacer.textContent = "";
    line1.appendChild(name);
    line1.appendChild(spacer);

    const line2 = document.createElement("div");
    line2.className = "receipt-line muted";
    const left = document.createElement("div");
    left.textContent = `${item.quantity} x ${formatRupiah(item.price)}`;
    const right = document.createElement("div");
    right.textContent = formatRupiah(item.price * item.quantity);
    line2.appendChild(left);
    line2.appendChild(right);

    linesEl.appendChild(line1);
    linesEl.appendChild(line2);
  });

  const totals = computeTotals();

  if (totals.freeDrinkDiscount > 0) {
    const promoName = document.createElement("div");
    promoName.className = "receipt-line";
    promoName.innerHTML = `<div>${totals.promoDrinkName}</div><div></div>`;
    const promoLine = document.createElement("div");
    promoLine.className = "receipt-line muted";
    promoLine.innerHTML = `<div>1 x ${formatRupiah(totals.freeDrinkDiscount)}</div><div>-${formatRupiah(totals.freeDrinkDiscount)}</div>`;
    linesEl.appendChild(promoName);
    linesEl.appendChild(promoLine);
  }

  const subtotalEl = document.createElement("div");
  subtotalEl.className = "receipt-line";
  subtotalEl.innerHTML = `<div>Subtotal</div><div>${formatRupiah(totals.subtotal)}</div>`;
  totalsEl.appendChild(subtotalEl);

  if (totals.discountTenPercent > 0) {
    const discEl = document.createElement("div");
    discEl.className = "receipt-line";
    discEl.innerHTML = `<div>Diskon 10%</div><div>-${formatRupiah(totals.discountTenPercent)}</div>`;
    totalsEl.appendChild(discEl);
  }

  if (totals.freeDrinkDiscount > 0) {
    const promoEl = document.createElement("div");
    promoEl.className = "receipt-line";
    promoEl.innerHTML = `<div>Promo ${totals.promoDrinkName}</div><div>-${formatRupiah(totals.freeDrinkDiscount)}</div>`;
    totalsEl.appendChild(promoEl);
  }

  const taxEl = document.createElement("div");
  taxEl.className = "receipt-line";
  taxEl.innerHTML = `<div>Pajak 10%</div><div>${formatRupiah(totals.tax)}</div>`;
  totalsEl.appendChild(taxEl);

  const serviceEl = document.createElement("div");
  serviceEl.className = "receipt-line";
  serviceEl.innerHTML = `<div>Biaya Pelayanan</div><div>${formatRupiah(totals.service)}</div>`;
  totalsEl.appendChild(serviceEl);

  const totalEl = document.createElement("div");
  totalEl.className = "receipt-line";
  totalEl.innerHTML = `<div><strong>Total</strong></div><div><strong>${formatRupiah(totals.total)}</strong></div>`;
  totalsEl.appendChild(totalEl);
}

function clearOrder() {
  state.orderItems = [];
  render();
}

function render() {
  renderMenu();
  renderOrder();
  renderReceipt();
}

document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clear-order");
  clearBtn.addEventListener("click", clearOrder);
  const yearEl = document.getElementById("year");
  yearEl.textContent = new Date().getFullYear();
  render();
});

