import './App.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { StateModel } from './store/model/state.model';
import { StateAction } from './store/reducer';
import { store } from './store/store';

export default function App() {

    const state = useSelector((state: StateModel) => state)
    const { i18n } = useTranslation()

    useEffect(() => {
        function handleResize() {
            store.dispatch({
                type: StateAction.SET_IS_MOBILE,
                data: window.innerWidth < 680
            })
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener("resize", handleResize)
    })

    useEffect(() => {
        i18n.changeLanguage(state.lang)
    }, [state.lang])

    return <><Outlet /></>
}