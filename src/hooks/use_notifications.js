import { notifications } from '@mantine/notifications';

const NOTIFICATION_STYLES = {
  success: (theme) => ({
    root: {
      backgroundColor: theme.colors['spotify-green'][5],
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