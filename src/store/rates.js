import { getExchangeRates } from "../api"

// export const supportedCurrencies = ["USD", "EUR", "JPY", "CAD", "GBP", "MXN"];


const initialState = {
    amount: "1.00",
    currencyCode: "USD",
    currencyData: { USD: 1.0 },
    supportedCurrencies: ["USD", "EUR", "JPY", "CAD", "GBP", "MXN"]
}

export function ratesReducer(state = initialState, action) {
    switch (action.type) {
        case AMOUNT_CHANGED:
            return { ...state, amount: action.payload }
        case CURRENCY_CODE_CHANGED:
            return { ...state, currencyCode: action.payload }

        case "rates/ratesReceived": {
            const codes = Object.keys(action.payload);
            return { ...state, currencyData: action.payload,supportedCurrencies:codes }
        }

        default:
            return state
    }
}


//selectors
export const getAmount = state => state.rates.amount
export const getCurrencyCode = state => state.rates.currencyCode
export const getCurrencyData = state => state.rates.currencyData
//action types
export const AMOUNT_CHANGED = "rates/amountChanged"
export const CURRENCY_CODE_CHANGED = "rates/currencyCodeChanged"

//action creators
export const changeAmount = (amount) => ({
    type: AMOUNT_CHANGED,
    payload: amount,
});
// export const changeCurrencyCode = (currencyCode) => ({
//     type:CURRENCY_CODE_CHANGED,
//     payload:currencyCode,
// });
// export const changeCurrencyCode = (currencyCode) => (dispatch)({
//     dispatch({
//         type: CURRENCY_CODE_CHANGED,
//         payload: currencyCode,
//     });
// })



export function changeCurrencyCode(currencyCode) {
    return function changeCurrencyCodeThunk(dispatch, getState) {
        const state = getState();

        const supportedCurrencies = state.rates.supportedCurrencies
        getExchangeRates(currencyCode, supportedCurrencies).then(rates => {
            dispatch({
                type: "rates/ratesReceived",
                payload: rates
            });
        })
        dispatch({
            type: CURRENCY_CODE_CHANGED,
            payload: currencyCode,
        });

    }
};

//thunks 

export function getInitialRates(dispatch, getState) {
    const state = getState();
    const currencyCode = getCurrencyCode(state);
    dispatch(changeCurrencyCode(currencyCode))
}