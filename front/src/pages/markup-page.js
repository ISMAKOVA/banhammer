import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router-dom";
import {classifyBySomeText, classifyByToxicText, classifyPicInMeme, getOneMeme} from "../http/memes_api";
import {createMemeMark} from "../http/memes_marks_api";

function MarkupPage() {
    let {id} = useParams();
    const [img, setImg] = useState('');
    const [text, setText] = useState('');
    const [spinner, setSpinner] = useState(false);

    const [toxic, setToxic] = useState(0);
    const [offensive, setOffensive] = useState(0);
    const [unoffensive, setUnoffensive] = useState(0);
    const [coefficient, setCoefficient] = useState(0);
    const [isTotalResultToxic, setIsTotalResultToxic] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        const meme = await getOneMeme(id);
        setImg(meme?.img);
        setText(meme?.text);
    }, [])

    const autoClassification = async () => {
        setSpinner(true);
        const toxic = await classifyByToxicText(text);
        const coefficient = await classifyBySomeText(text);
        const offensiveness = await classifyPicInMeme(img);
        setToxic(parseFloat(toxic.toxic));
        setOffensive(parseFloat(offensiveness.offensive)/100);
        setUnoffensive(parseFloat(offensiveness.unoffensive)/100);
        setCoefficient(parseFloat(coefficient.proportion_rude_to_text));

        setIsTotalResultToxic((Math.round(parseInt(toxic.toxic)) + Math.round(parseInt(offensiveness.offensive)/100)
            + parseInt(coefficient.proportion_rude_to_text)) > 1.5);

        setSpinner(false);
    }
    const createRadioButton = (id, label, name, checked = false, disabled = true) => {
        return <div className="form-check">
            <input
                disabled={disabled}
                checked={checked}
                className="form-check-input appearance-none rounded-full h-4 w-4 border
                                                border-gray-300 bg-white checked:bg-blue-700 checked:border-blue-700
                                                focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat
                                                bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio" name={name} id={id}/>
            <label className="form-check-label inline-block text-gray-800"
                   htmlFor={id}>
                {label}
            </label>
        </div>
    }

    const onBanClick = async () => {
        const save = await createMemeMark(1, id);
        navigate("/main");
    }
    const onNotBanClick = async () => {
        const save = await createMemeMark(0, id);
        navigate("/main");
    }

    return (
        <div className="">
            <div className="p-10">
                <div className="px-6 py-4 font-medium text-xl text-gray-700">Оценить мем {id}</div>
                <div className="max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-blue-700/10 bg-white/80 pt-2">
                    <div className="px-8 pt-4">
                        {!img ?
                            <div
                                className="w-full bg-gradient-to-r from-emerald-500	to-pink-700 rounded-3xl text-center text-white"
                                style={{height: "300px", paddingTop: "145px"}}> Картинка
                            </div> :
                            <img className="w-full" src={img} alt={"Картинка"} height={300}/>}
                    </div>
                    <div className="px-8 py-4">
                        <div className="text-sm mb-2 text-gray-400">Текст мема</div>
                        <textarea
                            value={text}
                            onChange={e => setText(e.target.value)}
                            className="w-full rounded-3xl bg-gray-200 text-sm px-6 py-6 resize-none hover:resize"
                            placeholder="Текст" readOnly="true">
                                </textarea>
                    </div>

                    <div>
                        <div className="px-8 py-4">
                            <div className="text-sm mb-2 text-gray-400">Классифицировать мем с помощью ИИ</div>
                            <div className="flex flex-row gap-2">
                                <button
                                    onClick={autoClassification}
                                    className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5">Автоклассификация
                                </button>
                                {spinner ?
                                    <div className=" flex justify-center items-center">
                                        <div
                                            className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700"></div>
                                    </div> : null}
                            </div>

                        </div>
                        <div className="px-8 py-4">
                            <div className="text-sm mb-2 text-gray-400">Результат</div>
                            <div className="flex flex-row !k-gap-x-6">
                                {toxic >= 0.5 ?
                                    <div>
                                        {createRadioButton(0, "Токсично", "radio1", true)}
                                        {createRadioButton(1, "Нетоксично", "radio1", false)}
                                    </div> :
                                    <div>
                                        {createRadioButton(0, "Токсично", "radio1", false)}
                                        {createRadioButton(1, "Нетоксично", "radio1", true)}
                                    </div>}

                                {offensive >= 0.5 ?
                                    <div>
                                        {createRadioButton(0, "Агрессивно", "radio2", true)}
                                        {createRadioButton(1, "Неагрессивно", "radio2", false)}
                                    </div> :
                                    <div>
                                        {createRadioButton(0, "Агрессивно", "radio2", false)}
                                        {createRadioButton(1, "Неагрессивно", "radio2", true)}
                                    </div>}
                            </div>
                        </div>
                        <div className="px-8 py-3">
                            <p className="text text-gray-400">Коэффициент неприличности <span
                                className="text-blue-700 font-bold">{Math.round((coefficient * 100)*100)/100}%</span></p>
                        </div>

                        <div className="px-8 py-3">
                            <p className="text text-gray-400">Результат анализа  <span
                                className="text-blue-700 font-bold">{isTotalResultToxic ? "БАН" : "НЕ БАН"}</span></p>
                        </div>

                    </div>
                    <div className="flex flex-row-reverse items-center px-8 py-6">
                        {isTotalResultToxic ?
                            <div>
                                <button
                                    onClick={onNotBanClick}
                                    className="rounded-full bg-pink-700	hover:bg-pink-800 text-neutral-50 px-4 py-1.5 w-32 ml-2">
                                    Не БАН
                                </button>
                                <button
                                    onClick={onBanClick}
                                    className="rounded-full bg-emerald-500 hover:bg-emerald-800 text-neutral-50 px-4 py-1.5 w-32 ml-2">БАН
                                </button>
                            </div> :
                            <div>
                                <button
                                    onClick={onBanClick}
                                    className="rounded-full bg-pink-700 hover:bg-pink-800 text-neutral-50 px-4 py-1.5 w-32 ml-2">БАН
                                </button>
                                <button
                                    onClick={onNotBanClick}
                                    className="rounded-full bg-emerald-500	 hover:bg-emerald-800 text-neutral-50 px-4 py-1.5 w-32 ml-2">
                                    НE БАН
                                </button>
                            </div>}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default MarkupPage;
