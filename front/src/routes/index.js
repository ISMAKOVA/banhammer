import {ADD_PIC_ROUTE, MAIN_PAGE_ROUTE, MARK_UP_ROUTE,SHOW_MEME, COMPLAIN} from "../utils/routeName";
import MainPage from "../pages/main-page";
import AddPicPage from "../pages/add-pic-page";
import MarkupPage from "../pages/markup-page";
import ShowMemePage from "../pages/show-meme-page";
import ComplainPage from "../pages/complain-page";

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
        Component: MarkupPage
    },
    {
        path: SHOW_MEME,
        Component: ShowMemePage
    },
    {
        path: COMPLAIN,
        Component: ComplainPage
    }
]
