import React from "react";
import 'react-tailwind-table/dist/index.css';
import GridTableComponent from "../components/table";
import {getAllMemes} from "../http/memes_api";
import {getSummarizedForMeme} from "../http/memes_marks_api";

class MainPage extends React.Component {
    state = {
        table: [],
        columns: []
    }

    constructor(props) {
        super(props);

        this.state = {
            // table: rows(),
            columns: column()
        }
    }

    componentWillMount() {
        void this.load();
    }

    async load() {
        let memes = await getAllMemes();

        const marks = await this.getMarks(memes);
        this.setState({table: marks});
    }

    getMarks = async (memes) => {
        return Promise.all(memes.map(data => getSummarizedForMeme(data.id)))
    }

    render() {
        return (
            <div>
                {this.state.table ?
                    <GridTableComponent
                        columns={this.state?.columns}
                        dataSource={this.state?.table}>
                    </GridTableComponent> :
                    <div className="px-8 pt-4">
                        <div className=" flex justify-center items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700"></div>
                        </div>
                    </div>}

            </div>
        )
    }
}

function column() {
    return [
        {
            field: "id",
            title: "#",
            width: "60px"
        },
        {
            field: "text",
            title: "Текст",
        },
        {
            field: "img",
            title: "Ссылка",
        },
        {
            field: "vk_route",
            title: "ВК маршрут",
        },
        {
            field: "mark_result",
            title: "Отметка",
            width: "100px"
        }
    ]
}

function rows() {
    return [
        {
            id: 0,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt: "adsfsdf"
        },
        {
            id: 1,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt: "adsfsdf"
        },
        {
            id: 2,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt: "adsfsdf"
        },
        {
            id: 3,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt: "adsfsdf"
        },
        {
            id: 4,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt: "adsfsdf"
        },
        {
            id: 5,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt: "adsfsdf"
        },
        {
            id: 6,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt: "adsfsdf"
        },
        {
            id: 7,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt: "adsfsdf"
        },

    ]
}

export default MainPage;
