import { useEffect } from "react";

const useIdleTimer = (onTimeout, timeout = 60000) => {
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onTimeout();
      }, timeout);
    };

    const handleActivity = () => resetTimer();


    const handleVisibilityChange = () => {
        if (document.hidden) onTimeout(); // Log out if tab is hidden
      };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);
};

export default useIdleTimer;
