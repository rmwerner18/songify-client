export const handleNewNotification = (notification) => (dispatch) => {
  dispatch(addNotification(notification));
  setTimeout(() => dispatch(removeFirstNotification()), 2000);
};

export const addNotification = (notification) => {
  return {
    type: 'ADD_NOTIFICATION',
    notification,
  };
};

export const removeFirstNotification = () => {
  return {
    type: 'REMOVE_FIRST_NOTIFICATION',
  };
};
