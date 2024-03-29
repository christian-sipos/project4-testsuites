/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs which are not empty', function() {
            allFeeds.forEach(function(element) {
              expect(element.url).toBeDefined();
              expect(element.url.length).not.toBe(0);
           });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names which are not empty', function() {
            allFeeds.forEach(function(element) {
              expect(element.name).toBeDefined();
              expect(element.name.length).not.toBe(0);
           });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
              let hiddenCheck = document.querySelector('body').classList;
              expect(hiddenCheck).toMatch('menu-hidden');
         });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('toggles visbility when clicked', function() {
               let fClick = document.querySelector('.menu-icon-link').click();
               let toggleCheck = document.querySelector('body').classList;
               expect(toggleCheck.contains("menu-hidden")).toBeFalsy();
               fClick = document.querySelector('.menu-icon-link').click();
               toggleCheck = document.querySelector('body').classList;
               expect(toggleCheck.contains("menu-hidden")).toBeTruthy();
          });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
          beforeEach(function (done) {
              loadFeed(0, done);
          });
          it('ran and has at least one initial entry', function(done) {
              var initEntries = document.querySelectorAll('.feed .entry')
              expect(initEntries.length).toBeGreaterThan(0);
              done();
          });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         let entry1;
         let entry2;
         beforeEach(function(done) {
             loadFeed(0, function() {
                 // Store first headline of current feed
                 entry1 = document.querySelector("h2").innerText;
                 done();
             });
         });
         // Undo feed entry changes
         afterEach(function(done) {
             loadFeed(0, done);
         });
         it('the content actually changes if new feed loaded', function (done) {
             // Load new feed and compare healines of entry1 and entry2
             loadFeed(1, function() {
                 entry2 = document.querySelector("h2").innerText;
                 expect(entry1).not.toMatch(entry2);
                 done();
             });
         });
    });
}());
