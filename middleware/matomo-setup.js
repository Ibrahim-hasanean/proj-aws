var MatomoTracker = require("matomo-tracker");

// Initialize with your site ID and Matomo URL
var matomo = new MatomoTracker(1, "https://proj-o.matomo.cloud/");

// Optional: Respond to tracking errors
matomo.on("error", function (err) {
  console.log("error tracking request: ", err);
});

// Track a request URL:
// Either as a simple string …
matomo.track("https://proj-o.herokuapp.com");

// … or provide further options:
matomo.track({
  url: "http://example.com/track/this/url",
  action_name: "This will be shown in your dashboard",
  ua: "Node.js v0.10.24",
  cvar: JSON.stringify({
    "1": ["custom variable name", "custom variable value"],
  }),
});

// … or trackBulk:
var events = [
  {
    _id: "AA814767-7B1F-5C81-8F1D-8E47AD7D2982",
    cdt: "2018-03-22T02:32:22.867Z",
    e_c: "Buy",
    e_a: "rightButton",
    e_v: "2",
  },
  {
    _id: "AA814767-7B1F-5C81-8F1D-8E47AD7D2982",
    cdt: "2018-03-22T02:33:52.962Z",
    e_c: "Buy",
    e_a: "leftButton",
    e_v: "4",
  },
];
