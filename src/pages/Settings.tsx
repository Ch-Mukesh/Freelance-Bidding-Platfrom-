import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sun, Moon, Bell, BellOff } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [notificationSound, setNotificationSound] = useState(() => localStorage.getItem('notificationSound') !== 'off');
  const [pushNotifications, setPushNotifications] = useState(() => localStorage.getItem('pushNotifications') === 'on');

  useEffect(() => {
    localStorage.setItem('notificationSound', notificationSound ? 'on' : 'off');
  }, [notificationSound]);

  useEffect(() => {
    localStorage.setItem('pushNotifications', pushNotifications ? 'on' : 'off');
  }, [pushNotifications]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-silver-100 mb-6">Settings</h1>
      <Card className="p-6 mb-6">
        <h2 className="font-semibold text-silver-100 mb-4">Theme</h2>
        <Button
          className="flex items-center space-x-2 px-3 py-2 rounded-md bg-silver-800/30 hover:bg-silver-700/40 text-silver-200 transition-all"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="text-sm">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
        </Button>
      </Card>
      <Card className="p-6 mb-6">
        <h2 className="font-semibold text-silver-100 mb-4">Notifications</h2>
        <div className="flex items-center space-x-4 mb-4">
          <Button
            className="flex items-center space-x-2"
            variant={notificationSound ? 'primary' : 'ghost'}
            onClick={() => setNotificationSound(!notificationSound)}
          >
            {notificationSound ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            <span>Notification Sound {notificationSound ? 'On' : 'Off'}</span>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            className="flex items-center space-x-2"
            variant={pushNotifications ? 'primary' : 'ghost'}
            onClick={() => setPushNotifications(!pushNotifications)}
          >
            <span>Browser Push Notifications {pushNotifications ? 'On' : 'Off'}</span>
          </Button>
        </div>
      </Card>
      {/* Add more settings here */}
    </div>
  );
} 