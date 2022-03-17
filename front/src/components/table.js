import * as React from "react";
import * as PropTypes from "prop-types";
import {Grid, GridColumn} from "@progress/kendo-react-grid";
import {Menu, MenuItem} from "@progress/kendo-react-layout";
import { Popup } from "@progress/kendo-react-popup";
import ComplainPage from "../pages/complain-page";
import {Link} from "react-router-dom";
class GridTableComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        skip: 0,
        take: 10,
        selected: null,
        hasChanges: false,
        editIndex: null,
        dialogOpen: false,
        selectedState: {},
        data: this.props.dataSource,
        open: false
    }

    blurTimeoutRef;
    menuWrapperRef;

    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take,
        });
    };


    static propTypes = {
        /** Видимые столбцы */
        columns: PropTypes.arrayOf(PropTypes.object),
        /** Данные для отображения */
        dataSource: PropTypes.arrayOf(PropTypes.any),
        /** Модель данных, формат - массив объектов {name:string, type:{@link FORM_CONTROL_TYPE}, available:Array} */
        model: PropTypes.any,
        /** Компонет формы редактирования */
        editorForm: PropTypes.any,
    }

    static defaultProps = {
        editorForm: null,
        model: {},
        dataSource: [],
    }

    rowRender = (trElement, dataItem) => {
        const trProps = {
            ...trElement.props,
            onContextMenu: (e) => {
                e.preventDefault();
                this.handleContextMenuOpen(e, dataItem.dataItem);
            },
        };
        return React.cloneElement(
            trElement,
            {...trProps},
            trElement.props.children
        );
    };

    handleContextMenuOpen = (e, dataItem) => {
        this.dataItem = dataItem;
        this.dataItemIndex = this.state.data.findIndex(
            (p) => p.ID === this.dataItem.ID
        );
        this.offset = { left: e.clientX, top: e.clientY };
        this.setState({
            open: true,
        });
    };

    onSelectionChange = (e) => {
        this.setState({selected: !e.ctrlKey ? this.state.data[e.endRowIndex] : null})
    }



    onFocusHandler = () => {
        clearTimeout(this.blurTimeoutRef);
        this.blurTimeoutRef = undefined;
    };

    onBlurTimeout = () => {
        this.setState({
            open: false,
        });

        this.blurTimeoutRef = undefined;
    };

    onBlurHandler = (event) => {
        clearTimeout(this.blurTimeoutRef);
        this.blurTimeoutRef = setTimeout(this.onBlurTimeout);
    };

    // handleOnSelect = (e) => {
    //     switch (e.item.text) {
    //         case "Перейти":
    //
    //             break;
    //         case "Разметить":
    //             break;
    //         case "Пожаловаться":
    //             this.getComplainComponent();
    //             break;
    //         default:
    //     }
    //     this.setState({
    //         open: false,
    //     });
    // };

    getComplainComponent(){
        return <ComplainPage id={0} visible={true}/>;
    }

    onPopupOpen = () => {
        debugger
        this.menuWrapperRef.querySelector("[tabindex]").focus();
    };

    render() {
        return (
            <div>
                <Popup
                    offset={this.offset}
                    show={this.state.open}
                    open={this.onPopupOpen}
                    popupClass={"popup-content"}
                >
                    <div
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                        tabIndex={-1}
                        ref={(el) => (this.menuWrapperRef = el)}
                    >
                        <Menu
                            vertical={true}
                            style={{display: "inline-block"}}
                            // onSelect={this.handleOnSelect}
                        >
                            <MenuItem  key={0} text="Перейти" url={"/showMeme/0"}/>
                            <MenuItem key={1} text="Разметить" url={"/markup/0"}/>
                            <MenuItem key={2} text="Пожаловаться" url={"/complain/0"}/>
                        </Menu>
                    </div>
                </Popup>
                <Grid
                    //data={this.state.data}
                    rowRender={this.rowRender}
                    className="h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-700/10"
                    skip={this.state.skip}
                    take={this.state.take}
                    total={this.state.data.length}
                    pageable={true}
                    dataItemKey={'ID'}
                    selectedField={'SELECTION_KEY'}
                    selectable={{enabled: true, mode: 'single'}}
                    onSelectionChange={this.onSelectionChange}
                    navigatable={true}
                    data={this.state.data.slice(
                        this.state.skip,
                        this.state.take + this.state.skip
                    ).map(item=> ({...item,SELECTION_KEY: this.state.selected?.ID===item.ID}))}

                    onPageChange={this.pageChange}>
                    {this.props.columns.map(col => {
                        return (<GridColumn key={col.field + "|" + col.field} title={col.title} field={col.field}
                                            width={col.width ?? 'auto'}/>)
                    })}
                </Grid>

            </div>)
    }
}

export default GridTableComponent;
