const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const contractAddress = `0x${process.env.RSN_CONTRACT_ADDRESS}`;

  // A ABI (Application Binary Interface/ Interface) do contrato
  const abi = [
    "function guardar(string calldata _perfil, address _dono) public payable",
    "event Guardado(string _perfil, address _dono)",
    "function preco() public returns (uint256)",
    "function criador() public returns (address)"
  ];

  // Conectar ao contrato
  const [deployer, endereco1] = await hre.ethers.getSigners();
  const rsnContract = new hre.ethers.Contract(contractAddress, abi, deployer);

  // Guardar um perfil
  try {
    console.log("Tentando guardar...");
    const guardarTx = await rsnContract.guardar("NomeDoPerfil", endereco1, { value: 1234 });
    await guardarTx.wait();
    console.log("Guardado com sucesso.");
  }catch (error) {
    console.error("Erro ao guardar perfil:", error.message);
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});