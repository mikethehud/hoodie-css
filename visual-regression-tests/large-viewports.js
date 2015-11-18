
// We need this because PhantomCSS isn't a npm package
var fs = require('fs');
var path = fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/phantomcss.js');
var phantomcss = require(path);

// Begin testing
casper.test.begin('Run tests against pages with a viewport of 1440 x 900', function(test) {

  phantomcss.init({
    // Reference to a particular Casper instance. Required for SlimerJS.
    // Refers to itself because we're running CasperJS directly 
    casper: casper,
    // Points to the PhantomCSS library
    libraryRoot: fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/'),
    // Folder for all screenshots
    screenshotRoot: fs.absolute(fs.workingDirectory + '/screenshots/large/'),
    // Removes results directory tree after run.  Use in conjunction with failedComparisonsRoot to see failed comparisons.
    cleanupComparisonImages: true,
    // Folder for failed comparisons
    failedComparisonsRoot: fs.absolute(fs.workingDirectory + '/screenshots/large/failures/')
  });


  casper.start('http://hood.ie', function() {

    this.viewport(1440, 900);

    this.wait(1000, function() {
      this.then(function() {
        phantomcss.screenshot('html', 'hoodie-index--1440x900');
      });

      this.then(function() {
        this.open('http://hood.ie/intro/')
        this.then(function() {
          phantomcss.screenshot('html', 'hoodie-intro--1440x900');
        });
      });

    });

    this.then(function() {
      phantomcss.compareSession();
    });
  });

  casper.run(function() {
    test.done();
  });
});
