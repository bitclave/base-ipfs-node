const should = require('chai')
    .use(require('chai-as-promised'))
    .should();

describe('basic IPFS test', async () => {
    it('add file to IPFS', async () => {
        let one=1;
        one.should.be.equal(1);
    });
});
