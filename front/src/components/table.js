import * as React from "react";
import * as PropTypes from "prop-types";
import {Grid, GridColumn} from "@progress/kendo-react-grid";
import {Menu, MenuItem} from "@progress/kendo-react-layout";
import { Popup } from "@progress/kendo-react-popup";
import ComplainPage from "../pages/complain-page";
class GridTableComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        skip: 0,
        take: 5,
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
        columns: []
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
            (p) => p.id === this.dataItem.id
        );
        this.offset = { left: e.clientX, top: e.clientY };
        this.setState({
            open: true,
            selected: this.dataItem
        });
    };

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

    onPopupOpen = () => {
        this.menuWrapperRef.querySelector("[tabindex]").focus();
    };

    onSelectionChange = (e) => {
        this.setState({selected: !e.ctrlKey ? this.state.data[e.endRowIndex] : null})
    }

    render() {
        return (
            <div>
                <Popup
                    offset={this.offset}
                    show={this.state.open}
                    open={this.onPopupOpen}
                    popupClass={"popup-content rounded overflow-hidden ps-2"}
                >
                    <div
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                        tabIndex={-1}
                        ref={(el) => (this.menuWrapperRef = el)}
                    >
                        <Menu
                            vertical={true}
                            className="pl-2"
                            style={{display: "inline-block"}}
                        >
                            <MenuItem key={0} text="Перейти" url={"/showMeme/"+ this.state.selected?.id}/>
                            <MenuItem key={1} text="Разметить" url={"/markup/"+ this.state.selected?.id}/>
                            {this.state.selected?.mark_result>=0.5?
                            <MenuItem key={2} text="Пожаловаться" url={"/complain/"+ this.state.selected?.id}/>:null}
                        </Menu>
                    </div>
                </Popup>
                <Grid
                    rowRender={this.rowRender}
                    className="h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-700/10"
                    skip={this.state.skip}
                    take={this.state.take}
                    total={this.state.data.length}
                    pageable={true}
                    dataItemKey={'id'}
                    selectedField={'SELECTION_KEY'}
                    selectable={{enabled: true, mode: 'single'}}
                    onSelectionChange={this.onSelectionChange}
                    navigatable={true}
                    data={this.state.data.slice(
                        this.state.skip,
                        this.state.take + this.state.skip
                    ).map(item=> ({...item,SELECTION_KEY: this.state.selected?.id===item.id}))}

                    onPageChange={this.pageChange}>
                    {this.props?.columns.map(col => {
                        return (<GridColumn key={col.field + "|" + col.field} title={col.title} field={col.field}
                                            width={col.width ?? 'auto'}/>)
                    })}
                </Grid>

            </div>)
    }
}

export default GridTableComponent;
