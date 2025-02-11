import hre from 'hardhat';

async function main() {
    const Contract = await hre.ethers.getContractFactory("YourContract");
    const contract = await Contract.deploy();
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
