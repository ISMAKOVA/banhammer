import {$host} from "./index"

export const createMemeMark = async (mark, memeId) =>{
    const {data} = await $host.post('/api/meme_mark/', {mark:mark, memeId:memeId});
    return data;
}

export const getAllMemeMarks = async () =>{
    //const {data} = await $host.get('/api/meme_mark/?memeId='+memeId);
    const {data} = await $host.get('/api/meme_mark/');
    return data;
}

export const getSummarizedForMeme = async (memeId) =>{
    //const {data} = await $host.get('/api/meme_mark/?memeId='+memeId);
    const {data} = await $host.get('/api/meme_mark/getSummarized/?memeId='+memeId);
    return data;
}

export const getOneMemeMark = async (memeMarkId) =>{
    const {data} = await $host.get('/api/meme_mark/'+memeMarkId);
    return data;
}


export const deleteMemeMark = async (memeMarkId) =>{
    const {data} = await $host.delete('/api/meme_mark/'+memeMarkId);
    return data;
}

// Нужно еще сводную оценку мему считать...