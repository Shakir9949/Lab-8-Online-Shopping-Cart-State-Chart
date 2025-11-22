// script.js
const products = [
{id:1, name:'Tactical Backpack', price:49.99},
{id:2, name:'Energy Cell', price:9.99},
{id:3, name:'Hunter Cloak', price:79.99},
{id:4, name:'Auto Rifle', price:199.99}
];


const VALID_COUPONS = {
'SAVE10': 0.10, // 10% off
'FIVEOFF': 5.00 // $5 off
};


let cart = [];
let appliedCoupon = null;


// Elements
const productList = document.getElementById('productList');
const productTpl = document.getElementById('productTpl');
const cartItems = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const discountEl = document.getElementById('discount');
const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCoupon');
const viewSummaryBtn = document.getElementById('viewSummary');
const checkoutBtn = document.getElementById('checkoutBtn');
const cancelBtn = document.getElementById('cancelBtn');
const messageEl = document.getElementById('message');


function format(n){return `$${n.toFixed(2)}`}


function renderProducts(){
products.forEach(p=>{
const node = productTpl.content.cloneNode(true);
node.querySelector('.title').textContent = p.name;
node.querySelector('.price').textContent = format(p.price);
const btn = node.querySelector('.add');
btn.addEventListener('click',()=> addToCart(p.id));
productList.appendChild(node);
})
}


function addToCart(productId){
const p = products.find(x=>x.id===productId);
const existing = cart.find(c=>c.id===productId);
if(existing){ existing.qty += 1; }
else cart.push({id:p.id, name:p.name, price:p.price, qty:1});
showMessage(`${p.name} added to cart`);
renderCart();
}


function removeFromCart(productId){
cart = cart.filter(i=>i.id!==productId);
showMessage('Item removed');
renderCart();
}


function renderCart(){
cartItems.innerHTML = '';
cart.forEach(item=>{
const row = document.createElement('div');
row.className = 'cart-row';
row.innerHTML = `
<div>
<div><strong>${item.name}</strong></div>
<div class="qty">${item.qty} × ${format(item.price)}</div>
</div>
<div>
<button class="remove">Remove</button>
</div>`;
row.querySelector('.remove').addEventListener('click',()=> removeFromCart(item.id));
cartItems.appendChild(row);
});
updateSummary();
}


function updateSummary(){
const subtotal = cart.reduce((s,i)=>s + (i.price * i.qty), 0);
let discount = 0;
if(appliedCoupon){
renderCart();