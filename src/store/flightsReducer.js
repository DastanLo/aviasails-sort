import {
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_START,
    GET_FLIGHTS_SUCCESS,
    GET_URL_CODE_ERROR,
    GET_URL_CODE_START,
    GET_URL_CODE_SUCCESS, RESET_SORT_WITH, RESET_SORT_WITHOUT,
    SORT_ALL,
    SORT_BY_PRICE,
    SORT_BY_SPEED,
    SORT_WITH_ONE,
    SORT_WITH_THREE,
    SORT_WITH_TWO,
    SORT_WITHOUT
} from "./flightsAcions";

const initialState = {
    filterClasses: {
        cheapest: ['choice', 'active'],
        fastest: ['choice'],
    },
    loading: false,
    error: false,
    code: '',
    sortedState: [],
    flights: [],
};

const handlers = {
    [GET_FLIGHTS_START]: (state) => ({...state, loading: true}),
    [GET_FLIGHTS_SUCCESS]: (state, {flights}) => ({...state, flights, loading: false}),
    [GET_FLIGHTS_ERROR]: (state, {error}) => ({...state, error, loading: false}),
    [GET_URL_CODE_START]: (state) => ({...state, loading: true}),
    [GET_URL_CODE_SUCCESS]: (state, {code}) => ({...state, code: code, loading: false}),
    [GET_URL_CODE_ERROR]: (state, {error}) => ({...state, error}),
    [SORT_BY_PRICE]: sortByPrice,
    [SORT_BY_SPEED]: sortBySpeed,
    [SORT_ALL]: sortAll,
    [SORT_WITHOUT]: sortWithout,
    [SORT_WITH_ONE]: sortWith,
    [SORT_WITH_TWO]: sortWith,
    [SORT_WITH_THREE]: sortWith,
    [RESET_SORT_WITH] : resetSortWith,
    [RESET_SORT_WITHOUT] : resetSortWithout,
    DEFAULT: (state) => state,
};

const flightsReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};

//===========FUNCTIONS===========

function getCheapest(a, b) {
    return {...a}.price - {...b}.price;
}

function getFastest(a, b) {
    return {...a}.sum - {...b}.sum;
}

function sortAll(state) {
    if (state.filterClasses.cheapest.includes('active')) {
        return {...state, sortedState: state.flights.sort(getCheapest).slice(0,20)}
    }
    return {...state, sortedState: countingSpeedOfFlights(state.flights).sort(getFastest)}
}

function sortBySpeed(state) {
    return {
        ...state,
        sortedState: countingSpeedOfFlights(state.sortedState).sort(getFastest),
        filterClasses: filterClassesChange(state, 'fastest', 'cheapest')
    };
}

function countingSpeedOfFlights(arrOfFlights) {
    return arrOfFlights.map(i => {
        const sum = i.segments[0].duration + i.segments[1].duration;
        return {...i, sum};
    });
}

function sortByPrice(state) {
    return {
        ...state,
        sortedState: [...state.sortedState].sort(getCheapest),
        filterClasses: filterClassesChange(state, 'cheapest', 'fastest')
    }
}

function filterClassesChange(state, sortingKey, unSortingKey) {
    return {
        [sortingKey]: [...state.filterClasses[sortingKey], 'active'],
        [unSortingKey]: [...state.filterClasses[unSortingKey]].filter(i => i !== 'active'),
    };
}

function sortWithout(state) {
    const sortedWithout = state.flights.filter(i => !i.segments.reduce((acc, val) => acc + val.stops.length, 0));
    const newSortedState = state.sortedState.concat(sortedWithout.slice(0, 5));
    if (state.filterClasses.cheapest.includes('active')) {
        return {...state, sortedState: newSortedState.sort(getCheapest)};
    }
    return {...state, sortedState: countingSpeedOfFlights(newSortedState).sort(getFastest)};
}

function sortWith(state, amount) {
    const sortedWithout = state.flights.filter(i => i.segments.reduce((acc, val) => acc + val.stops.length, 0) === amount.amount);
    const newSortedState = state.sortedState.concat(sortedWithout.slice(0, 5));
    if (state.filterClasses.cheapest.includes('active')) {
        return {...state, sortedState: newSortedState.sort(getCheapest)};
    }
    return {...state, sortedState: countingSpeedOfFlights(newSortedState).sort(getFastest)};
}

function resetSortWith(state,amount) {
    if (state.sortedState.length > 0){
        const sortedWithout = state.sortedState.filter(i => i.segments.reduce((acc, val) => acc + val.stops.length, 0) !== amount.amount);
        if (state.filterClasses.cheapest.includes('active')){
            return {...state, sortedState: sortedWithout.sort(getCheapest)};
        }
        return {...state, sortedState: countingSpeedOfFlights(sortedWithout).sort(getFastest)};
    }
   return state;
}

function resetSortWithout(state) {
    if (state.sortedState.length > 0){
        const sortedWithout = state.sortedState.filter(i => i.segments.reduce((acc, val) => acc + val.stops.length, 0) > 0);
        if (state.filterClasses.cheapest.includes('active')) {
            return {...state, sortedState: sortedWithout.sort(getCheapest)};
        }
        return {...state, sortedState: countingSpeedOfFlights(sortedWithout).sort(getFastest)};
    }
    return state;
}

export default flightsReducer;
