import { useContext } from "react";
import SnackContext from "./SnackContext";

function useSnackContext() {
    return useContext(SnackContext);
}

export default useSnackContext;