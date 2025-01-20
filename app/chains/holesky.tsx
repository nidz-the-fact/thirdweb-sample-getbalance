import { defineChain } from "thirdweb";

// You can. https://chainlist.org/
// ref.https://portal.thirdweb.com/references/typescript/v5/defineChain
const holesky = defineChain({
    id: 17000, // edit
    rpc: "https://holesky.drpc.org", // edit
    nativeCurrency: {
        name: "Ether", // 
        symbol: "ETH", // 
        decimals: 18,
    },
});

// can new file - get-balance\app\chains