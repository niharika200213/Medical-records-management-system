import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Accordion from '../Accordion/Accordion'
import { viewReports } from '../../../services/doctors';
import { storage } from "../../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";

const ViewReportsDoctor = (props) => {
  let location = useLocation()
  const [state, setState] = useState([])
  const [fileUpload, setFileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    showRep();
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(ref(storage, item)).then((url) => {
          setFileList((prev) => [...prev, url]);
        });
      });
    });
  }, [])
  const showRep = async () => {
    const reports = await viewReports(location.pathname.split(":")[1]);
    setState(reports);
  }

  const fileListRef = ref(storage, "files/")
  const uploadFile = () => {
    if (fileUpload == null)
      return;
    const fileRef = ref(storage, `files/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then(() => {
      alert("File Uploaded");
    })
  }
  if (state.length === 0)
    return (<><h1>No reports found</h1></>)
  else
    return (
      <>
        {state.map((arr, key) => {
          return <Accordion i={key} data={arr} key={key} />
        })}
        <div className='accord'style={{marginTop: "24px", borderRadius: "10px 10px 0px 0px"}}>
          <div style={{ marginLeft: "0" }}>
            <h1>
              Your PDF reports
            </h1>
            <input type="file" onChange={(event) => { setFileUpload(event.target.files[0]) }} />
            <p>
            <button style={{ backgroundColor: "#FF928B", borderRadius: "10px", border: "1px #FF928B solid", color: "white",
           padding: "4px 10px", fontWeight: "bolder", marginTop: "18px", marginLeft: "-2px"}} onClick={uploadFile} >Upload File</button>
            </p>
            {
              fileList.map((url) => {
                var str = String(url);
                var myString = str.substring(str.indexOf("%2F") + 3, str.indexOf("pdf") + 3);
                return <li><a href={url} target="_blank">{myString}</a></li>
              })
            }
          </div>
        </div>

      </>
    )
}

export default ViewReportsDoctor