casper.test.begin('necklaces have load more', 1, (test) => {
    casper.start('/test/casper/index.html').then(() => {
        const result = casper.evaluate(() => {
            return !!document.querySelector('._JS-load-more');
        });

        test.assert(result, 'load more button exists');
    }).run(() => {
        test.done();
    });
});
