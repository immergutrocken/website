import { useContext, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { Locale } from "../../lib/enums/locals.enum";

interface LocalizationProviderProps {
  children: JSX.Element;
}

interface LocalizationContext {
  getLocale: () => string;
  onToggleLocale: () => void;
}

const LOCAL_STORAGE_KEY = "localization";

const LocalizationContext = createContext(null);

export const LocalizationProvider = ({
  children,
}: LocalizationProviderProps): JSX.Element => {
  const localization = useProviderLocalization();

  return (
    <LocalizationContext.Provider value={localization}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContext =>
  useContext(LocalizationContext);

const useProviderLocalization = (): LocalizationContext => {
  const [locale, setLocale] = useState<Locale>(null);

  useEffect(() => {
    if (!locale) {
      console.log("set locale");
      if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_KEY, Locale.DE);
        setLocale(Locale.DE);
      } else {
        setLocale(localStorage.getItem(LOCAL_STORAGE_KEY) as Locale);
      }
    }
  }, [locale]);

  const getLocale = (): string =>
    locale === Locale.DE ? Locale.EN : Locale.DE;

  const onToggleLocale = (): void => {
    const newLocale = locale === Locale.DE ? Locale.EN : Locale.DE;
    localStorage?.setItem(LOCAL_STORAGE_KEY, newLocale);
    setLocale(newLocale);
  };

  return {
    getLocale,
    onToggleLocale,
  };
};
