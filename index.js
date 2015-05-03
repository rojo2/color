var names = require("./names");

function Color(r,g,b,a) {
  this.r = r || 0;
  this.g = g || 0;
  this.b = b || 0;
  this.a = a || 1;
}

Color.MAX_KELVIN = 40000;
Color.MIN_KELVIN = 1000;
Color.ONE_THIRD = 1 / 3;
Color.TWO_THIRDS = 2 / 3;

Color.interpolate = function(a,b,p,r) {
  r = r || new Color();
  r.r = a.r + ((b.r - a.r) * p);
  r.g = a.g + ((b.g - a.g) * p);
  r.b = a.b + ((b.b - a.b) * p);
  r.a = a.a + ((b.a - a.a) * p);
  return r;
};

Color.clamp = function(v,min,max) {
  if (v < min) return min;
  if (v > max) return max;
  return v;
};

Color.normalizeHue = function(h) {
  return ((h % 360) + 360) % 360;
};

Color.hue = function(m1,m2,h) {
  if (h < 0) {
    h += 1;
  }

  if (h > 1) {
    h -= 1;
  }

  if (h * 6 < 1) {
    return m1 + (m2 - m1) * h * 6;
  }

  if (h * 2 < 1) {
    return m2;
  }

  if (h * 3 < 2) {
    return m1 + (m2 - m1) * (Color.TWO_THIRDS - h) * 6;
  }

  return m1;
};

Color.random = function(alpha) {
  alpha = alpha || false;
  return new Color(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
      alpha === true ? Math.random() : 1
  );
};

Color.fromHSL = function(h,s,l) {
  h = Color.normalizeHue(h) / 360;
  s = s / 100;
  l = l / 100;

  var m2, m1;
  if (l <= 0.5) {
    m2 = l * (s + 1);
  } else {
    m2 = l + s - l * s;
  }

  m1 = l * 2 - m2;
  var r = Color.hue(m1, m2, h + Color.ONE_THIRD);
  var g = Color.hue(m1, m2, h);
  var b = Color.hue(m1, m2, h - Color.ONE_THIRD);
  return new Color(Color.toByte(r), Color.toByte(g), Color.toByte(b));
};

Color.fromByte = function(value) {
  return value / 255;
};

Color.toByte = function(value) {
  return Math.round(value * 255);
};

Color.toHex = function(value) {
  value = Math.round(value) & 0xFF;
  value = value.toString(16);
  if (value.length == 1) {
    value = "0" + value;
  }
  return value;
};

Color.fromArray = function(value, format) {
  format = format || "rgba";
  var r,g,b,a;
  switch(format) {
    default:
    case "rgba":
      r = value[0];
      g = value[1];
      b = value[2];
      a = value[3];

    case "argb":
      a = value[0];
      r = value[1];
      g = value[2];
      b = value[3];
  }
  return new Color(r,g,b,a);
};

Color.fromNumber = function(value, format) {
  format = format || "rgba";
  var r,g,b,a;
  switch(format) {
    default:
    case "rgba":
      r = (value >> 24) & 0xFF;
      g = (value >> 16) & 0xFF;
      b = (value >> 8) & 0xFF;
      a = (value & 0xFF) / 255;
      break;

    case "argb":
      a = ((value >> 24) & 0xFF) / 255;
      r = (value >> 16) & 0xFF;
      g = (value >> 8) & 0xFF;
      b = value & 0xFF;
      break;

    case "kelvin":
      var k = value;
      if (k < Color.MIN_KELVIN) {
        k = Color.MIN_KELVIN;
      }

      if (k > Color.MAX_KELVIN) {
        k = Color.MAX_KELVIN;
      }
      
      k = (k / 100);
      if (k <= 66) {
        r = 255;
      } else {
        r = k - 60;
        r = 329.698727446 * Math.pow(r, -0.1332047592);
      }
     
      if (k <= 66) {
        g = k;
        g = 99.4708025861 * Math.log(g) - 161.1195681661;
      } else {
        g = k - 60;
        g = 288.1221695283 * Math.pow(g, -0.0755148492);
      }

      if (k >= 66) {
        b = 255;
      } else {
        if (k <= 19) {
          b = 0;
        } else {
          b = k - 10;
          b = 138.5177312231 * Math.log(b) - 305.0447927307;
        }
      }

      r = Color.clamp(r,0,255);
      g = Color.clamp(g,0,255);
      b = Color.clamp(b,0,255);      
      break;
  }

  return new Color(r,g,b,a);

};

