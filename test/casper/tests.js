casper.test.begin('TEST', 1, (test) => {
    casper.start('/test/casper/index.html').then(() => {
        test.assert(true, 'true');
        casper.wait(10000);
    }).run(() => {
        test.done();
    });
});
