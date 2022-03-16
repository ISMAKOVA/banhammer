import React from "react";
import 'react-tailwind-table/dist/index.css';
import GridTableComponent from "../components/table";

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
            field: "ID",
            title: "#"
        },
        {
            field: "text",
            title: "Текст",
        },
        {
            field: "link",
            title: "Ссылка",
        },
        {
            field: "mark",
            title: "Отметка",
        }
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
        },{
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

    ]
}
export default MainPage;
