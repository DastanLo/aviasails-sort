import React, {useEffect, useRef, useState} from 'react';
import Filter from "./Components/Filter/Filter";
import CheapOrFast from "./Components/CheapOrFast/CheapOrFast";
import FlightCard from "./Components/FlightCard/FlightCard";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllFlightsData,
    getUrlCode, resetAll, resetSortWith, resetSortWithout,
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

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

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
        if (!filter.all){
                setFilter(initializeFilter());
                dispatch(resetAll());
        }
    },[dispatch, filter.all]);

    useEffect(() => {
        if (previousFilter){
            if (filter.all && filter.all !== previousFilter.all) {
                dispatch(sortGetAll());
            }
            if (filter.without && filter.without !== previousFilter.without) {
                dispatch(sortWithout());
            } else if (!filter.without && filter.without !== previousFilter.without) {
                dispatch(resetSortWithout());
            }
            if (filter.one && filter.one !== previousFilter.one) {
                dispatch(sortWithOne(1));
            } else if (!filter.one && filter.one !== previousFilter.one) {
                dispatch(resetSortWith(1));
            }
            if (filter.two && filter.two !== previousFilter.two) {
                dispatch(sortWithTwo(2));
            } else if (!filter.two && filter.two !== previousFilter.two) {
                dispatch(resetSortWith(2));
            }
            if (filter.three && filter.three !== previousFilter.three) {
                dispatch(sortWithThree(3));
            } else if (!filter.three && filter.three !== previousFilter.three) {
                dispatch(resetSortWith(3));
            }
        }

    }, [dispatch, filter,previousFilter]);

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
