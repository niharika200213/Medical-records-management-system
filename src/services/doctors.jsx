import Web3 from 'web3/dist/web3.min.js';
import medical from '../abis/medical.json';

let web3, networkId, Medical, accounts, doctors;

export const loadContract = async () => {

    try {
        web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        networkId = await web3.eth.net.getId();
        accounts = await web3.eth.requestAccounts();
        Medical = new web3.eth.Contract(medical.abi, medical.networks[networkId].address);
        return accounts[0];
    }
    catch (err) {
        console.log(err)
    }
}

export const getDoctors = async () => {
    try {
        doctors = await Medical.methods.getDoctorList().call();
        return doctors;
    }
    catch (err) {
        return false;
    }
}

export const getPatients = async () => {
    try {
        const patients = await Medical.methods.getPatientList().call();
        return patients;
    }
    catch (err) {
        return false;
    }
}

export const getDocByAddr = async (addr) => {
    try {
        const doc = await Medical.methods.getDoctorByAddress(addr).call();
        return doc;
    }
    catch (err) {
        console.log(err)
    }
}

export const getPatByAddr = async (addr) => {
    try {
        const pat = await Medical.methods.getPatientByAddress(addr).call();
        return pat;
    }
    catch (err) {
        return false;
    }
}

export const regDoc = async (name, profilePic, age, clinicLocation, clinicName, specialization, contact, fees, update) => {
    try {
        await Medical.methods.addDoctor(name, profilePic, parseInt(age),
            clinicLocation, clinicName, specialization, contact, fees, update)
            .send({ from: accounts[0] });
        return true;
    }
    catch (err) {
        return false;
    }
}

export const regPat = async (name, age, profilePic, bloodgrp, allergies, remarks, update) => {
    try {
        await Medical.methods.addPatient(name, parseInt(age), profilePic, bloodgrp, allergies, remarks, update)
            .send({ from: accounts[0] });
        return true;
    }
    catch (err) {
        return false;
    }
}

export const addReport = async (patientAddr, problem, medication, remarks) => {
    try{
        const res = await Medical.methods.addReport(patientAddr, problem, medication, remarks)
        .send({ from: accounts[0] });
        return res;
    }
    catch (err) {
        return false;
    }
}

export const giveAccess = async (docAddr) => {
    try{
        await Medical.methods.giveAccessToDoc(docAddr)
        .send({ from: accounts[0] });
        return true;
    }
    catch (err) {
        return false;
    }
}

export const viewReports = async (addr) => {
    try{
        const reports = await Medical.methods.viewReports(addr)
        .call({ from: accounts[0] });
        return reports;
    }
    catch (err) {
        return []
    }
}

export const getYourPatientAccessList = async() => {
    try{
        const patientAccessList = await Medical.methods.getYourPatientAccessList()
        .call({ from: accounts[0] });
        return patientAccessList;
    }
    catch (err) {
        return false
    }
}

export const getAccessedDoctors = async() => {
    try{
        const accessedDoctors = await Medical.methods.getAccessedDoctors()
        .call({ from: accounts[0] });
        console.log("accessesDocs:"+accessedDoctors)
        return accessedDoctors;
    }
    catch (err) {
        console.log(err);
        return false
    }
}