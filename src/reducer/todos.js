const initialState = {
    todos: [
        { id:1, action: "test1", dateAdded : new Date()}
    ]
};

const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: action.data
            }
        default:
            return state
    }
}
export default todos
