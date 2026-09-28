const fs = require('fs');

function getJpegSize(filePath) {
  try {
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
  } catch(e) {}
  return null;
}

['our-vision.JPG', 'our-mission.jpg', 'more-than-jewelry.jpg', 'sales-popup-bg.jpg', 'about-page-banner.jpg', 'sign-up-pic.jpg', 'account-overview-banner.jpg'].forEach(f => {
  console.log(f, getJpegSize('assets/' + f));
});
