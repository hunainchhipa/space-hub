import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

const HotkeyContext = createContext();

export const useHotkey = () => useContext(HotkeyContext);

export const OS = (window) => {
  console.log("getOperatingSystem(window)", getOperatingSystem(window));
};

const HotkeyProvider = ({ children }) => {
  const [hotkeys, setHotkeys] = useState({});
  const [showHotkeys, setShowHotkeys] = useState(false);

  const registerHotkey = useCallback((key, callback) => {
    setHotkeys((prevHotkeys) => ({
      ...prevHotkeys,
      [key]: callback,
    }));
  }, []);

  const unregisterHotkey = useCallback((key) => {
    setHotkeys((prevHotkeys) => {
      const newHotkeys = { ...prevHotkeys };
      delete newHotkeys[key];
      return newHotkeys;
    });
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.altKey && hotkeys[event.key]) {
        event.preventDefault();
        hotkeys[event.key]();
      }
    },
    [hotkeys]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const handleAltPress = (event) => {
      setShowHotkeys(event.altKey);
    };

    window.addEventListener("keydown", handleAltPress);
    window.addEventListener("keyup", handleAltPress);

    return () => {
      window.removeEventListener("keydown", handleAltPress);
      window.removeEventListener("keyup", handleAltPress);
    };
  }, []);

  return (
    <HotkeyContext.Provider
      value={{ registerHotkey, unregisterHotkey, showHotkeys }}
    >
      {children}
    </HotkeyContext.Provider>
  );
};

export default HotkeyProvider;
