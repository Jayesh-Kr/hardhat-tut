# Hardhat Setup Guide

## 📌 1. Initialize Hardhat
To set up a new Hardhat project, follow these steps:

```bash
mkdir my-hardhat-project && cd my-hardhat-project
npm init -y
npm install --save-dev hardhat
npx hardhat
```

Select **"Create an empty hardhat.config.js"** when prompted.

---

## 📌 2. Install Required Dependencies

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox ethers hardhat-deploy
```

---

## 📌 3. Configure `hardhat.config.js`
Modify `hardhat.config.js` to include necessary plugins and network settings:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

module.exports = {
  solidity: "0.8.20",
  namedAccounts: {
    deployer: {
      default: 0, // First account as the deployer
    },
  },
  networks: {
    hardhat: {
      saveDeployments: true,
    },
  },
};
```

---

## 📌 4. Writing a Deployment Script

### **Option 1: Using `scripts/deploy.js`**
Create a `scripts` folder and add `deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("YourContract");
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Run deployment:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### **Option 2: Using `hardhat-deploy` (Recommended)**
Create a `deploy` folder and add `01_deploy.js`:

```javascript
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("YourContract", {
    from: deployer,
    args: [], // Constructor arguments
    log: true,
  });
};

module.exports.tags = ["YourContract"];
```

Run deployment:
```bash
npx hardhat deploy
```

---

## 📌 5. Running a Local Blockchain (Hardhat Node)

Start a local Hardhat blockchain:
```bash
npx hardhat node
```

This will generate **20 test accounts** with **10,000 ETH each** (only usable in the Hardhat local network).

---

## 📌 6. Import Private Key to MetaMask
1. Open **MetaMask** → Click on the Profile Icon → **Import Account**
2. Copy the private key from Hardhat CLI output:
   ```
   Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
   Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   ```
3. Paste the **private key** into MetaMask.
4. Done! 🎉 You will now see **10,000 ETH** (only on the Hardhat network).

---

## 📌 7. Connecting MetaMask to Hardhat Network
To see your **Hardhat ETH** in MetaMask:

1. Open MetaMask → Click on the Profile Icon → **Settings** → **Networks**
2. Click **Add Network** → Scroll Down → **Add a Network Manually**
3. Enter the following details:
   - **Network Name:** Hardhat Localhost
   - **New RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `31337`
   - **Currency Symbol:** ETH
   - **Block Explorer URL:** (Leave Empty)
4. Click **Save**.

Now you can see and use your Hardhat ETH in MetaMask! 🎉

---

## 📌 8. Persisting Blockchain Data
By default, Hardhat resets data when restarted. To **persist blockchain state**, use:

```bash
npx hardhat node --database .hardhat-local
```

For subsequent runs, just start the node normally:
```bash
npx hardhat node
```

---

## 📌 9. Useful Hardhat Commands
| Command | Description |
|---------|-------------|
| `npx hardhat node` | Starts a local blockchain |
| `npx hardhat compile` | Compiles smart contracts |
| `npx hardhat test` | Runs tests |
| `npx hardhat deploy` | Deploys contract using `hardhat-deploy` |
| `npx hardhat run scripts/deploy.js --network localhost` | Deploys contract manually |
| `npx hardhat console --network localhost` | Opens an interactive console |

---

## 📌 10. Additional Notes
- **Gas Fees:** On a local Hardhat network, gas fees are **not deducted**.
- **Different Projects:** Every Hardhat project is **isolated**, so repeating setup is needed for new projects.
- **Hardhat Resets Data:** Use `--database .hardhat-local` to avoid losing contract state.

---

## 📌 11. How to use with wagmi
Update wagmiConfig.js
```javascipt
import { createConfig, http } from "wagmi";
import { hardhat } from "wagmi/chains";

export const config = createConfig({
  chains: [hardhat], // Use the local Hardhat chain
  transports: {
    [hardhat.id]: http("http://127.0.0.1:8545"), // Connect to Hardhat node
  },
});
```

## 🎯 Conclusion
This guide should help you set up, deploy, and interact with smart contracts using Hardhat while ensuring persistent blockchain data. 🚀 Happy coding!

