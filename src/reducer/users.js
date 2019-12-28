const initialState = {
    alluser: [
        { id:1, name: "test1", email : "test@mail.com"}
    ]
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                alluser: action.data
            }

        default:
            return state
    }
}
export default users
