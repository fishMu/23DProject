// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../core/HandleRegistry ../../../core/promiseUtils ../../../core/watchUtils ../../../Graphic ./LayerView2D ./support/ExportStrategy ../engine/BitmapSource ../engine/Canvas2DContainer ../engine/BitmapContainer".split(" "),function(d,v,g,h,f,k,l,m,n,p,q,r,t,u){d=function(d){function c(){var a=null!==d&&d.apply(this,arguments)||this;a._handles=new k;a.container=
new t;return a}g(c,d);c.prototype.hitTest=function(a,b){a=this.view.toMap(a,b);return l.resolve(new n({attributes:{},geometry:a}))};c.prototype.update=function(a){this.strategy.update(a);this.notifyChange("updating")};c.prototype.attach=function(){var a=this;this._tileContainer=new u;this.container.addChild(this._tileContainer);this.strategy=new q(this._tileContainer,function(b){return a._fetchImage(b)},function(){return a.requestUpdate()},0,!1,2048,2048);this._handles.add([m.watch(this,"layer.exportImageServiceParameters.version",
function(b){a._exportImageVersion!==b&&(a._exportImageVersion=b,a.requestUpdate())}),this.layer.on("redraw",function(){a.strategy.updateExports(function(b){b=b.source.data.getContext("2d");a.pixelData=a.layer.applyFilter(a._rawPixelData);a._drawPixelData(b,a.pixelData,0,0);return null})})])};c.prototype.detach=function(){this.container.removeChild(this._tileContainer);this.strategy.destroy();this._handles.removeAll()};c.prototype.moveStart=function(){};c.prototype.viewChange=function(){};c.prototype.moveEnd=
function(){this.requestUpdate()};c.prototype.isUpdating=function(){return this.attached&&(this.strategy.updating||this.updateRequested)};c.prototype._fetchImage=function(a){var b=this;this._exportImageVersion=this.get("layer.exportImageServiceParameters.version");return this.layer.fetchImage(a).then(function(c){b._rawPixelData=c.pixelData;b.pixelData=b.layer.applyFilter(b._rawPixelData);c=document.createElement("canvas");c.width=a.width;c.height=a.height;var d=c.getContext("2d");b._drawPixelData(d,
b.pixelData,0,0);b.notifyChange("updating");return new r(c)})};c.prototype._drawPixelData=function(a,b,c,d){if(b.pixelBlock){var e=b.pixelBlock;b=a.createImageData(e.width,e.height);e=e.getAsRGBA();b.data.set(e);a.putImageData(b,c,d)}};return c}(f.declared(p));return d=h([f.subclass("esri.views.2d.layers.ImageryLayerView2D")],d)});