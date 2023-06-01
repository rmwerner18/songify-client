import { notifications } from '@mantine/notifications';

const NOTIFICATION_STYLES = {
  success: (theme) => ({
    root: {
      backgroundColor: '#DAF7A6',
    },
  }),
  failure: (theme) => ({
    root: {
      backgroundColor: '#FF5733 ',
    },
  }),
};

export const useNotifications = () => {
  const show = ({ message, title, type }) =>
    notifications.show({
      message,
      title,
      styles: NOTIFICATION_STYLES[type],
    });

  return { show };
};
