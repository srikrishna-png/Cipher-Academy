const JSZip = require('jszip');
const fs = require('fs');

async function testZip() {
    const zip = new JSZip();
    zip.file("test.txt", "Hello World");
    const content = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });

    // Check for PK magic bytes (50 4B 03 04)
    const magic = content.slice(0, 4).toString('hex').toUpperCase();
    console.log(`Magic Bytes: ${magic}`);
    if (magic === '504B0304') {
        console.log("SUCCESS: Valid ZIP header detected.");
    } else {
        console.log("FAILURE: Invalid ZIP header.");
    }

    fs.writeFileSync('test.zip', content);
    console.log("Created test.zip");
}

testZip().catch(console.error);
