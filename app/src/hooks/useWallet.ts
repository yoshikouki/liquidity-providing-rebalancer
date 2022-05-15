import { WalletContext } from "@/components/WalletContextProvider";
import { useContext } from "react";

const useWallet = () => useContext(WalletContext);

export default useWallet;
