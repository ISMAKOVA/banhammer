import {$host} from "./index"

export const createMeme = async (image_url, vk_route, text) =>{
    const {data} = await $host.post('/api/meme/', {image_url:image_url, vk_route:vk_route, text:text});
    return data;
}

export const getAllMemes = async () =>{
    const {data} = await $host.get('/api/meme/');
    return data;
}


export const getOneMeme = async (memeId) =>{
    const {data} = await $host.get('/api/meme/'+memeId);
    return data;
}

export const updateMeme = async (id, img, vk_route, text) =>{
    const {data} = await $host.put('/api/meme/', {id: id, image_url:img, vk_route:vk_route, text:text});
    return data;
}

export const classifyPicInMeme = async (img) =>{
    const {data} = await $host.post('/api/meme/classifyPic', {url:img});
    return data;
}

export const scanPicInMeme = async (img) =>{
    const {data} = await $host.post('/api/meme/scanPic', {url:img});
    return data;
}

export const classifyByToxicText = async (text) =>{
    const {data} = await $host.post('/api/meme/classifyToxicText', {text:text});
    return data;
}

export const classifyBySomeText = async (text) =>{
    const {data} = await $host.post('/api/meme/classifySomeText', {text:text});
    return data;
}

export const userVK = async (vkRoute) =>{
    const {data} = await $host.post('/api/meme/userVK', {vkRoute:vkRoute});
    return data;
}

export const deleteMeme = async (memeId) =>{
    const {data} = await $host.delete('/api/meme/'+memeId);
    return data;
}
