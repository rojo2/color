function Color(r,g,b,a) {
  this.r = r || 0;
  this.g = g || 0;
  this.b = b || 0;
  this.a = a || 1;
}

Color.clamp = function(v,min,max) {
  if (v < min) return min;
  if (v > max) return max;
  return v;
};

Color.toByteHex = function(value) {
  value = Math.round(value) & 0xFF;
  value = value.toString(16);
  if (value.length == 1) {
    value = "0" + value;
  }
  return value;
};

Color.random = function(alpha) {
  alpha = alpha || false;
  return new Color(
      Math.random(),
      Math.random(),
      Math.random(),
      alpha === true ? Math.random() : 1
  );
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
  switch(format) {
    default:
    case "rgba":
    case "argb":
  }
  return new Color(r,g,b,a);
};

Color.fromString = function(value, format) {
  format = format || "css";
  var r,g,b,a;
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
        a = 1;

      } else {
        // TODO: If we found the color name in the color name table
        // then we create a color with that value.
      }
      break;

    case "rgb":

      if (/rgb\(-?[0-9]+(?:\.[0-9]+)?,-?[0-9]+(?:\.[0-9]+)?,-?[0-9]+(?:\.[0-9]+)?\)/.test(value)) {

      }
      break;

    case "rgba":

      if (/rgba\(-?[0-9]+(?:\.[0-9]+)?,-?[0-9]+(?:\.[0-9]+)?,-?[0-9]+(?:\.[0-9]+)?,-?[0-9]+(?:\.[0-9]+)?\)/.test(value)) {
        
      }
      break;

  }
  return new Color(r,g,b,a);
};

Color.prototype = {
  constructor: Color,

  add: function(c) {
    this.r += c.r;
    this.g += c.g;
    this.b += c.b;
    this.a += c.a;
    return this;
  },

  subtract: function(c) {
    this.r -= c.r;
    this.g -= c.g;
    this.b -= c.b;
    this.a -= c.a;
    return this;
  },

  divide: function(c) {
    this.r /= c.r;
    this.g /= c.g;
    this.b /= c.b;
    this.a /= c.a;
    return this;
  },

  multiply: function(c) {
    this.r *= c.r;
    this.g *= c.g;
    this.b *= c.b;
    this.a *= c.a;
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
    format = format || "rgba";
    switch(format)
      default:
      case "rgba": return [this.r,this.g,this.b,this.a];
      case "argb": return [this.a,this.r,this.g,this.b];
  },

  toNumber: function(format) {
    format = format || "rgba";
    switch(format)
      default:
      case "rgba":
        return (Math.round(this.r) & 0xFF) << 24 |
               (Math.round(this.g) & 0xFF) << 16 |
               (Math.round(this.b) & 0xFF) << 8 |
               (Math.round(this.a) & 0xFF);

      case "argb":
        return (Math.round(this.a) & 0xFF) << 24 |
               (Math.round(this.r) & 0xFF) << 16 |
               (Math.round(this.g) & 0xFF) << 8 |
               (Math.round(this.b) & 0xFF);
  },

  toString: function(format) {
    format = format || "css";
    switch(format) {
      default:
      case "css": return "#" + Color.toByteHex(this.r) + Color.toByteHex(this.g) + Color.toByteHex(this.b);
      case "rgb": return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
      case "rgba": return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }
  }
};

module.exports = Color;
