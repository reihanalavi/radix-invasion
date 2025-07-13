import { sendTokens } from "./send-tokens.js";

console.log("Running radix-connect script...", window.RDT);
const RDT = window.RDT;

const dappConfig = {
  networkId: RDT.RadixNetwork.Stokenet,
  applicationVersion: "1.0.0",
  applicationName: "Hello Token dApp",
  applicationDappDefinitionAddress:
    "account_tdx_2_1285g4e8xxt7mgvjqzu2jcrs28vxf9ayq0rmd0phu0puc2qavmvezmu",
};
// Instantiate DappToolkit to connect to the Radix wallet and network
const rdt = RDT.RadixDappToolkit(dappConfig);
console.log("DappToolkit initialized with config:", dappConfig);
console.log("RDT:", rdt);

rdt.walletApi.setRequestData(RDT.DataRequestBuilder.accounts().exactly(1));
let requestResult = await rdt.walletApi.sendRequest();
console.log("Request result:", requestResult);

// let txResult = await sendTokens(
//   rdt,
//   "account_tdx_2_128ntdeqsshu3a8xpmyrf6asur4dxykhar9ms936s840fagslm3hetq",
//   "account_tdx_2_12yrm23kzyhvcdk8nzqkmgqxf9ua4eevrvjkzx94zhgf5atgfmtjfx4",
//   "resource_tdx_2_1t4nvr3wq2lxee5dfpqu2lywtk26wusjhdv8tsrpu9m5m7vtrg6n8p5",
//   5
// );

// console.log("Transaction result:", txResult);
