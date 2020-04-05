import React, {useEffect, useState} from 'react';
import Filter from "./Components/Filter/Filter";
import CheapOrFast from "./Components/CheapOrFast/CheapOrFast";
import FlightCard from "./Components/FlightCard/FlightCard";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllFlightsData,
    getUrlCode, resetSortWith, resetSortWithout,
    sortCheapest,
    sortFastest,
    sortGetAll,
    sortWithOne,
    sortWithout, sortWithThree, sortWithTwo
} from "./store/flightsAcions";
import {filters} from "./constants";
import Spinner from "./Components/Spinner/Spinner";

const initializeFilter = () => {
    const state = {};
    Object.keys(filters).forEach(criteria => state[criteria] = false);
    return state;
};

const App = () => {
    const [filter, setFilter] = useState(initializeFilter());

    const sortedState = useSelector(state => state.sortedState);
    const code = useSelector(state => state.code);
    const filterClasses = useSelector(state => state.filterClasses);
    const loading = useSelector(state => state.loading);

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
        if (filter.all) {
            dispatch(sortGetAll());
        } else {

        }
        if (filter.without) {
            dispatch(sortWithout());
        } else {
            dispatch(resetSortWithout());
        }
        if (filter.one) {
            dispatch(sortWithOne(1));
        } else {
            dispatch(resetSortWith(1));
        }
        if (filter.two) {
            dispatch(sortWithTwo(2));
        } else {
            dispatch(resetSortWith(2));
        }
        if (filter.three) {
            dispatch(sortWithThree(3));
        } else {
            dispatch(resetSortWith(3));
        }
    }, [dispatch, filter]);

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
