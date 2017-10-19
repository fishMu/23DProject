// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define(["require","exports","./ModelContentType","./ModelDirtyTypesTs","./Util"],function(A,B,y,C,z){var t=z.objectEmpty,u=z.assert;return function(){function d(a){this._residentGeomRecords={};this._dirtyGeomRecords={};this._dirtyMaterials={};this._model=a}Object.defineProperty(d.prototype,"residentLayerCount",{get:function(){return Object.keys(this._residentGeomRecords).length},enumerable:!0,configurable:!0});Object.defineProperty(d.prototype,"residentObjectCount",{get:function(){var a=0,b;for(b in this._residentGeomRecords)a+=
Object.keys(this._residentGeomRecords[b]).length;return a},enumerable:!0,configurable:!0});d.prototype._getResidentGeometryRecords=function(){return this._residentGeomRecords};d.prototype._getDirtyGeometryRecords=function(){return this._dirtyGeomRecords};d.prototype.getDirtyMaterials=function(){return t(this._dirtyMaterials)?null:this._dirtyMaterials};d.prototype.clearDirtyMaterials=function(){this._dirtyMaterials={}};d.prototype.hasDirtyGeometryRecords=function(){for(var a in this._dirtyGeomRecords)for(var b in this._dirtyGeomRecords[a]){var c=
this._dirtyGeomRecords[a][b];if(c&&!t(c))return!0}return!1};d.prototype.handleUpdate=function(a,b,c){u(this[b],"ModelDirtySet doesn't know how to process "+b);return this[b](a,c)};d.prototype.getAddRemoveUpdateList=function(a){return this.getAddRemoveUpdateListFilteredByLayers(Object.keys(this._dirtyGeomRecords),a)};d.prototype.getAddRemoveUpdateListFilteredByLayers=function(a,b){for(var c=[],d=[],e=[],g=0;g<a.length;g++){var h=a[g];if(h in this._dirtyGeomRecords){for(var k in this._dirtyGeomRecords[h]){var n=
this._dirtyGeomRecords[h][k];if(n){var l=this._createObjectRecordObjIfNonexistent(this._residentGeomRecords,h,k),q;for(q in n){var p=n[q],v=p[0],m=p[1],p=p[2],r=m&2&&p&1;if(m&4||r){var f=l[q];f?d.push.apply(d,f[1]):4===m&&u(!1,"ModelDirtySet.getAddRemoveListFilteredByLayers: invalid remove");b&&f&&delete l[q]}if(m&1||r){var f=[v,[]],w=this._model.get(y.OBJECT,k);this._model.getGeometryRenderGeometries(w,v,f[1]);c.push.apply(c,f[1]);b&&(l[q]=f)}if(m&2&&!r)if(f=l[q],w=this._model.get(y.OBJECT,k),f){m=
f[1];r=m.length;if(p&16)for(f=0;f<r;f++){var x=m[f];this._model.updateRenderGeometryTransformation(w,v,x)}for(f=0;f<r;f++)x=m[f],e.push({renderGeometry:x,updateType:p})}else u(!1,"ModelDirtySet.getAddRemoveListFilteredByLayers: invalid update")}t(l)&&delete this._residentGeomRecords[h][k]}}t(this._residentGeomRecords[h])&&delete this._residentGeomRecords[h]}b&&delete this._dirtyGeomRecords[h]}return[c,d,e]};d.prototype.getResidentRenderGeometries=function(){return this.getResidentRenderGeometriesFilteredByLayers(Object.keys(this._residentGeomRecords))};
d.prototype.getResidentRenderGeometriesFilteredByLayers=function(a){for(var b=[],c=0;c<a.length;c++){var d=a[c];if(d in this._residentGeomRecords)for(var e in this._residentGeomRecords[d]){var g=this._residentGeomRecords[d][e];if(g)for(var h in g)b.push.apply(b,g[h][1])}}return b};d.prototype.componentVisibilityChanged=function(a,b,c){if(null!=b)this._componentVisibilityChanged(a,b,c);else{b=0;for(var d=a.getGeometryRecords();b<d.length;b++)this._componentVisibilityChanged(a,d[b],c)}};d.prototype.vertexAttrsUpdated=
function(a,b,c){this._updateOrCreateDirtyRecord(a,b,c,2,0,0,2,5,4)};d.prototype.colorAttrsUpdated=function(a,b,c){this._updateOrCreateDirtyRecord(a,b,c,2,0,0,2,5,8)};d.prototype.matChanged=function(a){this._dirtyMaterials[a.getId()]=!0};d.prototype.layerAdded=function(a){for(var b=a.getObjects(),c=0;c<b.length;c++)this.layObjectAdded(a,b[c])};d.prototype.layerRemoved=function(a){for(var b=a.getObjects(),c=0;c<b.length;c++)this.layObjectRemoved(a,b[c])};d.prototype.layObjectAdded=function(a,b){a=a.getId();
for(var c=b.getGeometryRecords(),d=0;d<c.length;d++)this.objGeometryAdded(b,c[d],a)};d.prototype.layObjectRemoved=function(a,b){a=a.getId();for(var c=b.getGeometryRecords(),d=0;d<c.length;d++)this.objGeometryRemoved(b,c[d],a)};d.prototype.layObjectReplaced=function(a,b){this.layObjectRemoved(a,b[0]);this.layObjectAdded(a,b[1])};d.prototype.objDirty=function(a,b){b=b||this._getParentLayerId(a);var c=a.getId(),c=this._createObjectRecordObjIfNonexistent(this._residentGeomRecords,b,c),d;for(d in c)this._updateOrCreateDirtyRecord(a,
c[d][0],b,2,0,2,0,5,1)};d.prototype.objTransformation=function(a,b){b=b||this._getParentLayerId(a);var c=a.getId(),c=this._createObjectRecordObjIfNonexistent(this._residentGeomRecords,b,c),d;for(d in c)this._updateOrCreateDirtyRecord(a,c[d][0],b,2,0,0,2,5,16)};d.prototype.objGeometryAdded=function(a,b,c){this._updateOrCreateDirtyRecord(a,b,c,1,4,0,0,0)};d.prototype.objGeometryRemoved=function(a,b,c){this._updateOrCreateDirtyRecord(a,b,c,4,1,2,0,0)};d.prototype.objGeometryReplaced=function(a,b){this.objGeometryRemoved(a,
b[0]);this.objGeometryAdded(a,b[1])};d.prototype.objGeometryTransformation=function(a,b){this.objGeometryReplaced(a,b)};d.prototype._componentVisibilityChanged=function(a,b,c){this._updateOrCreateDirtyRecord(a,b,c,2,0,0,2,5,2)};d.prototype._updateOrCreateDirtyRecord=function(a,b,c,d,e,g,h,k,n){c=c||this._getParentLayerId(a);var l=a.getId();a=b.getId();c=this._createObjectRecordObjIfNonexistent(this._dirtyGeomRecords,c,l);(l=c[a])?(b=l[1],b&e?delete c[a]:b&g?(l[1]=d,l[2]=n):b&h?l[2]|=n:b&k||u(!1,"ModelDirtySet.objGeometryAdded: inconsistent state")):
c[a]=[b,d,n]};d.prototype._createObjectRecordObjIfNonexistent=function(a,b,c){a[b]||(a[b]={});a[b][c]||(a[b][c]={});return a[b][c]};d.prototype._getParentLayerId=function(a){return a.parentLayer.id};d.prototype.formatDebugInfo=function(a){var b=["ADD","UPD",void 0,"REM"];if(a)return"";a="";for(var c in this._dirtyGeomRecords)for(var d in this._dirtyGeomRecords[c]){var e=this._dirtyGeomRecords[c][d];if(e){0<a.length&&(a+="\n");a+=c+"."+d;var g=[],h;for(h in e){var k=e[h][1];g[k]||(g[k]=[]);g[k].push(e[h][0].geometry.id)}for(e=
0;e<g.length;e++)if(g[e])for(a+=" "+b[e-1]+": ",k=0;k<g[e].length;k++)a+=g[e][k]+", "}}return a};return d}()});