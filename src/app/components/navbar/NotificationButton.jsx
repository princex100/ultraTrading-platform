import { Bell } from "lucide-react";

const NotificationButton = () => {
    return (
        <button className="relative flex flex-col items-center justify-center h-full px-2 text-gray-500 hover:text-gray-700">
            
            <Bell size={20} />
            
            <span className="text-xs mt-1">
                Notifications
            </span>
            
            {/* Notification Badge Placeholder */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            
        </button>
    );
};

export default NotificationButton;
