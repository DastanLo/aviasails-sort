import axios from "axios";
import {API_URL, API_URL_CODE} from "../constants";

export const GET_FLIGHTS_START = 'GET_FLIGHTS_START';
export const GET_FLIGHTS_SUCCESS = 'GET_FLIGHTS_SUCCESS';
export const GET_FLIGHTS_ERROR = 'GET_FLIGHTS_ERROR';

export const GET_URL_CODE_START = 'GET_URL_CODE_START';
export const GET_URL_CODE_SUCCESS = 'GET_URL_CODE_SUCCESS';
export const GET_URL_CODE_ERROR = 'GET_URL_CODE_ERROR';

export const SORT_BY_SPEED = 'SORT_BY_SPEED';
export const SORT_BY_PRICE = 'SORT_BY_PRICE';

export const SORT_WITH = 'SORT_WITH';
export const RESET_SORT_WITH = 'RESET_SORT';
export const RESET_ALL = 'RESET_ALL';

const requestStart = () => ({type: GET_FLIGHTS_START});
const getFlightsData = flights => ({type: GET_FLIGHTS_SUCCESS, flights});
const getFlightsError = error => ({type: GET_FLIGHTS_ERROR, error});

const getUrlCodeSuccess = code => ({type: GET_URL_CODE_SUCCESS, code});
const getUrlCodeError = error => ({type: GET_URL_CODE_ERROR, error});
const getUrlCodeStart = () => ({type: GET_URL_CODE_START});

export const sortFastest = () => ({type: SORT_BY_SPEED});
export const sortCheapest = () => ({type: SORT_BY_PRICE});

export const sortWith = (criteria) => ({type: SORT_WITH, criteria});

export const resetSortWith = (criteria) => ({type: RESET_SORT_WITH, criteria});


export const getUrlCode = () => async dispatch => {
    try {
        dispatch(getUrlCodeStart());
        const response = await axios.get(API_URL_CODE);
        dispatch(getUrlCodeSuccess(response.data.searchId));
    } catch (e) {
        dispatch(getUrlCodeError(e));
        console.log(e);
    }
};

const request = async (code) => {
    try {
        const response = await axios.get(API_URL + code);
        return response.data;
    } catch (e) {

    }
};

export const getAllFlightsData = (code) => async dispatch => {
    try {
        dispatch(requestStart());
        const newArr = [];
        const response = await request(code);
        if (!response) {
            return dispatch(getAllFlightsData(code));
        }
        if (response.stop) {
            newArr.push(response.tickets);
            return dispatch(getFlightsData(newArr.flat()));
        }
        newArr.push(response.tickets);
        dispatch(getAllFlightsData(code));
    } catch (e) {
        dispatch(getFlightsError(e));
    }
};
