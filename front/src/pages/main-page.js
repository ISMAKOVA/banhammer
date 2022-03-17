import React from "react";
import 'react-tailwind-table/dist/index.css';
import GridTableComponent from "../components/table";
import {getAllMemes} from "../http/memes_api";

class MainPage extends React.Component{
    state = {
        table: [],
        columns: []
    }
    constructor(props) {
        super(props);

        this.state = {
            table: rows(),
            columns: column()
        }
    }

    // componentDidMount() {
    //    void this.load();
    // }
    //
    // async load(){
    //     let memes = await getAllMemes();
    //     // let values = Object.keys(memes).map(function(key){
    //     //     return memes[key];
    //     // });
    //     this.setState({table: memes});
    //     console.log(memes)
    // }

    render() {
        return(
            <div>
                <GridTableComponent
                    columns={this.state.columns}
                    dataSource={this.state.table}>
                </GridTableComponent>
            </div>
        )
    }
}

function column() {
    return [
        {
            field: "id",
            title: "#"
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
        // {
        //     field: "mark",
        //     title: "Отметка",
        // }
    ]
}

function rows(){
    return [
        {
            id: 0,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt:"adsfsdf"
        },
        {
            id: 1,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt:"adsfsdf"
        },
        {
            id: 2,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt:"adsfsdf"
        },
        {
            id: 3,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt:"adsfsdf"
        },
        {
            id: 4,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt:"adsfsdf"
        },
        {
            id: 5,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt:"adsfsdf"
        },
        {
            id: 6,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt:"adsfsdf"
        },
        {
            id: 7,
            img: "Sadio Mane1",
            text: "www.ff.com",
            vk_route: "asdfasdfaadsfa",
            createdAt: "adsf",
            updatedAt:"adsfsdf"
        },

    ]
}
export default MainPage;
