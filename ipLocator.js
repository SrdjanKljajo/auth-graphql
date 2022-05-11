const geoip = require('geoip-lite')
const { networkInterfaces } = require('os')
const os = require('os')
const type = os.type()

const nets = networkInterfaces()
const ip = {}

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === 'IPv4' && !net.internal) {
      if (!ip[name]) {
        ip[name] = []
      }
      ip[name].push(net.address)
    }
  }
}

exports.IPAddress = ip['en0'][0]

// Ip location
let controlIp = '212.200.247.72'
const geo = geoip.lookup(controlIp)

switch (type) {
  case 'Darwin':
    exports.OSName = 'MacOS'
    break
  case 'Linux':
    exports.OSName = 'Linux'
    break
  case 'Windows_NT':
    exports.OSName = 'Windows'
    break
  default:
    exports.OSName = 'Unknown operating system'
}

console.log(geo)
//console.log(geo.country)
//console.log(geo.city)
