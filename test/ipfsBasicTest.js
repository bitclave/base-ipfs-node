const should = require('chai')
    .use(require('chai-as-promised'))
    .should();

describe('basic IPFS test', async () => {
    it('check mocha setup', async () => {
        let one=1;
        one.should.be.equal(1);
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    it('add file to IPFS',  async () => {
        console.log('starting IPFS node...');

        const IPFS = require('ipfs');
        const ipfs =  new IPFS();

        const promise = new Promise (resolve => ipfs.on('ready', () => {resolve()} ));
        await promise;

        // let ready = false;
        // while (!ready)
        // {
        //     ipfs.on('ready', () => {
        //         ready=true;
        //     });
        //     console.log('IPFS node starting up...');
        //     await sleep(100);
        // }
       
        console.log('IPFS node is ready');
        
        const version = await ipfs.version()
        // console.log('ipfs version: ', version);

        const file1Content='file1 content';
        const buffer = Buffer.from(file1Content)
          
        let fileHash
        await new Promise (resolve => ipfs.files.add(buffer,  (err, filesAdded) => {
            // console.log(filesAdded);
            fileHash = filesAdded[0].hash;
            resolve();    
        }));
        
        let fileContentFromIpfs
        // console.log('file#0 hash=', fileHash);
        await new Promise (resolve => ipfs.files.cat(fileHash,  (err, data) => {
            // console.log(data.toString());
            fileContentFromIpfs = data.toString();
            resolve();    
        }));

        // console.log('Node stopping...!')
        await ipfs.stop()
        // console.log('Node stopped!')

        fileContentFromIpfs.should.be.not.equal(file1Content+1);
        fileContentFromIpfs.should.be.equal(file1Content);
        
        console.log('finished add file test');
    });

    

    it('last test',  () => {
        console.log('Last printout');
    });

    
});
