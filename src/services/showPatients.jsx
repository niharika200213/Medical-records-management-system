import { getYourPatientAccessList, getPatByAddr, getAccessedDoctors, getDocByAddr } from './doctors';
export const showPatients = async () => {
    try {
        const patList = await getYourPatientAccessList();
        if (patList) {
            let pat;
            const patData = await Promise.all(patList.map(async (addr) => {
                pat = await getPatByAddr(addr);
                return {...pat, addr:addr};
            }));
            return patData;
        }
        else 
            return [];
    }
    catch (err) {
        return false
    }
}

export const showDoctors = async () => {
    try {
        const docList = await getAccessedDoctors();
        if (docList) {
            let doc;
            const docData = await Promise.all(docList.map(async (addr) => {
                doc = await getDocByAddr(addr);
                return {...doc, addr:addr};
            }));
            return docData;
        }
        else 
            return [];
    }
    catch (err) {
        return false
    }
}