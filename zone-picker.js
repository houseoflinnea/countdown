// Aranabilir saat dilimi seçici (combobox). Tarayıcının <datalist>'i yerine:
// liste her açılışta tümüyle görünür, ülke/destinasyon adıyla aranır, sayfanın içinde açılır.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ZonePicker = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  function isValidZone(zone) {
    try { new Intl.DateTimeFormat("en-US", { timeZone: zone }); return true; } catch { return false; }
  }

  function offsetLabel(zone, at) {
    try {
      const part = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "shortOffset" })
        .formatToParts(at).find((p) => p.type === "timeZoneName");
      return part ? part.value : "";
    } catch { return ""; }
  }

  // Tarayıcılar (ICU) bazı şehirleri eski adıyla veriyor; müşteri güncel adla arar.
  const MODERN_ZONE = {
    "Asia/Katmandu": "Asia/Kathmandu", "Asia/Calcutta": "Asia/Kolkata", "Asia/Saigon": "Asia/Ho_Chi_Minh",
    "Europe/Kiev": "Europe/Kyiv", "Asia/Rangoon": "Asia/Yangon", "America/Godthab": "America/Nuuk",
    "Africa/Asmera": "Africa/Asmara", "Atlantic/Faeroe": "Atlantic/Faroe", "Pacific/Enderbury": "Pacific/Kanton",
    "Pacific/Truk": "Pacific/Chuuk", "Pacific/Ponape": "Pacific/Pohnpei", "Europe/Uzhgorod": "Europe/Kyiv",
    "Europe/Zaporozhye": "Europe/Kyiv",
  };

  // Seçenek listesi: önce el ile seçilmiş destinasyonlar, sonra tarayıcının bildiği tüm şehirler (tekrarsız)
  // allowedZones: TickCounter'ın tanıdığı adlar; verilmezse filtre yok
  function buildOptions(places, countryAliases, ianaZones, allowedZones) {
    const allowed = (z) => isValidZone(z) && (!allowedZones || allowedZones.includes(z));
    const options = [];
    const seen = new Set();
    for (const p of places) {
      if (!allowed(p.zone)) continue;
      const terms = [p.name, p.country, ...(p.aliases || []), ...(countryAliases[p.country] || [])];
      options.push({ name: p.name, detail: p.country, zone: p.zone, popular: !!p.popular, terms: terms.map(norm) });
      seen.add(`${norm(p.name)}|${p.zone}`);
    }
    const curatedNames = options.map((o) => ({ name: norm(o.name), zone: o.zone }));
    for (const raw of ianaZones) {
      const zone = MODERN_ZONE[raw] && allowed(MODERN_ZONE[raw]) ? MODERN_ZONE[raw] : raw;
      if (!zone.includes("/") || zone.startsWith("Etc/") || !allowed(zone)) continue;
      const name = zone.split("/").pop().replace(/_/g, " ");
      const key = norm(name);
      // "Ho Chi Minh" gibi, el ile eklenen "Ho Chi Minh City" ile aynı yer → tekrar etme
      if (seen.has(`${key}|${zone}`) || curatedNames.some((c) => c.zone === zone && c.name.startsWith(key))) continue;
      seen.add(`${key}|${zone}`);
      const region = zone.split("/")[0].replace(/_/g, " ");
      options.push({ name, detail: region, zone, popular: false, terms: [norm(name), norm(region), norm(zone)] });
    }
    return options;
  }

  // Sıralama: ad başlangıcı > kelime başlangıcı > içerir; eşitlikte popüler ve el ile eklenenler önce
  function search(options, query) {
    const q = norm(query);
    if (!q) return null;
    const scored = [];
    options.forEach((o, i) => {
      let best = 0;
      o.terms.forEach((t, ti) => {
        let s = 0;
        if (t === q) s = 4;
        else if (t.startsWith(q)) s = 3;
        else if (t.split(" ").some((w) => w.startsWith(q))) s = 2;
        else if (t.includes(q)) s = 1;
        if (s && ti === 0) s += 0.5; // ad eşleşmesi ülke eşleşmesinden önce
        best = Math.max(best, s);
      });
      if (best) scored.push({ o, score: best + (o.popular ? 0.2 : 0), i });
    });
    scored.sort((a, b) => b.score - a.score || a.i - b.i);
    return scored.map((s) => s.o);
  }

  function create({ input, list, toggle, getInstant, onChange, places, countryAliases, ianaZones, allowedZones, initialZone, fallbackZone }) {
    const options = buildOptions(places, countryAliases, ianaZones, allowedZones);
    const pick = (zone) => {
      const z = MODERN_ZONE[zone] || zone;
      return options.find((o) => o.zone === z && o.popular) || options.find((o) => o.zone === z) || null;
    };
    let selected = pick(initialZone) || (fallbackZone ? pick(fallbackZone) : null);
    let visible = [];
    let active = -1;
    let open = false;

    const labelOf = (o) => `${o.name}, ${o.detail} (${offsetLabel(o.zone, getInstant())})`;

    function showSelected() {
      input.value = selected ? labelOf(selected) : "";
    }

    function render(query) {
      list.textContent = "";
      const results = search(options, query);
      const groups = results
        ? [{ title: results.length ? null : "No matches. Try a nearby city or your country.", items: results.slice(0, 80) }]
        : [
            { title: "Popular wedding destinations", items: options.filter((o) => o.popular) },
            { title: "All locations", items: options.filter((o) => !o.popular).sort((a, b) => a.name.localeCompare(b.name)) },
          ];
      visible = [];
      const at = getInstant();
      for (const g of groups) {
        if (g.title) {
          const h = document.createElement("li");
          h.className = "zp-group";
          h.setAttribute("role", "presentation");
          h.textContent = g.title;
          list.appendChild(h);
        }
        for (const o of g.items) {
          const li = document.createElement("li");
          li.id = `zp-opt-${visible.length}`;
          li.className = "zp-option";
          li.setAttribute("role", "option");
          li.dataset.index = visible.length;
          if (selected === o) li.setAttribute("aria-selected", "true");
          const name = document.createElement("span");
          name.className = "zp-name";
          name.textContent = o.name;
          const detail = document.createElement("span");
          detail.className = "zp-detail";
          detail.textContent = `${o.detail} · ${offsetLabel(o.zone, at)}`;
          li.append(name, detail);
          list.appendChild(li);
          visible.push(o);
        }
      }
      setActive(results ? (visible.length ? 0 : -1) : visible.indexOf(selected));
      if (!results) list.scrollTop = 0; // tam liste en üstten, "Popular" başlığıyla başlasın
    }

    function setActive(i) {
      const prev = list.querySelector(".zp-option.active");
      if (prev) prev.classList.remove("active");
      active = i;
      if (i < 0) { input.removeAttribute("aria-activedescendant"); return; }
      const el = document.getElementById(`zp-opt-${i}`);
      if (!el) return;
      el.classList.add("active");
      input.setAttribute("aria-activedescendant", el.id);
      el.scrollIntoView({ block: "nearest" });
    }

    function openList(query = "") {
      open = true;
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      render(query);
    }

    function closeList() {
      open = false;
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      showSelected();
    }

    function choose(o) {
      selected = o;
      closeList();
      onChange(o.zone);
    }

    input.addEventListener("focus", () => { input.select(); openList(); });
    input.addEventListener("click", () => { if (!open) { input.select(); openList(); } });
    input.addEventListener("input", () => {
      // Müşteri seçili etiketin içine tıklayıp yazarsa etiket aramaya karışmasın
      const label = selected ? labelOf(selected) : "";
      let query = input.value;
      if (label && query !== label) {
        if (query.startsWith(label)) query = query.slice(label.length);   // sonuna yazdı
        else if (label.startsWith(query)) query = "";                     // sonundan sildi
        input.value = query;
      }
      openList(query);
    });
    input.addEventListener("blur", () => { if (open) closeList(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!open) return openList();
        const step = e.key === "ArrowDown" ? 1 : -1;
        setActive(Math.max(0, Math.min(visible.length - 1, active + step)));
      } else if (e.key === "Enter") {
        if (open && visible[active]) { e.preventDefault(); choose(visible[active]); }
      } else if (e.key === "Escape") {
        if (open) { e.preventDefault(); closeList(); }
      }
    });
    // mousedown input'un blur olmasını engeller, böylece tıklama seçimi kaybolmaz
    list.addEventListener("mousedown", (e) => e.preventDefault());
    list.addEventListener("click", (e) => {
      const li = e.target.closest(".zp-option");
      if (li) choose(visible[Number(li.dataset.index)]);
    });
    if (toggle) {
      toggle.addEventListener("mousedown", (e) => e.preventDefault());
      toggle.addEventListener("click", () => {
        if (open) closeList();
        else if (document.activeElement === input) openList();
        else input.focus();
      });
    }

    showSelected();
    return {
      getZone: () => (selected ? selected.zone : null),
      refresh: () => { if (open) render(input.value); else showSelected(); },
    };
  }

  return { create, search, buildOptions, norm };
});
