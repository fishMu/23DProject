// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("../../../geometry/SpatialReference ../../../geometry/Geometry ../../../geometry/Point ../../../geometry/Extent ../../../geometry/support/webMercatorUtils ../../../core/Error ../../../core/promiseUtils ../../../Camera ../../../Viewpoint ../../../Graphic ../lib/glMatrix ./mathUtils ./projectionUtils ./cameraUtils ./aaBoundingBox ./aaBoundingRect ./intersectionUtils".split(" "),function(C,Y,x,Z,y,aa,D,E,F,ba,u,P,v,k,r,Q,ca){function G(a){return 360-P.cyclicalDeg.normalize(a)}function z(a){return P.cyclicalDeg.normalize(360-
a)}function R(a,b,c){if(!b)return null;var d=a.spatialReference||C.WGS84,e;if(b.camera){e=b.get("camera.position.spatialReference");if(!y.canProject(e,d))return null;b=b.camera.clone();e.equals(d)||(a=y.project(b.position,d),b.position=a);return b}if((e=b.get("targetGeometry.spatialReference"))&&!y.canProject(e,d))return null;var p=a.navigation.currentCamera;e=k.internalToExternal(a,p);var m={noReset:!1};null!=b.rotation&&(e.heading=G(b.rotation),m.noReset=!0);null!=c&&(e.tilt=c);if(b.targetGeometry instanceof
x){var f=b.targetGeometry;c=b.targetGeometry.clone();b=null!=b.scale?k.scaleToDistance(a,b.scale,f.latitude):p.distance;b=k.eyeHeadingTiltForCenterPointAtDistance(a,e.heading,e.tilt,c,b,m);a=v.vectorToPoint(b.eye,a.renderSpatialReference,d);return new E(a,b.heading,b.tilt,e.fov)}return k.fromExtent(a,b.targetGeometry.extent,e,m)}function I(a,b,c,d){var e=c.scale;null==e&&null!=c.zoom&&(e=k.zoomToScale(a,c.zoom));null==e&&null!=c.distance&&(b=b.center||b,e=k.distanceToScale(a,c.distance,b.latitude));
null==e&&d&&(e="function"===typeof d?d():d);return e}function S(a,b,c,d,e){if(!(b&&c.position||b&&c.direction||c.position&&c.direction))return!1;var p=a.spatialReference||C.WGS84,m=a.renderSpatialReference,l=c.direction;b&&c.position&&(l=null);c.position&&v.pointToVector(c.position,h,m);b&&v.pointToVector(b,n,m);if(l){var g=new x(c.position||b);g.x+=l[0];g.y+=l[1];2<l.length&&(g.z+=l[2]);v.pointToVector(g,w,m);f.subtract(w,c.position?h:n)}c.position&&l?(e.camera.position=new x(c.position),k.directionToHeadingTilt(a,
h,w,d.up,e.camera),f.add(h,w,n),a.navigation.getCenterIntersectTerrain(h,n,n),e.targetGeometry=v.vectorToPoint(n,m,p),e.scale=k.distanceToScale(a,f.dist(h,n),e.targetGeometry.latitude)):b&&l?(e.targetGeometry=new x(b),e.scale=I(a,e.targetGeometry,c,function(){return k.computeScale(a,d)}),b=k.scaleToDistance(a,e.scale,b.latitude),f.scale(w,b/f.length(w),h),f.add(h,n),e.camera.position=v.vectorToPoint(h,m,p),k.directionToHeadingTilt(a,h,w,d.up,e.camera)):(e.targetGeometry=new x(b),e.camera.position=
new x(c.position),f.subtract(n,h,w),k.directionToHeadingTilt(a,h,w,d.up,e.camera),e.scale=k.distanceToScale(a,f.dist(h,n),e.targetGeometry.latitude));e.rotation=z(e.camera.heading);return!0}function J(a,b){var c=!1;null!=b.heading?(a.heading=b.heading,c=!0):null!=b.rotation&&(a.heading=G(b.rotation),c=!0);null!=b.tilt&&(a.tilt=b.tilt,c=!0);null!=b.fov&&(a.fov=b.fov);return c}function H(a,b,c){var d=a.spatialReference||C.WGS84;b=b||k.externalToInternal(a,c.camera);c.targetGeometry=v.vectorToPoint(b.center,
a.renderSpatialReference,d);c.scale=k.computeScale(a,b);c.rotation=z(c.camera.heading);return c}function K(a,b,c){if(b){var d=[];if(!b.hasZ&&a.basemapTerrain){var e;e=b.isInstanceOf(x)?b:b.centroid||b.center;g[2]=e?a.basemapTerrain.getElevation(e)||0:0}da[b.declaredClass](b,function(a){d.push(a[0],a[1],a[2])},g);var f=d.length/3;if(0!==f&&(e=Array(d.length),v.bufferToBuffer(d,b.spatialReference,0,e,a.spatialReference,0,f)))for(b.hasZ&&(c.hasZ=!0),a=0;a<e.length;a+=3)b.hasZ?(g[0]=e[a+0],g[1]=e[a+1],
g[2]=e[a+2]):(g[0]=e[a+0],g[1]=e[a+1]),r.expand(c.boundingBox,g)}}function ea(a,b,c){return a.whenViewForGraphic(b).then(function(a){if(a&&a.whenGraphicBounds)return a.whenGraphicBounds(b)}).then(function(a){r.expand(c.boundingBox,a);isFinite(a[2])&&(c.hasZ=!0)}).otherwise(function(){K(a,b.geometry,c)})}function T(a,b,c){if(Array.isArray(b)&&2===b.length&&"number"===typeof b[0]&&"number"===typeof b[1])t.x=b[0],t.y=b[1],t.z=void 0,t.spatialReference=C.WGS84,K(a,t,c);else{if(b&&b.forEach)return D.eachAlways(b.map(function(b){return T(a,
b,c)}));if(b instanceof Y)K(a,b,c);else if(b instanceof ba)return ea(a,b,c)}return D.resolve()}function fa(a,b,c,d){if(b.camera)return U(a,c,b.camera,d);d.scale=b.scale;d.rotation=b.rotation;d.targetGeometry=b.targetGeometry?b.targetGeometry.clone():null;d.camera=null;null!=c.heading?d.rotation=z(c.heading):null!=c.rotation&&(d.rotation=c.rotation);b=I(a,d.targetGeometry,c);null!=b&&(d.scale=b);d.camera=R(a,d,c.tilt);return d}function U(a,b,c,d){d.camera=c.clone();d.camera.fov=a.camera.fov;b=a.spatialReference;
c=d.camera.position.spatialReference;if(!y.canProject(c,b))return null;c.equals(b)||(b=y.project(d.camera.position,b),d.camera.position=b);return H(a,null,d)}function L(a,b,c,d){if(!c)return null;d.targetGeometry=c.clone();var e=a.navigation.getCameraIntersectTerrain();if(S(a,d.targetGeometry,b,e,d))return d;k.internalToExternal(a,e,d.camera);var p={noReset:!1};J(d.camera,b)&&(p.noReset=!0);d.scale=I(a,d.targetGeometry,b);null==d.scale&&(v.pointToVector(c,g,a.renderSpatialReference),ca.frustumPoint(e.frustumPlanes,
g)?d.scale=k.distanceToScale(a,f.dist(e.eye,g),c.latitude):d.scale=k.computeScale(a,e));return k.fromCenterScale(a,d.targetGeometry,d.scale,d.camera,p,d.camera)?d:null}function ga(a,b,c,d){d.targetGeometry=c.clone();var e=a.navigation.getCameraIntersectTerrain();k.internalToExternal(a,e,d.camera);e={noReset:!1};J(d.camera,b)&&(e.noReset=!0);return k.fromExtent(a,c,d.camera,e,d.camera)?d:null}function ha(a,b){if(!b||!a.spatialReference)return null;a={};if(null!=b.declaredClass||Array.isArray(b))a.target=
b;else{for(var c in b)a[c]=b[c];b.center&&!a.target&&(a.target=b.center)}return a}function A(a){a&&(a.rotation=z(a.camera.heading));return D.resolve(a)}var f=u.vec3d,M=u.mat3d,V=u.mat4d,h=f.create(),n=f.create(),w=f.create(),N={heading:0,tilt:0},g=f.create(),W=V.create(),O=M.create(),B=r.create(),ia=Q.create(),t=new x;u=function(a,b,c){for(var d=a.hasZ,e=0;e<a.rings.length;e++)for(var f=a.rings[e],m=0;m<f.length;m++)c[0]=f[m][0],c[1]=f[m][1],d&&(c[2]=f[m][2]),b(c)};var da={"esri.geometry.Point":function(a,
b,c){c[0]=a.x;c[1]=a.y;a.hasZ&&(c[2]=a.z);b(c)},"esri.geometry.Polygon":u,"esri.geometry.Circle":u,"esri.geometry.Polyline":function(a,b,c){for(var d=a.hasZ,e=0;e<a.paths.length;e++)for(var f=a.paths[e],m=0;m<f.length;m++)c[0]=f[m][0],c[1]=f[m][1],d&&(c[2]=f[m][2]),b(c)},"esri.geometry.Multipoint":function(a,b,c){var d=a.points;a=a.hasZ;for(var e=0;e<d.length;e++)c[0]=d[e][0],c[1]=d[e][1],a&&(c[2]=d[e][2]),b(c)},"esri.geometry.Extent":function(a,b,c){a.hasZ?(b(f.set3(a.xmin,a.ymin,a.zmin,c)),b(f.set3(a.xmax,
a.ymin,a.zmin,c)),b(f.set3(a.xmin,a.ymax,a.zmin,c)),b(f.set3(a.xmax,a.ymax,a.zmin,c)),b(f.set3(a.xmin,a.ymin,a.zmax,c)),b(f.set3(a.xmax,a.ymin,a.zmax,c)),b(f.set3(a.xmin,a.ymax,a.zmax,c)),b(f.set3(a.xmax,a.ymax,a.zmax,c))):(b(f.set3(a.xmin,a.ymin,c[2],c)),b(f.set3(a.xmax,a.ymin,c[2],c)),b(f.set3(a.xmin,a.ymax,c[2],c)),b(f.set3(a.xmax,a.ymax,c[2],c)))}},X={create:function(a,b){var c=ha(a,b);if(!c)return D.reject(new aa("viewpointutils-create:no-target","Missing target for creating viewpoint"));var d=
new F({camera:new E({fov:a.camera.fov})}),e=null!=c.scale||null!=c.zoom||null!=c.distance;if(c.target instanceof F)return A(fa(a,c.target,c,d));if(c.target instanceof E)return A(U(a,c,c.target,d));if(c.target instanceof Z)return b=c.target.xmin===c.target.xmax||c.target.ymin===c.target.ymax,e||b?A(L(a,c,c.target.center,d)):A(ga(a,c,c.target,d));var p={boundingBox:r.create(r.NEGATIVE_INFINITY),spatialReference:a.spatialReference,hasZ:!1};return T(a,c.target,p).then(function(){if(isFinite(p.boundingBox[0])){r.center(p.boundingBox,
g);t.x=g[0];t.y=g[1];t.z=g[2];t.spatialReference=a.spatialReference;var b;isFinite(t.z)&&p.hasZ?b=r.isPoint(p.boundingBox):(t.z=void 0,b=Q.isPoint(r.toRect(p.boundingBox,ia)));if(e||b)return L(a,c,t,d);var l=t,h=p.boundingBox,q=X.DEFAULT_FRAME_COVERAGE;d.targetGeometry=l.clone();b=a.navigation.getCameraIntersectTerrain();var n=0;l.hasZ?n=l.z:a.basemapTerrain&&(n=a.basemapTerrain.getElevation(l));f.set3(l.x,l.y,n,g);v.computeLinearTransformation(a.spatialReference,g,W,a.renderSpatialReference);V.toMat3(W,
O);M.transpose(O);r.set(B,r.NEGATIVE_INFINITY);for(var l=[[0,1,2],[3,1,2],[0,4,2],[3,4,2],[0,1,5],[3,1,5],[0,4,5],[3,4,5]],u=0;u<l.length;u++){var y=l[u],z=h[y[2]];isFinite(z)||(z=n);f.set3(h[y[0]],h[y[1]],z,g);v.vectorToVector(g,a.spatialReference,g,a.renderSpatialReference);r.expand(B,M.multiplyVec3(O,g))}h=r.width(B);n=r.height(B);l=r.depth(B);u=1/Math.tan(b.fovY/2);q=Math.max(.5*Math.sqrt(h*h+l*l)*Math.max(u,1/Math.tan(b.fovX/2))+.5*n,.5*n*u+.5*Math.max(h,l))/q;k.internalToExternal(a,b,d.camera);
b={noReset:!1};J(d.camera,c)&&(b.noReset=!0);d.scale=k.distanceToScale(a,q,d.targetGeometry.latitude);b=k.fromCenterScale(a,d.targetGeometry,d.scale,d.camera,b,d.camera)?d:null;return b}b=a.navigation.getCameraIntersectTerrain();S(a,null,c,b,d)?b=d:c.position?(f.set(b.viewForward,w),k.directionToHeadingTilt(a,b.eye,w,b.up,N),d.camera.position=new x(c.position),b=d.camera,q=N.heading,h=c.heading,null==h&&null!=c.rotation&&(h=G(c.rotation)),null==h&&q&&(h="function"===typeof q?q():q),b.heading=h,b=
d.camera,q=N.tilt,q=null!=c.tilt?c.tilt:null!=q?"function"===typeof q?q():q:void 0,b.tilt=q,b=H(a,null,d)):(b=v.vectorToPoint(b.center,a.renderSpatialReference,t,a.spatialReference),b=L(a,c,b,d));return b}).then(function(a){return A(a)})},rotationToHeading:G,headingToRotation:z,toCamera:R,fromCamera:function(a,b,c){c||(c=new F);c.camera=b.clone();return H(a,null,c)},fromInternalCamera:function(a,b,c){c||(c=new F({camera:new E}));k.internalToExternal(a,b,c.camera);return H(a,b,c)},DEFAULT_FRAME_COVERAGE:.66};
return X});