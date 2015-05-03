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

  it("should represent a color as a css value (#rrggbb)", function() {

    var color;
    color = new Color(255,0,0);
    expect(color.toString("css")).to.be.equal("#ff0000");
    
    color = new Color(0,255,0);
    expect(color.toString("css")).to.be.equal("#00ff00");
    
    color = new Color(0,0,255);
    expect(color.toString("css")).to.be.equal("#0000ff");
    
    color = new Color(255,127,127);
    expect(color.toString("css")).to.be.equal("#ff7f7f");

  });

  it("should represent a color as a rgb value (rgb(r,g,b))", function() {
    
    var color;
    color = new Color(255,0,0);
    expect(color.toString("rgb")).to.be.equal("rgb(255,0,0)");
    
    color = new Color(0,255,0);
    expect(color.toString("rgb")).to.be.equal("rgb(0,255,0)");
    
    color = new Color(0,0,255);
    expect(color.toString("rgb")).to.be.equal("rgb(0,0,255)");
    
    color = new Color(255,127,127);
    expect(color.toString("rgb")).to.be.equal("rgb(255,127,127)");

  });

  it("should represent a color as a rgba value (rgba(r,g,b,a))", function() {
    
    var color;
    color = new Color(255,0,0);
    expect(color.toString("rgba")).to.be.equal("rgba(255,0,0,1)");
    
    color = new Color(0,255,0);
    expect(color.toString("rgba")).to.be.equal("rgba(0,255,0,1)");
    
    color = new Color(0,0,255);
    expect(color.toString("rgba")).to.be.equal("rgba(0,0,255,1)");
    
    color = new Color(255,127,127);
    expect(color.toString("rgba")).to.be.equal("rgba(255,127,127,1)");

  });

  it("should represent a color as a hsla value (hsl(h,s,l))", function() {
    
    var color;
    color = new Color(255,0,0);
    expect(color.toString("hsl")).to.be.equal("hsl(0,100%,50%)");
    
    color = new Color(0,255,0);
    expect(color.toString("hsl")).to.be.equal("hsl(120,100%,50%)");
    
    color = new Color(0,0,255);
    expect(color.toString("hsl")).to.be.equal("hsl(240,100%,50%)");
    
    color = new Color(255,127,127);
    expect(color.toString("hsl")).to.be.equal("hsl(0,100%,75%)");

  });

  it("should represent a color as a hsla value (hsla(h,s,l,a))", function() {
    
    var color;
    color = new Color(255,0,0);
    expect(color.toString("hsla")).to.be.equal("hsla(0,100%,50%,1)");
    
    color = new Color(0,255,0);
    expect(color.toString("hsla")).to.be.equal("hsla(120,100%,50%,1)");
    
    color = new Color(0,0,255);
    expect(color.toString("hsla")).to.be.equal("hsla(240,100%,50%,1)");
    
    color = new Color(255,127,127);
    expect(color.toString("hsla")).to.be.equal("hsla(0,100%,75%,1)");

  });

});
