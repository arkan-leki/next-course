const { createContext } = require("react");
import { useEffect, useState } from 'react';

const NotificationContext = createContext(
    {
        notification: null,
        showNotification: (notification) => { },
        clearNotification: () => { }
    }
);

export function NotificationContextProvider({ children }) {
    const [activeNotification, setActiveNotification] = useState(null);

    useEffect(() => {
        if (activeNotification) {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [activeNotification]);

    function setNotificationHandler(notification) {
        setActiveNotification(notification);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const value = {
        notification: activeNotification,
        showNotification: setNotificationHandler,
        clearNotification: hideNotificationHandler
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}


export default NotificationContext;