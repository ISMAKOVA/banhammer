import React from "react";
import * as PropTypes from "prop-types";

class MarkupShowForm extends React.Component {

    static propTypes = {
        /** Mem Id */
        id: PropTypes.number,
        /** Type: show, markup */
        formType: PropTypes.string
    }
    static defaultProps = {
        formType: "show"
    }
    marks = [
        {id: 0, label: "Токсично", enLabel: "toxic"},
        {id: 1, label: "Нетоксично", enLabel: "no_toxic"}
    ]

    render() {
        return (
            <div className="">
                <div className="p-10">
                    <div className="px-6 py-4 font-medium text-xl text-gray-700">Оценить мем {this.props.id}</div>
                    <div
                        className="max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-blue-700/10 bg-white/80 pt-2">
                        <div className="px-8 pt-6">
                            <div
                                className="w-full bg-gradient-to-r from-blue-700 to-pink-700 rounded-3xl text-center text-white"
                                style={{height: "300px", paddingTop: "145px"}}>
                                Картинка
                            </div>
                        </div>
                        <div className="px-8 py-2">
                            <div className="text-sm mb-2 text-gray-400">Текст мема</div>
                            <textarea
                                className="w-5/6 rounded-3xl bg-gray-200 text-sm px-6 py-4 resize-none hover:resize"
                                placeholder="Текст" readOnly="true">
                                </textarea>
                        </div>
                        {this.props.formType !== "show" ?
                            <div>
                                <div className="px-8 py-2">
                                    <div className="text-sm mb-2 text-gray-400">Классифицировать мем с помощью ИИ</div>
                                    <button
                                        className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5">Автоклассификация
                                    </button>
                                </div>
                                <div className="px-8 py-2">
                                    <div className="text-sm mb-2 text-gray-400">Разметить самостоятельно</div>

                                    {this.marks.map(mark =>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-700 checked:border-blue-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="radio" name="radio" id={mark.id}/>
                                            <label className="form-check-label inline-block text-gray-800"
                                                   htmlFor={mark.id}>
                                                {mark.label}
                                            </label>
                                        </div>)}
                                </div>
                            </div> : null}
                        <div className="flex flex-row-reverse items-center px-8 py-6">
                            <button
                                className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 w-32 ml-2">Сохранить
                            </button>

                            {this.props.formType === "show" ?
                                <button
                                    className="rounded-full bg-pink-700 hover:bg-pink-800 text-neutral-50 px-4 py-1.5 w-32">Удалить
                                </button> : null
                            }
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default MarkupShowForm;
