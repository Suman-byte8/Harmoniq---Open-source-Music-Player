const fs = require('fs');
const babel = require('@babel/core');
const src = fs.readFileSync('App.jsx', 'utf8');
const result = babel.transformSync(src, {
  filename: 'App.jsx',
  configFile: false,
  babelrc: false,
  presets: ['module:@react-native/babel-preset'],
  plugins: ['nativewind/babel'],
});
console.log(result.code);
