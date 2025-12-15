
const fs = require('fs');
const path = require('path');

const files = [
  'public/main_working.gif',
  'public/pure_quality.gif',
  'public/radical_simplicity.gif'
];

const NETSCAPE_EXT_SIGNATURE = Buffer.from([
  0x21, 0xFF, 0x0B, // Extension Introducer, App Label, Block Size
  0x4E, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45, 0x32, 0x2E, 0x30, // "NETSCAPE2.0"
  0x03, 0x01 // Sub-block len, Loop sub-block ID
]);

files.forEach(file => {
  const filePath = path.resolve(process.cwd(), file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }

  console.log(`Processing ${file}...`);

  // Read the file. ideally we stream this if files are HUGE, but 130MB is manageable in Node usually.
  try {
    const buffer = fs.readFileSync(filePath);
    
    // Search for the signature
    const index = buffer.indexOf(NETSCAPE_EXT_SIGNATURE);
    
    if (index !== -1) {
      console.log(`  Found Netscape extension at offset ${index}.`);
      
      const loopCountOffset = index + NETSCAPE_EXT_SIGNATURE.length;
      const currentLoopCount = buffer.readUInt16LE(loopCountOffset);
      
      console.log(`  Current loop count: ${currentLoopCount}`);
      
      if (currentLoopCount !== 0) {
        console.log('  Patching to 0 (infinite)...');
        buffer.writeUInt16LE(0, loopCountOffset);
        fs.writeFileSync(filePath, buffer);
        console.log('  Done.');
      } else {
        console.log('  Already infinite loop.');
      }
    } else {
      console.log('  Netscape extension NOT found. Attempting to insert it...');
      
      // If not found, we should insert it after the Global Color Table.
      // Header: 6 bytes (GIF89a)
      // Logical Screen Descriptor: 7 bytes.
      // Byte 10 (indexed from 0) contains the Global Color Table Flag.
      
      // Let's parse the header minimally
      if (buffer.toString('ascii', 0, 3) !== 'GIF') {
         console.log('  Not a valid GIF.');
         return;
      }
      
      let pos = 13; // End of header + logical screen descriptor
      const packedFields = buffer[10];
      const globalColorTableFlag = (packedFields & 0x80) !== 0;
      let colorTableSize = 0;
      
      if (globalColorTableFlag) {
        const sizeExp = packedFields & 0x07;
        colorTableSize = 3 * (1 << (sizeExp + 1));
        pos += colorTableSize;
      }
      
      console.log(`  Inserting extension at offset ${pos}`);
      
      const extBlock = Buffer.concat([
        NETSCAPE_EXT_SIGNATURE,
        Buffer.from([0x00, 0x00, 0x00]) // Loop count 0, Block Terminator
      ]);
      
      const newBuffer = Buffer.concat([
        buffer.slice(0, pos),
        extBlock,
        buffer.slice(pos)
      ]);
      
      fs.writeFileSync(filePath, newBuffer);
      console.log('  Inserted Loop extension.');
    }
    
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
});
