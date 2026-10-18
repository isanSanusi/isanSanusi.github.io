/* Halaman: contact */
V.contact =
  () => `<div class="wrap"><section><span class="eyebrow">Contact</span><h1 style="font-size:clamp(2rem,5vw,3.4rem)">Mari berkolaborasi.</h1><div class="two" style="margin-top:32px"><div><p>Email: <a href="mailto:${SITE.email}" style="color:var(--web);text-decoration:underline">${SITE.email}</a> (placeholder)</p><p>Sosial: GitHub · Behance · LinkedIn (tautan belum diisi)</p><div class="note">Formulir ini demonstrasi frontend: validasi berjalan di browser, tetapi tidak ada data yang dikirim ke server. Setelah valid, Anda dapat membuka email lewat tautan.</div></div>
<form id="fm" novalidate><div class="fld"><label for="n">Nama</label><input id="n" autocomplete="name"><div class="err" id="en"></div></div><div class="fld"><label for="e">Email</label><input id="e" type="email" autocomplete="email"><div class="err" id="ee"></div></div><div class="fld"><label for="m">Pesan</label><textarea id="m"></textarea><div class="err" id="em"></div></div><button class="btn pri" type="submit">Validasi pesan</button><div id="ok" role="status" style="margin-top:16px"></div></form></div></section></div>`;
V.contact.init = () => {
  $("#fm").onsubmit = (e) => {
    e.preventDefault();
    const n = $("#n").value.trim(),
      m = $("#m").value.trim(),
      em = $("#e").value.trim();
    $("#en").textContent = n.length < 2 ? "Isi nama minimal 2 karakter." : "";
    $("#ee").textContent = /^\S+@\S+\.\S+$/.test(em)
      ? ""
      : "Masukkan email yang valid.";
    $("#em").textContent = m.length < 10 ? "Pesan minimal 10 karakter." : "";
    const ok = n.length >= 2 && /^\S+@\S+\.\S+$/.test(em) && m.length >= 10;
    $("#ok").innerHTML = ok
      ? `<div class="note">Input valid. Prototype tidak mengirim pesan. <a style="color:var(--web);text-decoration:underline" href="mailto:${SITE.email}?subject=${encodeURIComponent("Halo dari " + n)}&body=${encodeURIComponent(m + "\n\n" + em)}">Buka aplikasi email →</a></div>`
      : "";
  };
};
