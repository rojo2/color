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

  it("should create a color from HSL (dark magenta) and represent it as hsla", function() {

    var color = Color.fromString("hsl(330,50%,25%)","hsl");
    expect(color.toString("hsla")).to.be.equal("hsla(330,50%,25%,1)");

  });

  it("should add one color to another", function() {

    var a = new Color(255,0,0);
    var b = new Color(0,255,0);
    a.add(b);
    expect(a.r).to.be.equal(255);
    expect(a.g).to.be.equal(255);

  });

  it("should subtract one color to another", function() {

    var a = new Color(255,0,0);
    var b = new Color(0,255,0);
    a.subtract(b);
    expect(a.r).to.be.equal(255);
    expect(a.g).to.be.equal(0);

  });

  it("should multiply one color to another", function() {

    var a = new Color(32,8,0);
    var b = new Color(8,32,0);
    a.multiply(b);
    expect(a.r).to.be.equal(255);
    expect(a.g).to.be.equal(255);

  });

  it("should divide one color to another", function() {

    var a = new Color(256,256,0);
    var b = new Color(8,8,0);
    a.divide(b);
    expect(a.r).to.be.equal(32);
    expect(a.g).to.be.equal(32);

  });

  it("should scale by 0.5", function() {
    
    var color = new Color(256,256,0);
    color.scaleBy(0.5);
    expect(color.r).to.be.equal(128);
    expect(color.g).to.be.equal(128);

  });

  it("should interpolate two colors", function() {

    var a = new Color(256,0,0);
    var b = new Color(0,256,0);
    var c = Color.interpolate(a,b,0.5)
    expect(c.r).to.be.equal(128);
    expect(c.g).to.be.equal(128);


  });

});
