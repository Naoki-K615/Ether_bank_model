import * as ActionTypes from '../actions/constants'

// Load initial state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('loginState');
        if (serializedState === null) {
            return {
                authenticated: false,
                userId: null
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            authenticated: false,
            userId: null
        };
    }
};

// Save state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify({
            authenticated: state.authenticated,
            userId: state.userId
        });
        localStorage.setItem('loginState', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

const login = (state = loadState(), action) => {
    let newState;
    switch (action.type) {
        case ActionTypes.REQUEST_LOGIN:
            return state;
        case ActionTypes.REQUEST_LOGIN_SUCCESS:
            newState = Object.assign({}, state, {
                authenticated: true,
                userId: action.userId,
                usernameValidationMessage: null,
                passwordValidationMessage: null
            });
            saveState(newState);
            return newState;
        case ActionTypes.REQUEST_LOGOUT_SUCCESS:
            newState = Object.assign({}, state, {
                authenticated: false,
                userId: null,
                usernameValidationMessage: null,
                passwordValidationMessage: null
            });
            localStorage.removeItem('loginState');
            return newState;
        case ActionTypes.REQUEST_LOGIN_FAILURE:
            newState = Object.assign({}, state, {
                authenticated: false,
                userId: null,
                usernameValidationMessage: action.validationResult.usernameValidationMessage,
                passwordValidationMessage: action.validationResult.passwordValidationMessage
            });
            localStorage.removeItem('loginState');
            return newState;
        default:
            return state
    }
}

export default login