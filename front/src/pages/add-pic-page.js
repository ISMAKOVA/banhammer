import React from "react";

class AddPicPage extends React.Component {

    render() {
        return (
            <div className="">
                <div className="p-10">
                    <div className="px-6 py-4 font-medium text-xl text-gray-700">Добавить картинку</div>
                    <div className="max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-blue-700/10 bg-white/80 pt-2">
                        <div className="px-6 pt-2">
                            <div className="text-sm mb-2 text-gray-300">URL картинки</div>
                            <input
                                className="w-5/6 rounded-3xl bg-gray-200 text-sm px-6 py-2 resize-none hover:resize"
                                placeholder="URL">
                                </input>
                        </div>
                        <div className="px-6 pt-2">
                            <div className="text-sm mb-2 text-gray-300">Текст картинки</div>
                            <textarea
                                className="w-5/6 rounded-3xl bg-gray-200 text-sm px-6 py-4 resize-none hover:resize"
                                placeholder="Текст">
                                </textarea>
                        </div>
                        <div className="px-6 pt-2">
                            <div className="text-sm mb-2 text-gray-300">VK route</div>
                            <input
                                className="w-5/6 rounded-3xl bg-gray-200 text-sm px-6 py-2 resize-none hover:resize"
                                placeholder="Route">
                            </input>
                        </div>
                        <div className="flex flex-row-reverse items-center">
                            <button
                                className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 mx-6 my-4">Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPicPage;
