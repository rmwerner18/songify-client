import React from 'react';
import { useSelector } from 'react-redux';
import { Notification } from '@mantine/core';

const NotificationContainer = () => {
  const notifications = useSelector((state) => state.notifications);

  const showNotifications = () => 
    notifications.map((notification) => (
      <Notification withCloseButton={false}>{notification}</Notification>
    ));

  return (
    <div className='toast-notification-container'>{showNotifications()}</div>
  );
};

export default NotificationContainer;
