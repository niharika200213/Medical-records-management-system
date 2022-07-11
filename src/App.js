import Register from "./components/auth/Register/Register";
import Navbar from "./components/layout/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./components/layout/HomePage/HomePage";
import { useEffect, useState } from 'react';
import ShowPatients from './components/layout/ShowPatients/ShowPatients';
import { getDocByAddr, getPatByAddr, loadContract, addReport, giveAccess, viewReports } from "./services/doctors";
import SearchPage from "./components/layout/Search/SearchPage";
import SearchPagePatient from "./components/layout/Search/SearchPagePatient";
import AccessPage from "./components/layout/AccessPage/AccessPage";
import AddReport from "./components/layout/AddReport/AddReport";
import AccessDoctors from "./components/layout/AccessDoctors/AccessDoctors";
import ViewReportsDoctor from "./components/layout/ViewReportsDoctor/ViewReportsDoctor";
import Dashboard from "./components/layout/Dashboard/Dashboard";
import Contact from "./components/layout/Contact/Contact";
import Footer from "./components/layout/Footer";
import EditProfile from "./components/layout/EditProfile/EditProfile"

function App() {
  const [isDoc, setIsDoc] = useState(false);
  const [isPat, setIsPat] = useState(false);
  const [account, setAccount] = useState(0);

  let doc, pat, acc;

  useEffect(() => {
    const loadCont = async () => {
      acc = await loadContract();
      setAccount(acc);
      doc = await getDocByAddr(acc);
      pat = await getPatByAddr(acc);
      setIsDoc(doc);
      setIsPat(pat);
    }
    loadCont();
  }, [account]);

  window.ethereum.on('accountsChanged', function (accounts) {
    setAccount(accounts[0]);
  });

  const onReg = async(doc, pat) => {
    let patient, doctor
    if (pat === true) {
      patient = await getPatByAddr(account);
      setIsPat(patient)
    }
    else if (doc === true) {
      doctor = await getDocByAddr(account);
      setIsDoc(doctor)
    }
  }

  return (
    <>
      <Navbar isDoc={isDoc} isPat={isPat}/>
      <Routes>
        <Route exact path="/" element={<HomePage account={account} isDoc={isDoc} isPat={isPat}/>} />
        <Route exact path="/search/doctor/:query" element={<SearchPage/>} />
        <Route exact path="/search/patient/:query" element={<SearchPagePatient/>} />
        <Route exact path="/show-patients" element={<ShowPatients account={account} isDoc={isDoc} isPat={isPat}/>}/>
        <Route exact path="/give-access" element={<AccessPage/>}/>
        <Route exact path="/add-report" element={<AddReport/>}/>
        <Route exact path="/access-doctors" element={<AccessDoctors account={account} isDoc={isDoc}/>}/>
        <Route exact path="/view-record/:id" element={<ViewReportsDoctor/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/register" element={<Register onComplete={onReg} isDoc={isDoc} isPat={isPat}/>} />
        <Route exact path="/editProfile" element={<EditProfile isDoc={isDoc} isPat={isPat} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;