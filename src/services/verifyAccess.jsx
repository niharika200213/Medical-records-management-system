import { getAccessedDoctors } from './doctors';
export const verifyAccess = async(docAddr) => {
    try{
        const doctors = await getAccessedDoctors();
        const response = doctors.find((addr)=>{return addr===docAddr});
        return response;
    }
    catch (err) {
        return false
    }
}