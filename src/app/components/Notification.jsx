import { Toaster } from 'react-hot-toast';

const Notification = () => {
  return (
    <Toaster 
      position="bottom-center"
      toastOptions={{
        duration: 3000,
        className: 'text-sm font-semibold text-gray-900',
        style: {
          border: '1px solid #e0dfdc',
          padding: '16px',
          color: '#000000e6',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        },
      }}
    />
  );
};

export default Notification;
