// OTOMATİK ÜRETİLDİ: elle düzenleme, data/products.json'u düzenleyip `node scripts/add-product.js` ya da
// `node scripts/build.js` çalıştır. Ürün başına sabit sayaç stili; müşteri göremez, değiştiremez.
const PRODUCTS = {
  "blue-photobooth": {
    "name": "Blue Photobooth",
    "ratio": 4,
    "style": {
      "language": "en",
      "font": "Xanh Mono",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "odhms",
      "digits_color": "#e6d6c9",
      "last_unit_color": "#e6d6c9",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "brown-photobooth": {
    "name": "Brown Photobooth",
    "ratio": 4,
    "style": {
      "language": "en",
      "font": "Xanh Mono",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "odhms",
      "digits_color": "#cdbeaf",
      "last_unit_color": "#cdbeaf",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "burgundy-photobooth": {
    "name": "Burgundy Photobooth",
    "ratio": 4,
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
  "cream-photobooth": {
    "name": "Cream Photobooth",
    "ratio": 4,
    "style": {
      "language": "en",
      "font": "Xanh Mono",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "odhms",
      "digits_color": "#6b313a",
      "last_unit_color": "#6b313a",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "green-photobooth": {
    "name": "Green Photobooth",
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
      "last_unit_color": "#efe9db",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "ivory-envelope-wax-seal-swan": {
    "name": "Ivory Envelope Wax Seal Swan",
    "ratio": 4,
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
  "ivory-lace-envelope": {
    "name": "Ivory Lace Envelope",
    "ratio": 4,
    "style": {
      "language": "en",
      "font": "Courier New",
      "show_name": "false",
      "name": "To Our Date",
      "name_color": "#cc988f",
      "show_units": "true",
      "units": "dhms",
      "digits_color": "#cc988f",
      "last_unit_color": "#cc988f",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "sage-green-envelope-wax-seal": {
    "name": "Sage Green Envelope Wax Seal",
    "ratio": 4,
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
  }
};

// Eski kod → güncel kod: daha önce dağıtılmış guidebook linkleri çalışmaya devam etsin
const ALIASES = {
  "3-page-blue-photobooth": "blue-photobooth",
  "5-page-blue-photobooth": "blue-photobooth",
  "3-page-brown-photobooth": "brown-photobooth",
  "5-page-brown-photobooth": "brown-photobooth",
  "3-page-burgundy-photobooth": "burgundy-photobooth",
  "5-page-burgundy-photobooth": "burgundy-photobooth",
  "3-page-cream-photobooth": "cream-photobooth",
  "5-page-cream-photobooth": "cream-photobooth",
  "3-page-green-photobooth": "green-photobooth",
  "5-page-green-photobooth": "green-photobooth",
  "3-page-ivory-envelope-wax-seal-swan": "ivory-envelope-wax-seal-swan",
  "5-page-ivory-envelope-wax-seal-swan": "ivory-envelope-wax-seal-swan",
  "3-page-lace-envelope": "ivory-lace-envelope",
  "5-page-ivory-lace-envelope": "ivory-lace-envelope",
  "3-page-sage-green-envelope-wax-seal": "sage-green-envelope-wax-seal",
  "5-page-sage-green-envelope-wax-seal": "sage-green-envelope-wax-seal"
};

if (typeof module === "object" && module.exports) module.exports = { PRODUCTS, ALIASES };
