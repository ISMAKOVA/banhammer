import React from "react";

class AddPicPage extends React.Component {

    render() {
        return (
            <div className="">
                <div className="p-10">
                    <div className="px-6 py-4 font-medium text-xl text-gray-700">Добавить мем</div>
                    <div className="max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-blue-700/10 bg-white/80 pt-2">

                        <div className="px-8 pt-4">
                            <div className="text-sm mb-2 text-gray-400">URL мема</div>
                            <div className="flex content-center">
                                <input
                                    className="grow rounded-3xl bg-gray-200 text-sm px-6 resize-none hover:resize mr-2"
                                    placeholder="Мем URL">
                                </input>
                                <button
                                    className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 ">Получить картинку
                                </button>
                            </div>

                        <div className="px-8 pt-6">
                            <div className="w-full bg-gradient-to-r from-blue-700 to-indigo-500 rounded-3xl text-center text-white" style={{height: "300px", paddingTop: "145px"}}>
                            Картинка</div>
                        </div>
                        </div>
                        <div className="px-8 pt-2">
                            <div className="text-sm mb-2 text-gray-400">Текст мема</div>
                            <textarea
                                className="w-full rounded-3xl bg-gray-200 text-sm px-6 py-4 resize-none hover:resize"
                                placeholder="Текст">
                                </textarea>
                        </div>
                        <div className="px-8 pt-2">
                            <div className="text-sm mb-2 text-gray-400">VK route</div>
                            <div className="flex content-center">
                                <input
                                    className="grow rounded-3xl bg-gray-200 text-sm px-6 resize-none hover:resize mr-2"
                                    placeholder="Route">
                                </input>
                                <button
                                    className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 w-32 ">Получить
                                </button>
                            </div>
                        </div>
                        <div className="px-8 pt-4">
                            <div className="text-sm mb-2 text-gray-400">Полученные данные из VK</div>
                            <div className="flex content-center">
                                <p className="text-justify text-gray-400">So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.</p>
                            </div>
                        </div>

                        <div className="flex flex-row-reverse items-center px-8 py-6">
                            <button
                                className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 w-32">Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPicPage;
