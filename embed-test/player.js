// Canva gömme testi: canlı sayıyorsa Canva sayfayı gerçek çerçeve olarak gösteriyor demektir
const target = Date.parse("2027-06-12T16:00:00-04:00");
const pad = (n) => String(n).padStart(2, "0");
function tick() {
  let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600); s %= 3600;
  document.getElementById("c").textContent = `${d} : ${pad(h)} : ${pad(Math.floor(s / 60))} : ${pad(s % 60)}`;
}
tick(); setInterval(tick, 1000);
