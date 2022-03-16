import {$host} from "./index"

export const createReason = async (reason, institution_item) =>{
    const {data} = await $host.post('/api/reason/', {reason:reason, institution_item:institution_item});
    return data;
}

export const getAllReasons = async () =>{
    //const {data} = await $host.get('/api/reason/?institution_item='+institution_item);
    const {data} = await $host.get('/api/reason/');
    return data;
}

export const getAllInstitutions = async (institution_item) =>{
    const {data} = await $host.get('/api/reason/inst/');
    return data;
}

export const getOneReason = async (reasonId) =>{
    const {data} = await $host.get('/api/reason/'+reasonId);
    return data;
}

export const deleteReason = async (reasonId) =>{
    const {data} = await $host.delete('/api/reason/'+reasonId);
    return data;
}