import React, { useEffect, useState } from 'react'
import { showDoctors } from '../../../services/showPatients'
import CardDoc from '../CardDoc/CardDoc'

const AccessDoctors = (props) => {
    const [docs, setDocs] = useState([])
    useEffect(() => {
        getDocs()
    }, [])
    let x = []
    const getDocs = async () => {
        if (props.isDoc)
            x[0] = { ...props.isDoc, addr: props.account }
        else
            x = await showDoctors()

        console.log(x)
        setDocs(x)
    }


    return (
        <div style={{ display: 'flex', flexWrap: "wrap" }}>
            {
                docs.map((doc, key) => {
                    return <CardDoc state={doc} key={key} isDoc={props.isDoc}/>
                })
            }
        </div>
    )
}

export default AccessDoctors