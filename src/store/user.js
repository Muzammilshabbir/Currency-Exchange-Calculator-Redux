const initialState ={
    name: "jamun fergusan",
    loggedIn: false,
};

export function userReducer(state=initialState,action){
    return state;
}

export const getFullName = state => state.user.name