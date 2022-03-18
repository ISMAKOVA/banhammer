import React, {Fragment, useState} from "react";
import {createMeme, scanPicInMeme, userVK} from "../http/memes_api";
import {useNavigate} from 'react-router-dom';

function AddPicPage() {
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [vkRoute, setVkRoute] = useState('');
    const [textVk, setTextVk] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [urlValidation, setUrlValidation] = useState(false);
    const navigate = useNavigate();

    const [rightUrl, setRightUrl] = useState('');

    const onUrlChange = (value) => {
        setUrl(value);
        const rgx = new RegExp('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)', 'i');
        const result = rgx.test(value);
        if (result){
            setRightUrl(value)
            setUrlValidation(true)
        }
        else{
            setUrlValidation(false)
        }
    }
    const getTextFromImg = async () => {
        setSpinner(true);
        setText('');
        const text = await scanPicInMeme(url);
        setText(text?.text);
        setSpinner(false);
    }

    const getVkRouteValue = async () => {
        const value = await userVK(vkRoute);
        const text = 'id: ' + value?.id + ', ' + value?.last_name + ' ' + value?.first_name;
        setTextVk(text);
    }
    const onSave = async () => {
        const response = await createMeme(url, textVk, text);
        navigate("/main");
    }

    return (
        <div className="flex justify-center content-center">
            <div className="p-10 w-full">
                <div className="px-6 py-4 font-medium text-xl text-gray-700">Добавить мем</div>
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-700/10 bg-white/80 pt-2">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col grow md:pb-6">
                            <div className="px-8 pt-4">
                                <div className="text-sm mb-2 text-gray-500">URL мема</div>
                                <input
                                    value={url}
                                    // onChange={e => setUrl(e.target.value)}
                                    onChange={e => onUrlChange(e.target.value)}
                                    className="w-full grow rounded-3xl bg-gray-200 text-sm px-6 py-2 resize-none hover:resize mr-2 box-border"
                                    placeholder="Мем URL">
                                </input>
                                <p className="text-sm text-red-500 pt-1"> {!urlValidation? "Проверьте корректность введенного URL": ""} </p>
                            </div>
                            <div className="px-8 pt-4">
                                {!urlValidation ?
                                    <div
                                        className="w-full bg-gradient-to-r from-blue-700 to-indigo-500 rounded-3xl text-center text-white"
                                        style={{height: "300px", paddingTop: "145px"}}> Картинка
                                    </div> :
                                    <img className="w-full" src={rightUrl} alt={"Картинка"} height={300}/>}
                            </div>
                            <div className="px-8 pt-4">
                                <button
                                    onClick={getTextFromImg}
                                    className="w-full rounded-full hover:bg-blue-800 bg-gradient-to-r from-blue-700 to-indigo-500  text-neutral-50 px-4 py-1.5 ">
                                    <span className="flex justify-center items-center gap-2">
                                        <span>Получить текст с картинки</span>
                                        {spinner ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-neutral-50"> </span>: null}
                                    </span>
                                </button>
                            </div>
                        </div>
                            <div className="flex flex-col md:pb-6">

                            <div className="px-8 pt-4 grow">
                                <div className="text-sm mb-2 text-gray-500">Текст мема</div>
                                <textarea
                                    onChange={e => setText(e.target.value)}
                                    style={{minHeight: "95%"}}
                                    className="w-full rounded-3xl bg-gray-200 text-sm px-6 py-2 resize-none hover:resize"
                                    placeholder="Текст" value={text}>
                                </textarea>
                            </div>

                            <div className="px-8 pt-4">
                                <div className="text-sm mb-2 text-gray-500">VK route</div>
                                <div className="flex content-center flex-wrap gap-2 justify-items-stretch">
                                    <input
                                        value={vkRoute}
                                        onChange={e => setVkRoute(e.target.value)}
                                        className="grow rounded-3xl bg-gray-200 text-sm px-6 py-2  resize-none hover:resize"
                                        placeholder="Route">
                                    </input>
                                    <button
                                        onClick={getVkRouteValue}
                                        className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 w-full">Получить
                                    </button>
                                </div>
                            </div>
                            {textVk ?
                                <div className="px-8 pt-4">
                                    <div className="text-sm mb-2 text-gray-500">Полученные данные из VK</div>
                                    <div className="flex content-center">
                                        <p className="text-justify text-gray-500">{textVk}</p>
                                    </div>
                                </div> : null}

                            <div className="flex flex-row-reverse items-center px-8 pt-6">
                                <button
                                    onClick={onSave}
                                    className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 w-full">Сохранить
                                </button>
                            </div>
                            </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddPicPage;
