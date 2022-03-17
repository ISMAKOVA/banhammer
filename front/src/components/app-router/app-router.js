import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {routes} from "../../routes";
import {MAIN_PAGE_ROUTE} from "../../utils/routeName";


const AppRouter = () => {
    return (
        <Routes>
            {
                routes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact />
                )
            }
            <Route
                path="*"
                element={<Navigate to={MAIN_PAGE_ROUTE} />}
            />
        </Routes>
    );
};

export default AppRouter;
