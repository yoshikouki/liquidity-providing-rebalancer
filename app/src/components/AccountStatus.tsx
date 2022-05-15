import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import useWallet from "@/hooks/useWallet";

const AccountStatus = () => {
  const { isLoading, account, connectWallet, disconnectWallet } = useWallet();

  return isLoading ? (
    <button className="ml-auto btn btn-ghost loading"></button>
  ) : account ? (
    <div className="ml-auto w-1/2 dropdown dropdown-hover dropdown-end">
      <label>
        <div className="px-4 text-right truncate">{account}</div>
      </label>
      <ul
        className="pt-4 shadow dropdown-content menu bg-base-100 rounded-box"
        tabIndex={0}
      >
        <li>
          <label className="btn btn-ghost" onClick={disconnectWallet}>
            Disconnect
          </label>
        </li>
      </ul>
    </div>
  ) : (
    <button
      className="ml-auto btn btn-ghost"
      onClick={() => void connectWallet()}
    >
      Connect Wallet
    </button>
  );
};

export default AccountStatus;
