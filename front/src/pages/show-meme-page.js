import React, {Fragment, useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router-dom";
import {deleteMeme, getOneMeme, updateMeme, userVK} from "../http/memes_api";

function ShowMemePage() {
    let {id} = useParams();
    const [img, setImg] = useState('');
    const [text, setText] = useState('');
    const [vkRoute, setVkRoute] = useState('');
    const [textVk, setTextVk] = useState('');
    const navigate = useNavigate();

    useEffect(async () => {
        const meme = await getOneMeme(id);
        setImg(meme?.img);
        setText(meme?.text);
        setTextVk(meme?.vk_route);
    }, []);

    const getVkRouteValue = async () => {
        const value = await userVK(vkRoute);
        const text ='id: '+ value?.id+ ', '+ value?.last_name + ' '+ value?.first_name;
        setTextVk(text);
    }

    const onUpdate = async () => {
        const save = await updateMeme(id, img, textVk, text);
        navigate("/main");
    }

    const onDelete = async () => {
        const deleteMem = await deleteMeme(id);
        navigate("/main");

    }
    return (
        <div className="">
            <div className="p-10 h-full">
                <div className="px-6 py-4 font-medium text-xl text-gray-700">Мем {id}</div>
                <div
                    className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-700/10 bg-white/80 pt-2">
                    <div className="flex flex-col md:flex-row">
                        <div className="px-8 pt-4 grow">
                            {!img ?
                                <div
                                    className="w-full bg-gradient-to-r from-emerald-500	to-pink-700 rounded-3xl text-center text-white"
                                    style={{height: "300px",  paddingTop: "145px"}}> Картинка
                                </div> :
                                <img className="w-full" src={img} alt={"Картинка"} height={300}/>}
                        </div>
                        <div className="flex flex-col">
                            <div className="px-8 py-4">
                                <div className="text-sm mb-2 text-gray-400">Текст мема</div>
                                <textarea
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    style={{minHeight:"200px"}}
                                    className="w-full rounded-3xl bg-gray-200 text-sm px-6 py-2 resize-none hover:resize"
                                    placeholder="Текст" >
                                </textarea>
                            </div>
                            <div className="px-8 pt-4">
                                <div className="text-sm mb-2 text-gray-500">Данные из VK</div>
                                <div className="flex content-center">
                                    <p className="text-justify text-gray-500">{textVk}</p>
                                </div>
                            </div>
                            <div className="px-8 pt-4">
                                <div className="text-sm mb-2 text-gray-500">Обновить VK route</div>
                                <div className="flex content-center flex-wrap gap-2 justify-items-stretch">
                                    <input
                                        value={vkRoute}
                                        onChange={e => setVkRoute(e.target.value)}
                                        className="grow rounded-3xl bg-gray-200 text-sm px-6 py-2  resize-none hover:resize"
                                        placeholder="Route">
                                    </input>
                                    <button
                                        onClick={getVkRouteValue}
                                        className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 sm:w-full md:w-32 ">Получить
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse items-center px-8 py-6">
                                <button
                                    onClick={onUpdate}
                                    className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 w-32 ml-2">Обновить
                                </button>


                                <button
                                    onClick={onDelete}
                                    className="rounded-full bg-pink-700 hover:bg-pink-800 text-neutral-50 px-4 py-1.5 w-32">Удалить
                                </button>
                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}

export default ShowMemePage;
