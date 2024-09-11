
// This script assumes you are using a testing framework like Hardhat with ethers.js: 

// Please replace `"RexToken"` with the actual name of your contract if it's different, 
// and make sure to adjust the test according to the actual total supply and other specific 
// details of your contract.
// This script also assumes that the preminted tokens are assigned to the owner/deployer of the contract. 

const { expect } = require("chai"); 
const { ethers } = require("hardhat"); 

// Define the contract name in the global scope
const contractName = "RedeSocialNotarizada";
const precoInicial = 1234;

describe(contractName, function () { 
    let RedeSocialNotarizada; 
    let contratoRSN; 
    let dono, endereco1, mais_enderecos;
    
    // Antes de cada teste:
    beforeEach(async function () { 
        // Crie e faça o deploy de um novo contrato
        RedeSocialNotarizada = await ethers.getContractFactory(contractName); 
        contratoRSN = await RedeSocialNotarizada.deploy(precoInicial); 

        // pegue endereços dos potenciais assinadores
        [dono, endereco1, ...mais_enderecos] = await ethers.getSigners();
    });
        
    describe("Deployment", function () {         
        it("Deve definir o dono correto no momento do deployment", async function () { 
          expect(await contratoRSN.criador()).to.equal(dono.address);
        }); 

        it("Deve definir o preço no momento do deployment", async function () { 
          expect(await contratoRSN.preco()).to.equal(precoInicial);
        });

        it("Deve emitir evento com o dono correto do perfil", async function () {
          const nomePerfil = "PerfilTeste";
          await expect(contratoRSN.connect(endereco1).guardar(nomePerfil, endereco1.address, { value: precoInicial }))
            .to.emit(contratoRSN, "Guardado")
            .withArgs(nomePerfil, endereco1.address);
        });

        it("Não deve permitir salvar com menos do preco", async function () {
          await expect(
            contratoRSN.guardar(
              "nome",
              endereco1.address, {value: 10 }
            )
          ).to.be.revertedWith("Precisa receber o valor correto!");
        });

        // it("Deve permitir que um usuário salve um perfil, com o pagamento correto", async function () {
        //     const nomePerfil = "PerfilTeste";
        //     await expect(contratoRSN.connect(endereco1).guardar(nomePerfil, endereco1.address, { value: precoInicial }))
        //       .to.emit(contratoRSN, "Guardado")
        //       .withArgs(nomePerfil, endereco1.address);
        
        //     const perfil = await contratoRSN.registros(endereco1.address);
        //     expect(perfil.perfil).to.equal(nomePerfil);
        //     expect(perfil.quando_criado).to.be.greaterThan(0);
        // });

        // it("Não deve permitir sobrescrever um perfil existente", async function () {
        //   const nomePerfil = "PerfilTeste";
        //   await contratoRSN.connect(endereco1).guardar(nomePerfil, endereco1.address, { value: precoInicial });

        //   await expect(contratoRSN.connect(endereco1).guardar("OutroPerfil", endereco1.address, { value: precoInicial }))
        //     .to.be.revertedWith("Um perfil ja esta guardado para este dono!");
        // });

        // it("Deve receber troco", async function () {
        //   const nomePerfil = "PerfilTeste";
        //   const pagamentoExtra = ethers.parseEther("2.0"); // 2 ether
        //   const balanceAntes = await ethers.provider.getBalance(endereco1.address);
          
        //   const tx = await contratoRSN.connect(endereco1).guardar(nomePerfil, endereco1.address, { value: pagamentoExtra });
        //   const receipt = await tx.wait();
          
        //   // Convert gasUsed to BigInt and multiply
        //   const gasUsed = receipt.gasUsed * receipt.gasPrice;
        //   const balanceDepois = await ethers.provider.getBalance(endereco1.address);
          
        //   // Ensure all values are BigInt in the calculation
        //   const expectedBalance = balanceAntes - BigInt(precoInicial) - gasUsed;
          
        //   // Permitir uma tolerancia, por conta de flutuacao do gas
        //   expect(balanceDepois).to.be.closeTo(expectedBalance, ethers.parseEther("0.01"));
        // });
    }); 
});


