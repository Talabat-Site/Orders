const $=s=>document.querySelector(s);
const F=$('#f'),WA='201043635659',KEY='tl_cust',el=n=>F.elements[n];
const ar2en=s=>s.replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const val=()=>({cust:el('cust').value.trim(),phone:ar2en(el('phone').value).replace(/[^\d+]/g,''),addr:el('addr').value.trim(),items:el('items').value.trim()});
function msg(v){
  const d=new Date(),p=n=>String(n).padStart(2,'0'),t=`${p(d.getDate())}/${p(d.getMonth()+1)}/${d.getFullYear()} - ${p(d.getHours())}:${p(d.getMinutes())}`,L='--------------------------';
  return ['✨ *طلب جديد من موقع طلبات* ✨',L,'👤 *الاسم:* '+(v.cust||'...'),'📞 *التليفون:* '+(v.phone||'...'),'📍 *العنوان:* '+(v.addr||'...'),L,'🛍️ *الطلب:*',v.items||'...',L,'🕒 '+t,'شكرًا لثقتكم 🌹'].join('\n');
}
function preview(){$('#bub').innerHTML=esc(msg(val())).replace(/\*([^*\n]+)\*/g,'<b>$1</b>')}
try{const s=JSON.parse(localStorage.getItem(KEY)||'{}');['cust','phone','addr'].forEach(k=>{if(s[k])el(k).value=s[k]})}catch(e){}
F.addEventListener('input',()=>{
  preview();$('#err').textContent='';$('#ok').textContent='';
  try{const v=val();localStorage.setItem(KEY,JSON.stringify({cust:v.cust,phone:el('phone').value,addr:v.addr}))}catch(e){}
});
function check(){
  const v=val();let bad='',f='';
  if(!v.cust){bad='اكتب اسمك';f='cust'}
  else if(!/^\+?\d{8,15}$/.test(v.phone)){bad='اكتب رقم تليفون صحيح';f='phone'}
  else if(!v.addr){bad='اكتب عنوانك بالتفصيل';f='addr'}
  else if(!v.items){bad='اكتب إنت عايز إيه';f='items'}
  $('#err').textContent=bad;
  if(bad){el(f).focus();return null}
  return v;
}
$('#wa').onclick=()=>{
  const v=check();if(!v)return;
  const q=encodeURIComponent(msg(v)),mob=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const url=mob?'https://wa.me/'+WA+'?text='+q:'https://web.whatsapp.com/send?phone='+WA+'&text='+q;
  const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();
  $('#ok').textContent='اتفتح واتساب، اضغط إرسال علشان طلبك يوصلنا.';
};
$('#cp').onclick=async()=>{
  const v=check();if(!v)return;const t=msg(v);
  try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(x){}a.remove()}
  $('#ok').textContent='اتنسخت الرسالة، الصقها في واتساب.';
};
preview();
