export const soundsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SOUNDS':
      return { ...action.sounds, ...{ loaded: true } };
    default:
      return state;
  }
};
