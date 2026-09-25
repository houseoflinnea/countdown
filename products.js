// OTOMATİK ÜRETİLDİ: elle düzenleme, data/products.json'u düzenleyip `node scripts/add-product.js` ya da
// `node scripts/build.js` çalıştır. Ürün başına sabit sayaç stili; müşteri göremez, değiştiremez.
const PRODUCTS = {
  "3-page-blue-photobooth": {
    "name": "3 Page Blue Photobooth",
    "ratio": 4,
    "style": {
      "language": "en",
      "font": "Xanh Mono",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "odhms",
      "digits_color": "#d6cec0",
      "last_unit_color": "#d6cec0",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "3-page-brown-photobooth": {
    "name": "3 Page Brown Photobooth",
    "ratio": 4,
    "style": {
      "language": "en",
      "font": "Xanh Mono",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "odhms",
      "digits_color": "#f3e8de",
      "last_unit_color": "#fffefd",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "3-page-burgundry-photobooth": {
    "name": "3 Page Burgundry Photobooth",
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
  "3-page-cream-photobooth": {
    "name": "3 Page Cream Photobooth",
    "ratio": 4,
    "style": {
      "language": "en",
      "font": "Xanh Mono",
      "show_name": "false",
      "name": "My countdown",
      "name_color": "#995c19",
      "show_units": "true",
      "units": "odhms",
      "digits_color": "#654545",
      "last_unit_color": "#654545",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
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
  "5-page-blue-photobooth": {
    "name": "5 Page Blue Photobooth",
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
      "last_unit_color": "#f1e2d5",
      "layout": "vertical",
      "bg_color": "rgba(255,255,255,0)",
      "border_color": "#e6e6e6",
      "border_width": "0",
      "widget_height": "25%",
      "widget_horizontal_padding": "0%"
    }
  },
  "5-page-brown-photobooth": {
    "name": "5 Page Brown Photobooth",
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
  "5-page-burgundry-photobooth": {
    "name": "5 Page Burgundry Photobooth",
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
  "5-page-cream-photobooth": {
    "name": "5 Page Cream Photobooth",
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
  },
  "5-page-sage-green-envelope-wax-seal": {
    "name": "5 Page Sage Green Envelope Wax Seal",
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

if (typeof module === "object" && module.exports) module.exports = { PRODUCTS };
