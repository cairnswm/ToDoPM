import React, { useState, createContext, useEffect, useMemo, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useTenant } from "../hooks/useTenant";
import { REACT_APP_SETTINGS_API } from "../../env";
import { combineUrlAndPath } from "../utils/combineUrlAndPath";
import { accessElf } from "../utils/accessElf";

export const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState([]);
  const { tenant } = useTenant();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetch(combineUrlAndPath(REACT_APP_SETTINGS_API,`mysettings/${user.id}`),
        {
          method: "GET",
          headers: { "Content-Type": "application/json", APP_ID: tenant },
        })
        .then((res) => res.json())
        .then((res) => {
          setSettings(res);
        })
        .catch((err) => {
          console.error('Error fetching settings:', err);
          setSettings([]);
        });
    }
  }, [user, tenant]);

  const values = useMemo(
    () => ({
      settings,
    }),
    [settings]
  );

  if (!REACT_APP_SETTINGS_API) {
    return (
      <div>
        <h1>Missing Configuration</h1>
        <p>
          Set the REACT_APP_SETTINGS_API environment variable to the URL of the
          Settings API
        </p>
      </div>
    );
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
