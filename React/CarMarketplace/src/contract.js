import CarMarketplace from "/Users/johnguckian/Car-Marketplace/ContractCode/artifacts/contracts/carContract.sol/CarMarketplace.json";
import { ethers } from "ethers";

export const carMarketplaceAddress =
  "0x5275984bD80CfB8DDC170bDC3643cfeAd1727943";

export const carMarketplaceABI = CarMarketplace.abi;

export async function getCarMarketplaceContract() {
  if (!window.ethereum) {
    alert("Install Metamask");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    carMarketplaceAddress,
    carMarketplaceABI,
    signer
  );

  return contract;
}
