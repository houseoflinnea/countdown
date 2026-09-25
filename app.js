(function () {
  const $ = (id) => document.getElementById(id);
  const slug = new URLSearchParams(location.search).get("p");
  const product = slug && Object.prototype.hasOwnProperty.call(PRODUCTS, slug) ? PRODUCTS[slug] : null;

  if (!product) { $("missing").hidden = false; return; }
  $("app").hidden = false;
  $("product-name").textContent = product.name;
  document.title = `Countdown Setup · ${product.name} · House of Linnea`;
  $("preview").style.backgroundImage = `url("backgrounds/${slug}.jpg")`;
  if (product.ratio) $("preview").style.aspectRatio = String(product.ratio); // sitedeki sayaç kutusuyla aynı oran
  // Boş önizleme yazısı sayacın kendi rengini alır: o renk zaten bu ürünün zemininde okunacak şekilde seçilmiş
  if (product.style.digits_color) $("preview-empty").style.color = product.style.digits_color;

  function weddingInstant() {
    const d = $("date").value;
    return d ? new Date(`${d}T12:00:00Z`) : new Date();
  }

  // --- Saat dilimi seçici. Varsayılan: müşterinin kendi saat dilimi (listede yoksa seçici New York'a düşer)
  const picker = ZonePicker.create({
    input: $("tz"),
    list: $("tz-list"),
    toggle: $("tz-toggle"),
    getInstant: weddingInstant, // yaz saati farkı düğün tarihine göre gösterilsin
    onChange: () => update(),
    places: PLACES,
    countryAliases: COUNTRY_ALIASES,
    ianaZones: Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : [],
    allowedZones: TICKCOUNTER_ZONES,
    initialZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    fallbackZone: "America/New_York",
  });

  // --- Güncelleme
  let timer = null;
  let currentLink = "";

  function update() {
    const date = $("date").value;
    const time = $("time").value;
    const zone = picker.getZone();

    $("date-hint").className = "hint";
    $("date-hint").textContent = "";

    if (!date || !time || !zone) return setLink("");

    const link = CountdownLink.buildLink(product.style, { date, time, timeZone: zone });
    const target = zonedToUtc(date, time, zone);
    if (target && target.getTime() < Date.now()) {
      $("date-hint").className = "hint warn";
      $("date-hint").textContent = "This date is in the past. Double-check the year.";
    }
    setLink(link);
  }

  // Seçilen yerel saatin UTC karşılığı (sadece geçmiş tarih uyarısı için)
  function zonedToUtc(date, time, zone) {
    try {
      const guess = new Date(`${date}T${time}:00Z`);
      const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
        timeZone: zone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      }).formatToParts(guess).map((p) => [p.type, p.value]));
      const asZone = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
      return new Date(guess.getTime() - (asZone - guess.getTime()));
    } catch { return null; }
  }

  function setLink(link) {
    if (link === currentLink) return;
    currentLink = link;
    $("link").value = link;
    $("copy").disabled = !link;
    resetCopy();
    clearTimeout(timer);
    timer = setTimeout(() => renderPreview(link), 350);
  }

  function renderPreview(link) {
    const box = $("preview");
    const old = box.querySelector("iframe");
    if (old) old.remove();
    $("preview-empty").hidden = !!link;
    $("preview-cover").hidden = !link; // logo örtüsü sadece sayaç varken gerekli, boşken kenarı çizgi gibi görünüyordu
    if (!link) return;
    const frame = document.createElement("iframe");
    frame.title = "Countdown preview";
    frame.src = link;
    frame.setAttribute("allowtransparency", "true");
    // allow-same-origin olmadan TickCounter kendi yazı tipini yükleyemiyor (yedek fonta düşüyordu).
    // Bu iki izinle çerçeve normal bir iframe gibi davranır ama sayfamıza erişemez (farklı site),
    // pencere açamaz, form gönderemez, sayfayı başka yere yönlendiremez.
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
    frame.referrerPolicy = "no-referrer";
    frame.addEventListener("error", () => {
      $("preview-empty").hidden = false;
      $("preview-empty").textContent = "Preview unavailable, but your link still works.";
    });
    box.insertBefore(frame, $("preview-cover"));
  }

  // --- Kopyalama
  async function copy() {
    if (!currentLink) return;
    try {
      await navigator.clipboard.writeText(currentLink);
    } catch {
      $("link").focus();
      $("link").select();
      try { document.execCommand("copy"); } catch { /* seçili bırakıldı, elle kopyalanabilir */ }
    }
    $("copy").textContent = "Copied ✓";
    $("copy").classList.add("done");
  }

  function resetCopy() {
    $("copy").textContent = "Copy my countdown link";
    $("copy").classList.remove("done");
  }

  $("date").addEventListener("change", () => { picker.refresh(); update(); });
  ["input", "change"].forEach((ev) => $("time").addEventListener(ev, update));
  $("copy").addEventListener("click", copy);
  update();
})();
