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
           // table: rows(),
            columns: column()
        }
    }

    componentDidMount() {
       void this.load();
    }

    async load(){
        let memes = await getAllMemes();
        // let values = Object.keys(memes).map(function(key){
        //     return memes[key];
        // });
        this.setState({table: memes});
        console.log(memes)
    }

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
            ID: 0,
            text: "Sadio Mane1",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 1,
            text: "Sadio Mane2",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 2,
            text: "Sadio Mane3",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 3,
            text: "Sadio Mane4",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 4,
            text: "Sadio Mane5",
            link: "www.ff.com",
            mark: 1
        },
        {
            ID: 5,
            text: "Sadio Mane5",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 6,
            text: "Sadio Mane6",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 7,
            text: "Sadio Mane7",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 8,
            text: "Sadio Mane8",
            link: "www.ff.com",
            mark: 1
        },{
            ID: 9,
            text: "Sadio Mane9",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 10,
            text: "Sadio Mane10",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 11,
            text: "Sadio Mane11",
            link: "www.ff.com",
            mark: 0
        },
        {
            ID: 12,
            text: "Sadio Mane12",
            link: "www.ff.com",
            mark: 1
        },

    ]
}
export default MainPage;
