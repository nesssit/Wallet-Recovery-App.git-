import {encode, decode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

if (typeof __dirname === 'undefined') {
  global.__dirname = '/';
}
if (typeof __filename === 'undefined') {
  global.__filename = '';
}
if (typeof process === 'undefined') {
  global.process = require('process');
} else {
  const bProcess = require('process');
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

process.browser = false;
if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}
