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
        const IPFS = require('ipfs');
        const ipfs =  new IPFS();

        let ready = false;
        while (!ready)
        {
            ipfs.on('ready', () => {
                ready=true;
            });
            console.log('IPFS node starting up...');
            await sleep(100);
        }
       
        console.log('IPFS node is ready');
        
        const version = await ipfs.version()
        console.log('ipfs version: ', version);
        
        await ipfs.stop()
        console.log('Node stopped!')
        
        
    });

    // it('add file to IPFS', async () => {
    //     const IPFS = require('ipfs');
    //     const ipfs =  new IPFS();

    //     let ready = false;
    //     while (!ready)
    //     {
    //         ipfs.on('ready', () => {
    //             ready=true;
    //         });
    //         console.log('IPFS node starting up...');
    //         await sleep(100);
    //     }
       
    //     console.log('IPFS node is ready');
            
    //     ipfs.version()
    //     .then((version) => {
    //         console.log('ipfs version: ', version);
            
    //         ipfs.stop()
    //         .then(() => console.log('Node stopped!'))
    //         .catch(error => console.error('Node failed to stop cleanly!', error))
    //     })
    //     .catch((error)=>console.error('failed to get version', error))   
    // });

    it('last test',  () => {
        console.log('finish');
    });

    
});
