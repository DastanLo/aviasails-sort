import React, {useEffect, useRef, useState} from 'react';
import Filter from "./Components/Filter/Filter";
import CheapOrFast from "./Components/CheapOrFast/CheapOrFast";
import FlightCard from "./Components/FlightCard/FlightCard";
import {useDispatch, useSelector} from "react-redux";
import {getAllFlightsData, getUrlCode, resetSortWith, sortCheapest, sortFastest, sortWith} from "./store/flightsAcions";
import {filters} from "./constants";
import Spinner from "./Components/Spinner/Spinner";

const initializeFilter = () => {
    const state = {};
    Object.keys(filters).forEach(criteria => state[criteria] = false);
    return state;
};

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const waitingForChanges = (filter, prevFilter, dispatch, setFilter) => {
    Object.keys(filters).forEach(i => {
        if (filter[i] && filter[i] !== prevFilter[i]) {
            dispatch(sortWith(i));
        } else if (!filter[i] && filter[i] !== prevFilter[i]) {
            if (i === 'all') {
                setFilter(initializeFilter());
                return dispatch(resetSortWith(i));
            }
            dispatch(resetSortWith(i));
        }
    })
};

const App = () => {
    const [filter, setFilter] = useState(initializeFilter());

    const sortedState = useSelector(state => state.sortedState);
    const code = useSelector(state => state.code);
    const filterClasses = useSelector(state => state.filterClasses);
    const loading = useSelector(state => state.loading);

    const previousFilter = usePrevious(filter);
    const dispatch = useDispatch();
    const getCheapest = () => {
        dispatch(sortCheapest());
    };

    const getFastest = () => {
        dispatch(sortFastest());
    };

    const inputChangeHandler = (e) => {
        setFilter({...filter, [e.target.name]: e.target.checked});
    };

    useEffect(() => {
        if (previousFilter) {
            waitingForChanges(filter, previousFilter, dispatch,setFilter);
        }
    }, [dispatch, filter, previousFilter]);

    useEffect(() => {
        dispatch(getUrlCode());
    }, [dispatch]);

    useEffect(() => {
        if (code) {
            dispatch(getAllFlightsData(code));
        }
    }, [code, dispatch]);

    if (loading) {
        return <Spinner/>
    }

    return (
        <div className="container main-page">
            <Filter filter={filter} inputChange={inputChangeHandler}/>
            <CheapOrFast cheapClasses={filterClasses.cheapest} fastClasses={filterClasses.fastest}
                         getCheap={getCheapest}
                         getFast={getFastest}/>
            {sortedState.map((f, index) => {
                return <FlightCard key={index} price={f.price} flights={f.segments}/>
            })}
        </div>
    );
};

export default App;
