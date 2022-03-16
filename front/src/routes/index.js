import {ADD_PIC_ROUTE, MAIN_PAGE_ROUTE, MARK_UP_ROUTE} from "../utils/routeName";
import MainPage from "../pages/main-page";
import AddPicPage from "../pages/add-pic-page";
import MarkupShowForm from "../pages/markup-show-form";

export const routes = [
    {
        path: MAIN_PAGE_ROUTE,
        Component: MainPage
    },
    {
        path: ADD_PIC_ROUTE,
        Component: AddPicPage
    },
    {
        path: MARK_UP_ROUTE,
        Component: MarkupShowForm
    }
]
