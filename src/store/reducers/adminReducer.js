import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('nhanlunars fetch gender start: ', action)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copytState = { ...state };
            copytState.genders = action.data;
            console.log('nhanlunars fetch gender success: ', copytState)
            return {
                ...copytState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('nhanlunars fetch gender failed: ', action)
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;