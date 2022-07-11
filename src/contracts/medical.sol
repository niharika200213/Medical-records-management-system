// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract medical {
    struct patientDetails {
        string name;
        uint256 age;
        string profilePic;
        string bloodgrp;
        string allergies;
        string remarks;
        address[] doctorAccessList;
        patientReport[] reports;
    }

    struct patientReport {
        address doc;
        uint256 date;
        string problem;
        string medication;
        string remarks;
    }

    struct doctorInfo {
        string name;
        string profilePic;
        uint256 age;
        address[] patientAccessList;
        string clinicLocation;
        string clinicName;
        string specialization;
        uint256 contact;
        uint256 fees;
    }

    address[] public patientList;
    address[] public doctorList;

    mapping(address => patientDetails) patient;
    mapping(address => doctorInfo) doctor;

    event doctorAdded(
        string name,
        string profilePic,
        uint256 age,
        string clinicLocation,
        string clinicName,
        string specialization,
        uint256 contact,
        uint256 fees
    );

    event patientAdded(
        string name,
        uint256 age,
        string profilePic,
        string bloodgrp,
        string allergies,
        string remarks
    );

    event reportAdded(
        address indexed patientAddr,
        string indexed problem,
        string medication,
        string remarks,
        uint256 indexed date,
        address byDoc
    );

    event givenAccess(address by, address to);

    function addDoctor(
        string memory name,
        string memory profilePic,
        uint256 age,
        string memory clinicLocation,
        string memory clinicName,
        string memory specialization,
        uint256 contact,
        uint256 fees,
        uint256 update
    ) public returns (bool) {
        address addr = msg.sender;
        if (update == 0) {
            if (doctor[addr].age > 0) revert("Doctor already registered");
        }
        if (patient[addr].age > 0) revert("you are a patient");

        doctor[addr].name = name;
        doctor[addr].age = age;
        doctor[addr].profilePic = profilePic;
        doctor[addr].clinicLocation = clinicLocation;
        doctor[addr].clinicName = clinicName;
        doctor[addr].specialization = specialization;
        doctor[addr].contact = contact;
        doctor[addr].fees = fees;

        if (update == 0) doctorList.push(addr);
        emit doctorAdded(
            name,
            profilePic,
            age,
            clinicLocation,
            clinicName,
            specialization,
            contact,
            fees
        );
        return true;
    }

    function addPatient(
        string memory name,
        uint256 age,
        string memory profilePic,
        string memory bloodgrp,
        string memory allergies,
        string memory remarks,
        uint256 update
    ) public returns (bool) {
        address addr = msg.sender;
        if (doctor[addr].age > 0) revert("you are a doctor");
        if (update == 0) {
            if (patient[addr].age > 0) revert("you are already registered");
        }
        patient[addr].name = name;
        patient[addr].age = age;
        patient[addr].profilePic = profilePic;
        patient[addr].bloodgrp = bloodgrp;
        patient[addr].allergies = allergies;
        patient[addr].remarks = remarks;
        if (update == 0) patientList.push(addr);
        emit patientAdded(name, age, profilePic, bloodgrp, allergies, remarks);
        return true;
    }

    function getDoctorList() public view returns (address[] memory) {
        return doctorList;
    }

    function getPatientList() public view returns (address[] memory) {
        return patientList;
    }

    function getDoctorByAddress(address docAddr)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        if (doctor[docAddr].age == 0)
            revert("wrong address! doctor does not exists");
        doctorInfo storage doc = doctor[docAddr];
        return (
            doc.name,
            doc.profilePic,
            doc.age,
            doc.clinicLocation,
            doc.clinicName,
            doc.specialization,
            doc.contact,
            doc.fees
        );
    }

    function getPatientByAddress(address patAddr)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            address[] memory,
            patientReport[] memory
        )
    {
        if (patient[patAddr].age == 0)
            revert("wrong address! patient does not exists");
        patientDetails storage pat = patient[patAddr];
        return (
            pat.name,
            pat.age,
            pat.profilePic,
            pat.bloodgrp,
            pat.allergies,
            pat.remarks,
            pat.doctorAccessList,
            pat.reports
        );
    }

    function getYourPatientAccessList() public view returns (address[] memory) {
        if (doctor[msg.sender].age == 0) revert("doctor does not exists");
        return (doctor[msg.sender].patientAccessList);
    }

    function addReport(
        address patientAddr,
        string memory problem,
        string memory medication,
        string memory remarks
    ) public returns (bool) {
        if (doctor[msg.sender].age == 0) revert("doctor does not exists");

        for (
            uint256 i = 0;
            i < doctor[msg.sender].patientAccessList.length;
            i++
        ) {
            if (doctor[msg.sender].patientAccessList[i] == patientAddr) {
                patientReport memory report;

                report.doc = msg.sender;
                report.problem = problem;
                report.medication = medication;
                report.remarks = remarks;
                report.date = block.timestamp;

                patient[patientAddr].reports.push(report);

                emit reportAdded(
                    patientAddr,
                    problem,
                    medication,
                    remarks,
                    block.timestamp,
                    msg.sender
                );
                return true;
            }
        }
        revert("please ask the patient to give access");
    }

    function giveAccessToDoc(address docAddr) public returns (bool) {
        if (doctor[docAddr].age == 0) revert("doctor does not exists");
        for (uint256 i = 0; i < doctor[docAddr].patientAccessList.length; i++) {
            if (doctor[docAddr].patientAccessList[i] == msg.sender)
                revert("doctor already have access");
        }
        doctor[docAddr].patientAccessList.push(msg.sender);
        patient[msg.sender].doctorAccessList.push(docAddr);
        emit givenAccess(msg.sender, docAddr);
        return true;
    }

    function getAccessedDoctors() public view returns (address[] memory) {
        return patient[msg.sender].doctorAccessList;
    }

    function viewReports(address patientAddr)
        public
        view
        returns (patientReport[] memory)
    {
        if (msg.sender == patientAddr) return patient[patientAddr].reports;
        for (
            uint256 i = 0;
            i < doctor[msg.sender].patientAccessList.length;
            i++
        ) {
            if (doctor[msg.sender].patientAccessList[i] == patientAddr)
                return patient[patientAddr].reports;
        }
        revert("you are not allowed to access these reports");
    }
}
