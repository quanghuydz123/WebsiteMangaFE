import { useEffect, useState } from "react";
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";
import apiHandler from "../../apis/apiHandler";
import { Notification } from "../../constrants/type";
import { ENDPOINTS } from "../../constrants/webInfo";
import Loader from "../../components/User/Common/Loader";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const result = await apiHandler.execute(
        ENDPOINTS.NOTIFICATION_ENDPOINT,
        `get-notificationByIdUser?idUser=${userId}`,
        null,
        "get"
      );
      result.data.notifications && setNotifications(result.data.notifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      setLoading(true);
      await apiHandler.execute(
        ENDPOINTS.NOTIFICATION_ENDPOINT,
        `update-viewed-byIdUser`,
        { idUser: userId },
        "put"
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DefaultLayoutUser>
      <div className="min-h-screen p-4">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Thông báo</h1>
            {notifications.length ? (
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li
                    key={notification._id}
                    className={`p-4 border rounded-md cursor-pointer ${
                      notification.isRead
                        ? "bg-gray-100 text-gray-500"
                        : "bg-white text-black font-bold"
                    }`}
                    onClick={() =>
                      !notification.isRead && handleMarkAsRead(notification._id)
                    }
                  >
                    {notification.content}
                    {!notification.isRead && (
                      <span className="ml-2 text-blue-500">Mới</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Bạn không có thông báo nào.</p>
            )}
          </>
        )}
      </div>
    </DefaultLayoutUser>
  );
};

export default NotificationPage;
