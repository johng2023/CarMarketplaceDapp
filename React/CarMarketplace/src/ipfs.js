import axios from "axios";

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
const gateway = "https://gateway.pinata.cloud/ipfs/";

export async function uploadToIPFS(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        description: "Car marketplace image",
        uploadAt: new Date().toISOString(),
      },
    });
    formData.append("metadata", metadata);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${PINATA_JWT}`,
        },
      }
    );

    //get hash
    const ipfsHash = response.data.IpfsHash;
    console.log("File uploaded to IPFS", ipfsHash);

    //return full URL
    const ipfsUrl = `${gateway}${ipfsHash}`;
    return ipfsUrl;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
}

export function getIPFSUrl(ipfsUrl) {
  // it's already a full URL
  if (ipfsUrl.startsWith("http")) {
    return ipfsUrl;
  }

  // If it's just a hash
  if (ipfsUrl.startsWith("Qm")) {
    return `${gateway}${ipfsUrl}`;
  }

  // If it's ipfs:// format change to URL format
  if (ipfsUrl.startsWith("ipfs://")) {
    const hash = ipfsUrl.replace("ipfs://", "");
    return `${gateway}${hash}`;
  }

  return ipfsUrl;
}
