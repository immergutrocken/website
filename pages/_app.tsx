import { AppProps } from "next/app";
import { LocalizationProvider } from "../components/shared/localization";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <LocalizationProvider>
      <Component {...pageProps} />
    </LocalizationProvider>
  );
}

export default MyApp;