/*

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RedeSocialNotarizada", function () {

  let RedeSocialNotarizada, redeSocialNotarizada, dono, endereco1, endereco2;
  const precoInicial = ethers.utils.parseEther("1.0"); // 1 ether

  beforeEach(async function () {
    RedeSocialNotarizada = await ethers.getContractFactory("RedeSocialNotarizada");
    [dono, endereco1, endereco2, _] = await ethers.getSigners();

    redeSocialNotarizada = await RedeSocialNotarizada.deploy(precoInicial);
    await redeSocialNotarizada.deployed();
  });

  it("Deve definir o dono correto e o preço no momento do deployment", async function () {
    expect(await redeSocialNotarizada.criador()).to.equal(dono.address);
    expect(await redeSocialNotarizada.preco()).to.equal(precoInicial);
  });

  it("Deve permitir que um usuário salve um perfil com o pagamento correto", async function () {
    const nomePerfil = "PerfilTeste";
    await expect(redeSocialNotarizada.connect(endereco1).guardar(nomePerfil, endereco1.address, { value: precoInicial }))
      .to.emit(redeSocialNotarizada, "Guardado")
      .withArgs(nomePerfil, endereco1.address);

    const perfil = await redeSocialNotarizada.registros(endereco1.address);
    expect(perfil.perfil).to.equal(nomePerfil);
    expect(perfil.quando_criado.toNumber()).to.be.greaterThan(0);
  });

  it("Não deve permitir salvar um perfil sem pagamento suficiente", async function () {
    const nomePerfil = "PerfilTeste";
    const pagamentoInsuficiente = ethers.utils.parseEther("0.5"); // 0.5 ether
    await expect(redeSocialNotarizada.connect(endereco1).guardar(nomePerfil, endereco1.address, { value: pagamentoInsuficiente }))
      .to.be.revertedWith("Precisa receber o valor correto!");
  });

  it("Não deve permitir sobrescrever um perfil existente", async function () {
    const nomePerfil = "PerfilTeste";
    await redeSocialNotarizada.connect(endereco1).guardar(nomePerfil, endereco1.address, { value: precoInicial });

    await expect(redeSocialNotarizada.connect(endereco1).guardar("OutroPerfil", endereco1.address, { value: precoInicial }))
      .to.be.revertedWith("Um perfil ja esta guardado para este dono!");
  });

});


*/



// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("RedeSocialNotarizada", function () {

//   let RedeSocialNotarizada, redeSocialNotarizada, owner, endereco1, endereco2;
//   const initialPrice = ethers.utils.parseEther("1.0"); // 1 ether

//   beforeEach(async function () {
//     RedeSocialNotarizada = await ethers.getContractFactory("RedeSocialNotarizada");
//     [owner, endereco1, endereco2, _] = await ethers.getSigners();

//     redeSocialNotarizada = await RedeSocialNotarizada.deploy(initialPrice);
//     await redeSocialNotarizada.deployed();
//   });

//   it("Should set the right owner and price on deployment", async function () {
//     expect(await redeSocialNotarizada.criador()).to.equal(owner.address);
//     expect(await redeSocialNotarizada.preco()).to.equal(initialPrice);
//   });

//   it("Should allow a user to save a profile with the correct payment", async function () {
//     const profileName = "TestProfile";
//     await expect(redeSocialNotarizada.connect(endereco1).guardar(profileName, endereco1.address, { value: initialPrice }))
//       .to.emit(redeSocialNotarizada, "Guardado")
//       .withArgs(profileName, endereco1.address);

//     const profile = await redeSocialNotarizada.registros(endereco1.address);
//     expect(profile.perfil).to.equal(profileName);
//     expect(profile.quando_criado.toNumber()).to.be.greaterThan(0);
//   });

//   it("Should not allow to save a profile without sufficient payment", async function () {
//     const profileName = "TestProfile";
//     const insufficientPayment = ethers.utils.parseEther("0.5"); // 0.5 ether
//     await expect(redeSocialNotarizada.connect(endereco1).guardar(profileName, endereco1.address, { value: insufficientPayment }))
//       .to.be.revertedWith("Precisa receber o valor correto!");
//   });

//   it("Should not allow to overwrite an existing profile", async function () {
//     const profileName = "TestProfile";
//     await redeSocialNotarizada.connect(endereco1).guardar(profileName, endereco1.address, { value: initialPrice });

//     await expect(redeSocialNotarizada.connect(endereco1).guardar("AnotherProfile", endereco1.address, { value: initialPrice }))
//       .to.be.revertedWith("Um perfil ja esta guardado para este dono!");
//   });

// });
