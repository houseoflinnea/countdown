// TickCounter embed linki üretir. Tarayıcıda window.CountdownLink, Node'da module.exports.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.CountdownLink = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const BASE = "https://www.tickcounter.com/embed/countdown?c=";

  // Eski Canva app linkleriyle aynı alan sırası.
  const STYLE_KEYS = [
    "language", "font", "show_name", "name", "name_color", "show_units", "units",
    "digits_color", "last_unit_color", "layout", "bg_color", "border_color",
    "border_width", "widget_height", "widget_horizontal_padding",
  ];

  // "2027-07-17" + "09:05" → "2027-07-17 9:05:00" (TickCounter saati sıfırsız yazıyor)
  function formatDt(date, time) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Invalid date: " + date);
    const m = /^(\d{1,2}):(\d{2})$/.exec(time);
    if (!m || +m[1] > 23 || +m[2] > 59) throw new Error("Invalid time: " + time);
    return `${date} ${Number(m[1])}:${m[2]}:00`;
  }

  function base64url(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (const b of bytes) bin += String.fromCharCode(b);
    const b64 = typeof btoa === "function" ? btoa(bin) : Buffer.from(bytes).toString("base64");
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function buildConfig(style, { date, time, timeZone }) {
    if (!timeZone) throw new Error("Time zone is required");
    const config = { dt: formatDt(date, time), timezone: timeZone };
    for (const key of STYLE_KEYS) if (key in style) config[key] = style[key];
    return config;
  }

  function buildLink(style, choice) {
    return BASE + base64url(JSON.stringify(buildConfig(style, choice)));
  }

  return { buildLink, buildConfig, formatDt, STYLE_KEYS };
});
