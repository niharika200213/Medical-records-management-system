const {assert} = require('chai');
require("chai")
    .use(require('chai-as-promised'))
    .should()

const medical=artifacts.require("medical");

contract('medical', (accounts) => {
    let contract;
    
    describe('deployment', async() => {
        it('deploys successfully', async() => {
            contract = await medical.deployed();
            const address = contract.address;
            assert.notEqual(address,'');
            assert.exists(address);
            assert.notEqual(address,0x0);
        })
    })

    describe('doctor', async() => {
        it('adds a doctor', async() => {
            let name='niharika',profilePic='gdyew',age=19,city='gzb',
            cname='jhe',spec='kjhej',cont=7263,fees=400,update=0;
            const result = await contract.addDoctor(name,profilePic,age,city,cname,spec,cont,
                fees, update, {from:accounts[0]});
            const result2 = await contract.addDoctor('nanu',profilePic,age,city,cname,spec,cont,
                fees, update, {from:accounts[1]});
            console.log(result, result2)
            assert.equal(result.logs[0].args.name,'niharika');
        })

        it('adds patient', async() => {
            const result = await contract.addPatient('abc',33,"","","","",0,{from:accounts[2]});
            assert.equal(result.logs[0].event,'patientAdded')
        })

        it('gets patient by addr', async() => {
            const result = await contract.getPatientByAddress(accounts[2]);
            console.log(result);
        })

        it('gets patient list', async() => {
            const result = await contract.getPatientList();
            console.log(result);
        })

        it('gets doctor list', async() => {
            const result = await contract.getDoctorList();
            console.log(result)
        })

        it('gets doctor by address', async() => {
            const result = await contract.getDoctorByAddress(accounts[0]);
            const result2 = await contract.getDoctorByAddress(accounts[1]);
            console.log(result,result2)
        })

        it('gives access to doc', async() => {
            const result = await contract.giveAccessToDoc(accounts[0],{from:accounts[2]});
            assert.equal(result.logs[0].event,'givenAccess');
        })

        it('gets patient access list', async() => {
            const result = await contract.getYourPatientAccessList({from:accounts[0]});
            console.log(result)
        })

        it('gets accessed doctors list', async() => {
            const result = await contract.getAccessedDoctors({from:accounts[2]});
            console.log(result)
        })

        it('adds report', async() => {
            const result = await contract.addReport(accounts[2], 'diabetes', 'medicine', 
                'workout', {from:accounts[0]});
            const result2 = await contract.addReport(accounts[2], 'abc', 'medicine', 
                'workout', {from:accounts[0]});
            assert.equal(result.logs[0].event,'reportAdded')
        })

        it('gets report', async() => {
            const result = await contract.viewReports(accounts[2], {from:accounts[0]});
            console.log(result)
        })
    })
    
})