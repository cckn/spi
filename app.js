const SPI = require("pi-spi");

const spi0 = SPI.initialize("/dev/spidev0.0");
const spi1 = SPI.initialize("/dev/spidev1.0");
const test = Buffer.from([0x02, 0x00, 0x02, 0x00]);

// spi0.clockSpeed(25000000);
// console.log(spi0.dataMode());



setInterval(() => {
  
  spi0.read(10, (error, data) => {
    console.log(data);
    console.log(bufferToBinaryFormat(data).replace(/0/g, "-"));

  })

  spi1.read(10, (error, data) => {
    console.log(data)
    console.log(bufferToBinaryFormat(data).replace(/0/g,"-"));
  });
 
}, 200);


setTimeout(()=>{


spi0.transfer(test, test.length, function (e,d) {
    if (e) console.error(e);
    console.log(d)
    
});
}, 3000)


const bufferToBinaryFormat = (buffer) => {
  const result = [];
  for (let i = 0; i < buffer.length; i++) {
    result.push(buffer[i].toString(2).padStart(8, "0"));
  }
  return result.join(":");
};
