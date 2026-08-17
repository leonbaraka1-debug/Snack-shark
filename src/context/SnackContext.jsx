import { createContext, useEffect } from "react";
import useSnacks from "../hooks/useSnacks";

const SnackContext = createContext();

export function SnackProvider({ children }) {
  const {
    snacks,
    loading,
    error,
    fetchSnacks,
    addSnack,
    updateSnack,
    deleteSnack,
  } = useSnacks();

  useEffect(() => {
    fetchSnacks();
  }, [fetchSnacks]);

  const value = {
    snacks,
    loading,
    error,
    fetchSnacks,
    addSnack,
    updateSnack,
    deleteSnack,
  };

  return (
    <SnackContext.Provider value={value}>
      {children}
    </SnackContext.Provider>
  );
}

export default SnackContext;