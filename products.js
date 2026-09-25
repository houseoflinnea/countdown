// OTOMATİK ÜRETİLDİ: elle düzenleme, data/products.json'u düzenleyip `node scripts/add-product.js` ya da
// `node scripts/build.js` çalıştır. Ürün başına sabit sayaç stili; müşteri göremez, değiştiremez.
const PRODUCTS = {
  "hl-01": {
    "name": "Ivory Old Money Lace",
    "style": {
      "language": "en",
      "show_name": "false",
      "name": "Wedding",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%",
      "font": "Roboto Mono",
      "name_color": "#ffffff",
      "show_units": "false",
      "units": "dhms",
      "digits_color": "#ffffff",
      "last_unit_color": "#ffffff",
      "layout": "horizontal"
    }
  },
  "hl-02": {
    "name": "Sage Green Wax Seal",
    "style": {
      "language": "en",
      "font": "Times New Roman",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "dhms",
      "digits_color": "#995c19",
      "last_unit_color": "#995c19",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "hl-03": {
    "name": "Burgundy Photobooth",
    "style": {
      "language": "en",
      "font": "Xanh Mono",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "odhms",
      "digits_color": "#ddd0ca",
      "last_unit_color": "#ddd0ca",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "hl-04": {
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
  "hl-05": {
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
