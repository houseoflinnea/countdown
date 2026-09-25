// OTOMATİK ÜRETİLDİ: elle düzenleme, data/products.json'u düzenleyip `node scripts/add-product.js` ya da
// `node scripts/build.js` çalıştır. Ürün başına sabit sayaç stili; müşteri göremez, değiştiremez.
const PRODUCTS = {
  "3-page-green-photobooth": {
    "name": "3 Page Green Photobooth",
    "ratio": 4,
    "style": {
      "language": "en",
      "font": "Xanh Mono",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "odhms",
      "digits_color": "#efe9db",
      "last_unit_color": "#fffefd",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "5-page-green-photobooth": {
    "name": "5 Page Green Photobooth",
    "ratio": 4,
    "style": {
      "language": "en",
      "font": "Xanh Mono",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "odhms",
      "digits_color": "#efe9db",
      "last_unit_color": "#fffefd",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  }
};

if (typeof module === "object" && module.exports) module.exports = { PRODUCTS };
