import * as React from 'react';
import {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getAllReasons} from "../http/reasons_api";
import {getOneMeme, userVK} from "../http/memes_api";
import {createComplaint} from "../http/complaints_api";

export default function ComplainPage() {
    let {id} = useParams();

    const [reasons, setReasons] = useState([]);
    const [currentReason, setCurrentReason] = useState([]);
    const [institution, setInstitution] = useState([]);

    const [textVk, setTextVk] = useState('');
    const [complainText, setComplainText] = useState('');
    const navigate = useNavigate();

    const institutions = [
            {id:1, name: "Администрация ВК"},
            {id:2, name: "Прокуратура РФ"},
            {id:3, name: "Президент РФ"}
    ]
    const institutions2 = {
        1: "Администрация ВК",
        2: "Прокуратура РФ",
        3: "Президент РФ"
    }
    useEffect(async () => {
        const reasons = await getAllReasons();
        setReasons(reasons);
        const reason = reasons.find(el=> {
            return el.reason === reasons[0].reason
        })
        setInstitution(institutions2[reason.institution_item]);
        const meme = await getOneMeme(id);
        const complain = "VK route: "+ meme.vk_route+"\n"+"Текст мема: "+ meme.text;
        setComplainText(complain)

    }, [])

    const onSelectChange = (e) => {
        const {value} = e.target;
        setCurrentReason(value);
        const reason = reasons.find(el=> {
            return el.reason === value
        })
        setInstitution(institutions2[reason.institution_item]);
    }
    const onSave = async () => {
        const reason = reasons.find(el=> {
            return el.reason === reasons[0].reason
        })
        const save = await createComplaint(complainText, id, reason.id);
        navigate("/main");
    }

    return(
       <Fragment>
            <div className="p-10">
                <div
                    className="px-6 py-4 font-medium text-xl text-gray-700">Жалоба</div>
                <div
                    className="max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-blue-700/10 bg-white/80 pt-2">
                    <div className="flex flex-row h-full">
                        <div className="px-8 py-2 grow">
                            <div className="text-sm mb-2 text-gray-400">Причина жалобы {id}</div>
                            <select value={currentReason} onChange={onSelectChange} className="text text-gray-700">
                                {reasons.map(reason =>
                                    <option id={reason.id} value={reason.reason} selected={currentReason === reason.reason}>{reason.reason}</option>
                                )}
                            </select>
                        </div>
                        <div className="px-8 py-2">
                            <div className="text-sm mb-2 text-gray-400">Институция</div>
                            <p className="text text-left text-gray-700 ">{institution}</p>
                        </div>
                    </div>

                <div className="px-8 py-2">
                    <div className="text-sm mb-2 text-gray-400">Текст мема</div>
                    <textarea
                        value={complainText}
                        onChange={e => setComplainText(e.target.value)}
                        style={{minHeight: "200px"}}
                        className="w-full rounded-3xl bg-gray-200 text-sm px-6 py-2 resize-none hover:resize text-gray-700"
                        placeholder="Текст">
                                </textarea>
                </div>
                    <div className="flex flex-row-reverse items-center px-8 py-6">
                        <button onClick={onSave}
                            className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 w-32 ml-2">Отправить
                        </button>
                    </div>
            </div>

            </div>

       </Fragment>);
}
