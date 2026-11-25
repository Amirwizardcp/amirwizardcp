const RUBIKA_URL = "https://rubika.ir/Amir_wizarde";
const products = [
 {id:1,name:"۸۰ + ۸۰ CP",amount:"۱۶۰ سی‌پی",price:314900,old:599900,desc:"بسته اقتصادی"},
 {id:2,name:"۴۰۰ + ۴۰۰ CP",amount:"۸۰۰ سی‌پی",price:1359900,old:1699900,desc:"بسته محبوب"},
 {id:3,name:"۸۰۰ + ۸۰۰ CP",amount:"۱۶۰۰ سی‌پی",price:2569900,old:3199900,desc:"برای خریدهای بیشتر"},
 {id:4,name:"۲۰۰۰ + ۲۰۰۰ CP",amount:"۴۰۰۰ سی‌پی",price:6299900,old:8199900,desc:"بسته ویژه"},
 {id:5,name:"بسته CP سفارشی ۱",amount:"جزئیات با پشتیبانی",price:0,old:0,desc:"قیمت و موجودی نیازمند تأیید",disabled:true},
 {id:6,name:"بسته CP سفارشی ۲",amount:"جزئیات با پشتیبانی",price:0,old:0,desc:"قیمت و موجودی نیازمند تأیید",disabled:true},
 {id:7,name:"بسته CP سفارشی ۳",amount:"جزئیات با پشتیبانی",price:0,old:0,desc:"قیمت و موجودی نیازمند تأیید",disabled:true},
 {id:8,name:"بسته CP سفارشی ۴",amount:"جزئیات با پشتیبانی",price:0,old:0,desc:"قیمت و موجودی نیازمند تأیید",disabled:true}
];
let cart = [];
const fmt = n => new Intl.NumberFormat("fa-IR").format(n);
const productsEl = document.getElementById("products");
productsEl.innerHTML = products.map(p => `<article class="product"><div class="cp-icon"><span>CP</span></div><h3>${p.name}</h3><div class="desc">${p.amount} · ${p.desc}</div><div class="price">${p.price ? fmt(p.price)+" تومان" : "به‌زودی"}</div><div class="old">${p.old ? fmt(p.old)+" تومان" : " "}</div><button class="add-btn" ${p.disabled?"disabled":""} data-add="${p.id}">${p.disabled?"فعلاً غیرفعال":"افزودن به سبد"}</button></article>`).join("");
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 document.getElementById("cartCount").textContent=fmt(count);
 document.getElementById("cartTotal").textContent=fmt(total)+" تومان";
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><div><b>${x.name}</b><br><span class="muted">${fmt(x.price)} تومان</span></div><div class="qty"><button data-dec="${x.id}">−</button><b>${fmt(x.qty)}</b><button data-inc="${x.id}">+</button></div></div>`).join(""):"<p class='muted'>سبد خریدت هنوز خالیه.</p>";
}
productsEl.addEventListener("click",e=>{const id=Number(e.target.dataset.add);if(!id)return;const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...p,qty:1});renderCart();document.getElementById("cartModal").hidden=false;});
document.getElementById("cartItems").addEventListener("click",e=>{const inc=Number(e.target.dataset.inc),dec=Number(e.target.dataset.dec);if(inc){cart.find(x=>x.id===inc).qty++;}if(dec){const item=cart.find(x=>x.id===dec);item.qty--;if(item.qty<=0)cart=cart.filter(x=>x.id!==dec);}renderCart();});
document.getElementById("openCart").onclick=()=>{renderCart();document.getElementById("cartModal").hidden=false;};
document.getElementById("closeCart").onclick=()=>document.getElementById("cartModal").hidden=true;
document.getElementById("cartModal").addEventListener("click",e=>{if(e.target.id==="cartModal")e.currentTarget.hidden=true;});
document.getElementById("checkout").onclick=async()=>{
 if(!cart.length){alert("سبد خرید خالی است.");return;}
 const player=document.getElementById("playerId").value.trim();
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 const lines=cart.map(x=>`- ${x.name} × ${fmt(x.qty)} = ${fmt(x.price*x.qty)} تومان`).join("\n");
 const msg=`سلام، برای ثبت سفارش از AmirWizardCP پیام می‌دهم:\n${lines}\nمجموع: ${fmt(total)} تومان\nآیدی بازی: ${player||"اعلام نشده"}\nلطفاً موجودی و مبلغ نهایی را تأیید کنید.`;
 try{await navigator.clipboard.writeText(msg);alert("متن سفارش کپی شد. در روبیکا آن را برای پشتیبانی ارسال کن.");}
 catch(e){prompt("متن سفارش را کپی کن:",msg);}
 window.open(RUBIKA_URL,"_blank","noopener");
};
renderCart();