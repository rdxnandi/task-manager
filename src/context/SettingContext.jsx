import React, { createContext, useContext, useState } from "react";

const SettingContext = createContext();

export const useSettings = () => useContext(SettingContext);

export const SettingProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    notifications: false,
    autoDarkMode: false,
    soundAlerts: true,
    emailReminders: false,
    compactView: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SettingContext.Provider value={{ settings, toggleSetting }}>
      {children}
    </SettingContext.Provider>
  );
};
