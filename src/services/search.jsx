import { getDocByAddr, getPatByAddr, getPatients, getDoctors } from "./doctors";

export const searchDoc = async (name) => {
    try {
        const doctorsAddr = await getDoctors();
        let doc;
        const docData = await Promise.all(doctorsAddr.map(async (addr) => {
            doc = await getDocByAddr(addr);
            console.log(doc)
            return {...doc, addr:addr};
        }));
        const res = docData.filter((addr) => {
            if (addr[0].toLowerCase() === name.toLowerCase())
                return addr;
            else return false
        })
        return res;
    }
    catch (err) {
        return false;
    }
}

export const searchPat = async (name) => {
    try {
        const patientAddr = await getPatients();
        let pat, result;
        const patData = await Promise.all(patientAddr.map(async (addr) => {
            pat = await getPatByAddr(addr);
            return {...pat, addr:addr};
        }))
        result = patData.filter((addr) => {
            if (addr[0].toLowerCase() === name.toLowerCase())
                return addr;
            else return false
        })
        return result;
    }
    catch (err) {
        return false;
    }
}