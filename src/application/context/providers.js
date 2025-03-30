import React from "react";
import { BrowserRouter } from "react-router-dom";
import { TenantProvider } from "../../auth/context/TenantContext";
import { AuthenticationProvider } from "../../auth/context/AuthContext";
import { SettingsProvider } from "../../auth/context/SettingsContext";
import { SubscriptionsProvider } from "../../auth/context/SubscriptionsContext";
import { SummaryProvider } from "./SummaryContext";
import App from "../../App";

const Providers = () => {
  return (
    <React.StrictMode>
      <TenantProvider
        applicationId="4c28e42f-0d6d-11f0-9533-1a220d8ac2c9"
        config={{}}
        onError={(message, error) => console.error(message, error)}
      >
        <AuthenticationProvider
          googleClientId="YOUR_GOOGLE_CLIENT_ID"
          onError={(message, error) => console.error(message, error)}
        >
          <SettingsProvider>
            <SubscriptionsProvider onError={(message, error) => console.error(message, error)}>
              <SummaryProvider onError={(message, error) => console.error(message, error)}>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                  <App />
                </BrowserRouter>
              </SummaryProvider>
            </SubscriptionsProvider>
          </SettingsProvider>
        </AuthenticationProvider>
      </TenantProvider>
    </React.StrictMode>
  );
};

export default Providers;