Color.fromString = function(value, format) {
  if (format === undefined) {
    if (value.substr(0,1) === "#") {
      format = "css";
    } else if (value.substr(0,4) === "hsl(") {
      format = "hsl";
    } else if (value.substr(0,4) === "rgb(") {
      format = "rgb";
    } else if (value.substr(0,5) === "rgba(") {
      format = "rgba";
    } else {
      format = "css";
    }
  }

  var r = 0,g = 0,b = 0,a = 1;
  switch(format) {
    default:
    case "css":
      if (value.substr(0,1) === "#") {
        if (value.length === 4) {
          r = value.substr(1,1) + value.substr(1,1);
          g = value.substr(2,1) + value.substr(2,1);
          b = value.substr(3,1) + value.substr(3,1);
        } else {
          r = value.substr(1,2);
          g = value.substr(3,2);
          b = value.substr(5,2);
        }
        r = parseInt(r, 10);
        g = parseInt(g, 10);
        b = parseInt(b, 10);
      } else {
        if (value in names) {
          var hex = names[value];
          return Color.fromString(hex, "css");
        }
      }
      break;

    case "hsl":
      var re = /^hsl\((-?[0-9]+(?:\.[0-9]+)?),(-?[0-9]+(?:\.[0-9]+)?)%,(-?[0-9]+(?:\.[0-9]+)?)%\)$/;
      var matches = value.match(re);
      if (matches) {
        h = parseInt(matches[1], 10);
        s = parseInt(matches[2], 10);
        l = parseInt(matches[3], 10);
        return Color.fromHSL(h,s,l);
      }
      break;

    case "hsla":
      var re = /^hsl\((-?[0-9]+(?:\.[0-9]+)?),(-?[0-9]+(?:\.[0-9]+)?)%,(-?[0-9]+(?:\.[0-9]+)?)%,(-?[0-9]+(?:\.[0-9]+)?)\)$/;
      var matches = value.match(re);
      if (matches) {
        h = parseInt(matches[1], 10);
        s = parseInt(matches[2], 10);
        l = parseInt(matches[3], 10);
        a = parseInt(matches[4], 10);
        var color = Color.fromHSL(h,s,l);
        color.a = a;
        return color;
      }
      break;

    case "rgb":
      var re = /^rgb\((-?[0-9]+(?:\.[0-9]+)?),(-?[0-9]+(?:\.[0-9]+)?),(-?[0-9]+(?:\.[0-9]+)?)\)$/;
      var matches = value.match(re);
      if (matches) {
        r = parseInt(matches[1], 10);
        g = parseInt(matches[2], 10);
        b = parseInt(matches[3], 10);
      }
      break;

    case "rgba":
      var re = /^rgba\((-?[0-9]+(?:\.[0-9]+)?),(-?[0-9]+(?:\.[0-9]+)?),(-?[0-9]+(?:\.[0-9]+)?),(-?[0-9]+(?:\.[0-9]+)?)\)$/;
      var matches = value.match(re);
      if (matches) {
        r = parseInt(matches[1], 10);
        g = parseInt(matches[2], 10);
        b = parseInt(matches[3], 10);
        a = parseInt(matches[4], 10);
      }
      break;
  }
  return new Color(r,g,b,a);
};

