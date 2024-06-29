import React, { useEffect } from "react";
import { useHotkey } from "../contexts/HotkeyContext";

const withHotkey = (Component, hotkey) => {
  return (props) => {
    const { registerHotkey, unregisterHotkey, showHotkeys } = useHotkey();

    useEffect(() => {
      if (hotkey) {
        registerHotkey(hotkey, props.onClick);
      }
      return () => {
        if (hotkey) {
          unregisterHotkey(hotkey);
        }
      };
    }, [hotkey, props.onClick, registerHotkey, unregisterHotkey]);

    return (
      <div style={{ position: "relative" }}>
        <Component {...props} />
        {showHotkeys && hotkey && (
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              background: "yellow",
              padding: "2px 4px",
              fontSize: "12px",
              zIndex: 1,
            }}
          >
            {hotkey.toUpperCase()}
          </span>
        )}
      </div>
    );
  };
};

export default withHotkey;
