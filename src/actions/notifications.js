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
}