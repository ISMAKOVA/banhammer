import {$host} from "./index"

export const createComplaint = async (notes, memeId, reasonId) =>{
    const {data} = await $host.post('/api/complaint/', {notes:notes, memeId:memeId, reasonId:reasonId});
    return data;
}

export const getAllComplaint = async () =>{
    //const {data} = await $host.get('/api/complaint/?memeId='+memeId+"&reasonId="+reasonId); // БУДЕТ ЛИ ЭТО РАБОТАТЬ? И нужны ли фильтры вообще?
    const {data} = await $host.get('/api/complaint/');
    return data;
}


export const getOneComplaint = async (complaintId) =>{
    const {data} = await $host.get('/api/complaint/'+complaintId);
    return data;
}

export const deleteComplaint = async (complaintId) =>{
    const {data} = await $host.delete('/api/complaint/'+complaintId);
    return data;
}

export const updateComplaint = async (complaintId, notes, memeId, reasonId) =>{
    const {data} = await $host.put('/api/complaint/'+complaintId, {notes:notes, memeId:memeId, reasonId:reasonId});
    return data;
}