Color.prototype = {
  constructor: Color,

  min: function() {
    return Math.min(this.r / 255, this.g / 255, this.b / 255);
  },

  max: function() {
    return Math.max(this.r / 255, this.g / 255, this.b / 255);
  },

  delta: function() {
    return this.max() - this.min();
  },

  hue: function(format) {
    switch(format) {
      default:
      case "deg":
      case "degs":
      case "degrees":
        return Color.normalizeHue(Math.atan2(
          Math.sqrt(3) * (this.g - this.b), 
          2 * this.r - this.g - this.b
        ) * (180 / Math.PI));

      case "rad":
      case "rads":
      case "radians":
        return Math.atan2(
          Math.sqrt(3) * (this.g - this.b), 
          2 * this.r - this.g - this.b
        );
    }
  },

  saturation: function(format) {
    switch(format) {
      default:
      case "percent":
        return Math.round((this.delta() / (1 - Math.abs(2 * this.lightness("unit") - 1))) * 100);

      case "unit":
        return this.delta() / (1 - Math.abs(2 * this.lightness("unit") - 1));
    }
  },

  lightness: function(format) {
    switch(format) {
      default:
      case "percent":
        return Math.round(((this.max() + this.min()) * 0.5) * 100);

      case "unit":
        return (this.max() + this.min()) * 0.5;
    }
  },

  brightness: function() {
    return ((this.r / 255) + (this.g / 255) + (this.b / 255)) / 3;
  },

  add: function(c, alpha) {
    this.r = Color.clamp(this.r + c.r, 0, 255);
    this.g = Color.clamp(this.g + c.g, 0, 255);
    this.b = Color.clamp(this.b + c.b, 0, 255);
    return this;
  },

  subtract: function(c, alpha) {
    this.r = Color.clamp(this.r - c.r, 0, 255);
    this.g = Color.clamp(this.g - c.g, 0, 255);
    this.b = Color.clamp(this.b - c.b, 0, 255);
    return this;
  },

  divide: function(c) {
    this.r = Color.clamp(this.r / c.r, 0, 255);
    this.g = Color.clamp(this.g / c.g, 0, 255);
    this.b = Color.clamp(this.b / c.b, 0, 255);
    return this;
  },

  multiply: function(c) {
    this.r = Color.clamp(this.r * c.r, 0, 255);
    this.g = Color.clamp(this.g * c.g, 0, 255);
    this.b = Color.clamp(this.b * c.b, 0, 255);
    return this;
  },

  scaleBy: function(k) {
    this.r = Color.clamp(this.r * k, 0, 255);
    this.g = Color.clamp(this.g * k, 0, 255);
    this.b = Color.clamp(this.b * k, 0, 255);
    return this;
  },

  clone: function() {
    return new Color(this.r,this.g,this.b,this.a);
  },

  copy: function(c) {
    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
    this.a = c.a;
    return this;
  },

  toArray: function(format) {
    switch(format) {
      default:
      case "rgba": return [this.r,this.g,this.b,this.a];
      case "argb": return [this.a,this.r,this.g,this.b];
    }
  },

  toNumber: function(format) {
    switch(format) {
      default:
      case "rgba":
        return (Math.round(this.r) & 0xFF) << 24 |
               (Math.round(this.g) & 0xFF) << 16 |
               (Math.round(this.b) & 0xFF) << 8 |
               (Math.round(this.a * 0xFF) & 0xFF);

      case "argb":
        return (Math.round(this.a * 0xFF) & 0xFF) << 24 |
               (Math.round(this.r) & 0xFF) << 16 |
               (Math.round(this.g) & 0xFF) << 8 |
               (Math.round(this.b) & 0xFF);
    }
  },

  toString: function(format) {
    switch(format) {
      default:
      case "css": return "#" + Color.toHex(this.r) + Color.toHex(this.g) + Color.toHex(this.b);
      case "rgb": return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
      case "rgba": return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
      case "hsl": return "hsl(" + this.hue() + "," + this.saturation() + "%," + this.lightness() + "%)";
      case "hsla": return "hsla(" + this.hue() + "," + this.saturation() + "%," + this.lightness() + "%," + this.a + ")";
    }
  }
};

module.exports = Color;