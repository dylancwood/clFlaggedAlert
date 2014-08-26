var wscraper = require('wscraper');
var nodemailer = require('nodemailer');
var config = require('./config.json');

var fs = require('fs');

var script = fs.readFileSync('lib/isRemoved.js');

var agent = wscraper.createAgent();

agent.on('start', function (n) {
    console.log('[wscraper.js] agent has started; ' + n + ' path(s) to visit');
});

agent.on('done', function (url, result) {
    console.log('[wscraper.js] data from ' + url);
    // display the results    
    if (result.isRemoved) {
        console.log('Achtung! it has been removed!');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: config.mailAuth
        });
        transporter.sendMail(
            {
                from: config.mailAuth.user,
                to: config.alertEmail,
                subject: 'Craigslist Ad Down!',
                text: 'The craigslist ad at ' + url + ' has been removed!'
            },
            function (err, info) {
                if (err) { 
                    console.log(err.toString());
                } else {
                    console.log('Alert sent to: ' + config.alertEmail);
                }
            }
        );
    } else {
        console.log('All good! still up');
    }
    // next item to process if any
    agent.next();        
});

agent.on('stop', function (n) {
    console.log('[wscraper.js] agent has ended; ' + n + ' path(s) remained to visit');
});

agent.on('abort', function (e) {
    console.log('[wscraper.js] getting a FATAL ERROR [' + e + ']');
    console.log('[wscraper.js] agent has aborted');
    process.exit();
});

// run the web scraper agent
agent.start(config.clRootURL, config.adURLs, script);






