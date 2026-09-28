const fs = require('fs');
const files = fs.readdirSync('assets');
files.filter(f => f.endsWith('.jpg') || f.endsWith('.JPG') || f.endsWith('.png')).forEach(f => {
  console.log(f);
});
