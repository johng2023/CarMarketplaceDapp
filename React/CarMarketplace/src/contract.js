import CarMarketplace from "/Users/johnguckian/Car-Marketplace/ContractCode/artifacts/contracts/carContract.sol/CarMarketplace.json";
import { ethers } from "ethers";

export const carMarketplaceAddress =
  "0xA6b972AC25bd4b3EA3cFD5251BC533682FFd4303";

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
