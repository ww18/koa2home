var shell = require('shelljs');
shell.exec('cnpm install --production');
shell.exec('pm2 start pm2.json');


