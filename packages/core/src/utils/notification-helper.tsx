import { Button, notification } from 'antd';

const openNotification = (
  type: string = null,
  title: string = null,
  message: string = null,
  duration: number = 3,
) => {
  const notificationConfig = {
    duration,
    message: title.toUpperCase(),
    description: message,
  };
  switch (type) {
    case 'success': {
      notification.success(notificationConfig);
      break;
    }

    case 'error': {
      notification.error(notificationConfig);
      break;
    }
    case 'info': {
      notification.info(notificationConfig);
      break;
    }
    case 'warning': {
      notification.warning(notificationConfig);
      break;
    }
    case 'warn': {
      notification.warn(notificationConfig);
      break;
    }

    default: {
      notification.open(notificationConfig);
      break;
    }
  }
};

export default openNotification;
