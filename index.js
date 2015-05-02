function Color(r,g,b,a) {
  this.r = r || 0;
  this.g = g || 0;
  this.b = b || 0;
  this.a = a || 1;
}

Color.fromString = function(value, format) {
  format = format || "css";

  return new Color(r,g,b,a);
};

Color.prototype = {
  constructor: Color,

  add: function(c) {
    this.r += c.r;
    this.g += c.g;
    this.b += c.b;
    this.a += c.a;
  },

  subtract: function(c) {
    this.r -= c.r;
    this.g -= c.g;
    this.b -= c.b;
    this.a -= c.a;
  },

  divide: function(c) {
    this.r /= c.r;
    this.g /= c.g;
    this.b /= c.b;
    this.a /= c.a;
  },

  multiply: function(c) {
    this.r *= c.r;
    this.g *= c.g;
    this.b *= c.b;
    this.a *= c.a;
  },

  clone: function() {
    return new Color(this.r,this.g,this.b,this.a);
  },

  copy: function(c) {
    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
    this.a = c.a;
  },

  toString: function(format) {
    format = format || "css";
    switch(format) {
      default:
      case "css":
      case "rgb":
      case "rgba":
        break;
    }
  }
};

module.exports = Color;
