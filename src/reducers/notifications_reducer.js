export const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': 
      return [...state, action.notification];
    case 'REMOVE_FIRST_NOTIFICATION':
      state.shift()
      return [...state]
    default:
      return state;
  }
}