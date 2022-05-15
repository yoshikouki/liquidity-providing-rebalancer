import React, { createContext, ReactNode, useCallback, useState } from "react";
import { useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "@/lib/web3-modal";

type WalletInterface = {
  account: string | null;
  provider: ethers.providers.Web3Provider | null;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContextDefaultValue: WalletInterface = {
  account: null,
  provider: null,
  isLoading: false,
  connectWallet: async () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  disconnectWallet: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};
export const WalletContext = createContext(WalletContextDefaultValue);

interface Props {
  children: ReactNode & React.PropsWithChildren<{ key?: string }>;
}

const WalletContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] =
    useState<WalletInterface["isLoading"]>(false);
  const [account, setAccount] = useState<WalletInterface["account"]>(null);

  const setAccountOrEnsDomain = async (
    account: string,
    provider: ethers.providers.Web3Provider
  ) => {
    const ensAddress = await provider.lookupAddress(account);
    ensAddress ? setAccount(ensAddress) : setAccount(account);
  };

  const disconnectWallet = useCallback(() => {
    setAccount(null);
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      const web3Modal = new Web3Modal(providerOptions);
      const providerInstance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(providerInstance);
      provider.on("disconnect", disconnectWallet);
      provider.on("accountsChanged", async (accounts: string[]) => {
        await setAccountOrEnsDomain(accounts[0], provider);
      });

      const accounts = await provider.listAccounts();
      await setAccountOrEnsDomain(accounts[0], provider);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [disconnectWallet]);

  useEffect(() => {
    const web3Modal = new Web3Modal(providerOptions);
    if (web3Modal.cachedProvider) connectWallet();
  }, [connectWallet]);

  return (
    <>
      <WalletContext.Provider
        value={{
          ...WalletContextDefaultValue,
          isLoading,
          account,
          connectWallet,
          disconnectWallet,
        }}
      >
        {children}
      </WalletContext.Provider>
    </>
  );
};

export default WalletContextProvider;
