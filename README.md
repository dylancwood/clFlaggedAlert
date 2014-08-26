clFlaggedAlert
==============


This is a simple node.js module that will scrape a craigslist page and determine if it has been flagged for removal.
If it has been, it will send an email alert.

This script should be run by a cron every 10 minutes or so to keep tabs on your craigslist posts.

#Usage
##Installation

1. clone this repo, then cd into it.
2. run `npm install`
3. create a config.json file of the following format:
```json
{
    "alertEmail": "",
    "mailAuth": {
        "user": "",
        "pass": ""
    },
    "clRootURL": "portland.craigslist.org",
    "adURLs": [
        "mlt/cto/4637964796.html", 
        "..."
    ]
}
```
**Important: notice that the `http` prefix is not used with these URLS. This is a quirk introduce by wscraper.js, which seems to append http to the urls.**

