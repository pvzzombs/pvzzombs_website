var permutation = [];
var p = [];
function perlin(x,y,z){
  y = y || 0.05;
  z = z || 0.05;

  var xi = Math.floor(x) & 255;
  var yi = Math.floor(y) & 255;
  var zi = Math.floor(z) & 255;

  var xf = x - Math.floor(x);
  var yf = y - Math.floor(y);
  var zf = z - Math.floor(z);

  var u = fade(xf);
  var v = fade(yf);
  var w = fade(zf);

  var aaa, aba, aab, abb, baa, bba, bab, bbb;

  aaa = p[p[p[  xi]+  yi]+  zi];
  aba = p[p[p[  xi]+yi+1]+  zi];
  aab = p[p[p[  xi]+  yi]+zi+1];
  abb = p[p[p[  xi]+yi+1]+zi+1];
  baa = p[p[p[xi+1]+  yi]+  zi];
  bba = p[p[p[xi+1]+yi+1]+  zi];
  bab = p[p[p[xi+1]+  yi]+zi+1];
  bbb = p[p[p[xi+1]+yi+1]+zi+1];

  var x1, x2, y1, y2;

  x1 = lerp(grad(aaa, xf, yf, zf),grad(baa, xf-1, yf, zf),u);
  x2 = lerp(grad(aba, xf, yf-1, zf),grad(bba, xf-1, yf-1, zf),u);
  y1 = lerp(x1, x2, u);
  x1 = lerp(grad(aab, xf, yf, zf-1),grad(bab, xf-1, yf, zf-1),u);
  x2 = lerp(grad(abb, xf, yf-1, zf-1),grad(bbb, xf-1, yf-1, zf-1),u);
  y2 = lerp(x1, x2, v);
  return ( lerp(y1, y2, w) + 1)/2
}
function lerp(a, b, x){
  return (b - a) * x + a
}
function grad(hash, x, y, z){
  switch(hash & 0xF){
    case 0x0 : return x + y; break;
    case 0x1 : return -x + y; break;
    case 0x2 : return x - y; break;
    case 0x3 : return -x - y; break;
    case 0x4 : return x + z; break;
    case 0x5 : return -x + z; break;
    case 0x6 : return x - z; break;
    case 0x7 : return -x - z; break;
    case 0x8 : return y + z; break;
    case 0x9 : return -y + z; break;
    case 0xA : return y - z; break;
    case 0xB : return -y - z; break;
    case 0xC : return y + x; break;
    case 0xD : return -y + z; break;
    case 0xE : return y - x; break;
    case 0xF : return -y - z; break;
    default: return 0;
  }
}

function fade(t){
  return t * t * t *( t * ( t * 6 - 15) + 10);
}

function pNoise(x,y,z,o,p){
  y = y || 0.99;
  z = z || 0.99;
  o = o || 6;
  p = p || 0.35;
  var total = 0;
  var frequency = 2;
  var amplitude = 5;
  var maxValue = 0;

  for(var i = 0; i < o; i++){
    total += perlin(x*frequency, y*frequency, z*frequency) * amplitude;

    maxValue += amplitude;

    amplitude *= p;
    frequency *= 2;
  }

  return (total / maxValue);
}

function setup(argument) {
  // body...
  var cv = createCanvas(300, 300);
  cv.parent('cv-holder');
  //noLoop();
  //noStroke();
  for(var i=0; i<256; i++){
    permutation[i] = i;
  }
  var j, temp;
  var m = permutation.length;
  while(m){
    j = Math.floor(Math.random() * m--);
    temp = permutation[m];
    permutation[m] = permutation[j];
    permutation[j] = temp;
  }
  for(var x=0; x<512; x++){
    p[x] = permutation[x % 256];
  }

}

var g = 0;

function draw(){
    line(g, pNoise(g/100) * (150 + 1), g+1, pNoise((g+1)/100 ) * (150 + 1));
    line(g, noise(g/100) * (300 - 160 + 1) + 160, g+1, noise((g+1)/100 ) * (300 - 160 + 1) + 160);
    ++g;

    /*for(var ab = 0; ab < 300; ab+=2){
      for(var bb = 0; bb < 300; bb+=2){
        fill(Math.floor(pNoise(ab/100, bb/100) * 255));
        rect(ab, bb, 2, 2);
      }
    }*/

}
