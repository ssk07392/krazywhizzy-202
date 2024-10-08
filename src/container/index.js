import React, { Suspense } from 'react';
import axios from 'axios';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import store from '../store';
import Routes from './routes';
import ScrollToTop from '../components/common/scroll';
import Loader from '../components/common/loader';
import { setupAxios } from '../utils';
import { ErrorBoundary } from "../components/Error";

const { PUBLIC_URL } = process.env;

setupAxios(axios, store);

const AppContainer = () => (
    <ErrorBoundary>
    <Provider store={store}>
        <Suspense fallback={<Loader isSuspense />}>
            <Loader>
                <BrowserRouter basename={PUBLIC_URL}>
                    <ScrollToTop>
                        <Routes />
                    </ScrollToTop>
                </BrowserRouter>
            </Loader>
        </Suspense>
    </Provider>
    </ErrorBoundary>
)

export default AppContainer;