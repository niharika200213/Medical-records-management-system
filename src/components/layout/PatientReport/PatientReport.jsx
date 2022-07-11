import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Accordion from '../Accordion/Accordion'
import {viewReports} from '../../../services/doctors';
import CollapseCard from '../ShowPatients/CollapseCard';
import CardDoc from '../CardDoc/CardDoc';

const PatientReport = (props) => {
    useEffect(()=>{
        const reports = showRep();
      })
      const showRep = async() => {
        const reports = await viewReports(props.account);
        return reports;
      }
}
export default PatientReport