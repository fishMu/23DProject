// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(w,v){v.manhattanDistance=function(a,b){return Math.abs(b.x-a.x)+Math.abs(b.y-a.y)};v.fitCircleLSQ=function(a,b){b?(b.radius=0,b.center.x=0,b.center.y=0):b={radius:0,center:{x:0,y:0}};if(0===a.length)return b;if(1===a.length)return b.center.x=a[0].x,b.center.y=a[0].y,b;if(2===a.length){var f=a[0];a=a[1];var e=[a.x-f.x,a.y-f.y],c=e[0],e=e[1];b.radius=Math.sqrt(c*c+e*e)/2;b.center.x=(f.x+a.x)/2;b.center.y=(f.y+a.y)/2;return b}for(var h=0,k=0,d=0;d<a.length;d++)h+=
a[d].x,k+=a[d].y;for(var h=h/a.length,k=k/a.length,l=a.map(function(a){return a.x-h}),q=a.map(function(a){return a.y-k}),r=f=b=0,m=0,g=c=0,d=e=0;d<l.length;d++){var n=l[d],p=q[d],t=n*n,u=p*p;b+=t;f+=u;r+=n*p;m+=t*n;c+=u*p;g+=n*u;e+=p*t}d=b;l=r;q=f;m=.5*(m+g);c=.5*(c+e);e=d*q-r*l;g=(m*q-c*l)/e;c=(d*c-r*m)/e;return{radius:Math.sqrt(g*g+c*c+(b+f)/a.length),center:{x:g+h,y:c+k}}}});