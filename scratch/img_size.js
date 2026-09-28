const fs = require('fs');
const path = require('path');

// Read basic jpeg size from header
function getJpegSize(filePath) {
  const buf = fs.readFileSync(filePath);
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xFF) break;
    const marker = buf[i + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buf.readUInt16BE(i + 5);
      const width = buf.readUInt16BE(i + 7);
      return { width, height };
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
  return null;
}

['assets/hero.jpg', 'assets/hero-banner.jpg', 'assets/sales1.jpg', 'assets/sales2.jpg'].forEach(f => {
  console.log(f, getJpegSize(f));
});
