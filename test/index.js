var expect = require("chai").expect;
var Color = require("../index");

describe("Color", function() {

  it("should create a Color", function() {

    var color = new Color(255,0,0,1);

  });

  it("should create a color from HSL (red)", function() {

    var color = Color.fromString("hsl(0,100%,50%)","hsl");
    expect(color.r).to.be.equal(255);
    expect(color.g).to.be.equal(0);
    expect(color.b).to.be.equal(0);

  });

  it("should create a color from HSL (green)", function() {

    var color = Color.fromString("hsl(120,100%,50%)","hsl");
    expect(color.r).to.be.equal(0);
    expect(color.g).to.be.equal(255);
    expect(color.b).to.be.equal(0);

  });

  it("should create a color from HSL (blue)", function() {

    var color = Color.fromString("hsl(240,100%,50%)","hsl");
    expect(color.r).to.be.equal(0);
    expect(color.g).to.be.equal(0);
    expect(color.b).to.be.equal(255);

  });

  it("should create a color from HSL (dark magenta)", function() {

    var color = Color.fromString("hsl(330,50%,25%)","hsl");
    expect(color.r).to.be.equal(96);
    expect(color.g).to.be.equal(32);
    expect(color.b).to.be.equal(64);

  });

});
