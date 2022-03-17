import * as React from 'react';
import {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function ComplainPage() {
    let {id} = useParams();

    const [reasons, setReasons] = useState([]);
    useEffect(() => {
        setReasons([
            {id: 0, label: "Токсично", enLabel: "toxic"},
            {id: 1, label: "Нетоксично", enLabel: "no_toxic"}
        ])
    }, [])

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
                            <select>
                                {reasons.map(reason =>
                                    <option id={reason.id}>{reason.label}</option>
                                )}
                            </select>
                        </div>
                        <div className="px-8 py-2">
                            <div className="text-sm mb-2 text-gray-400">Институция</div>
                            <p className="text text-left ">So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers</p>
                        </div>
                    </div>

                <div className="px-8 py-2">
                    <div className="text-sm mb-2 text-gray-400">Текст мема</div>
                    <textarea
                        className="w-5/6 rounded-3xl bg-gray-200 text-sm px-6 py-4 resize-none hover:resize"
                        placeholder="Текст" readOnly="true">
                                </textarea>
                </div>
                    <div className="flex flex-row-reverse items-center px-8 py-6">
                        <button
                            className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 w-32 ml-2">Отправить
                        </button>
                    </div>
            </div>

            </div>

       </Fragment>);
}
