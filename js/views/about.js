/* Halaman: about */
V.about = () => `
    <div class="wrap">
      <section>
        <span class="eyebrow">About</span>
        <h1 style="font-size:clamp(2rem,5vw,3.4rem)">Halo, saya ${SITE.name}.</h1>
        <div class="two" style="margin-top:32px">
          <div class="prose">
            <p>Placeholder perkenalan: siapa Anda, apa fokus Anda, dan mengapa Anda mengerjakan tiga bidang ini.</p>
            <h2>Perjalanan belajar</h2>
            <p>Ceritakan bagaimana Anda mulai dan apa yang sedang dipelajari. (Isi dengan cerita Anda sendiri.)</p>
            <h2>Prinsip kerja</h2>
            <ul>
              <li>Jelas lebih dulu, indah kemudian.</li>
              <li>Dokumentasikan proses, bukan hanya hasil.</li>
              <li>Bangun yang mudah dirawat.</li>
            </ul>
          </div>
          <div>
${Object.entries(CATS)
  .map(
    ([k, c]) =>
      `
            <div class="side" data-cat="${k}" style="margin-bottom:12px">
              <h3 style="color:var(--a)">${c.n}</h3>
              <div>
              ${c.w.join(" · ")}
              </div>
            </div>`,
  )
  .join("")}
            <p style="margin-top:20px">
              <a class="btn" href="#/portfolio">Proyek unggulan →</a>
              <a class="btn pri" href="#/contact">Hubungi saya</a>
            </p>
          </div>
        </div>
      </section>
    </div>`;
