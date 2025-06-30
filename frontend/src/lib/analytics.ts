import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-FDWW5J3RXY"); // Replace with your GA4 Measurement ID
};

export const trackPage = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (event: {
  category: string;
  action: string;
  label?: string;
  value?: number;
  [key: string]: any;
}) => {
  ReactGA.event(event);
};

export const setUserId = (uuid: string) => {
  ReactGA.set({ user_id: uuid });
};