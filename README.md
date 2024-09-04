# hardhat gitpod

Este projeto permite que você facilmente tenha um ambiente de desenvolvimento para contratos inteligentes, sem precisar instalar ferramentas locais, apenas com seu navegador.

Ele utiliza o serviço do https://Gitpod.io. 

O código base utilizado está no repositório https://github.com/rpaskin/ticemtrilhas_blockchain, especificamente no [Módulo 2/RedeSocialNotarizada7](https://github.com/rpaskin/ticemtrilhas_blockchain/blob/main/Modulo%202/RedeSocialNotarizada7.sol).

# Crie o projeto no Gitpod

1. Acesse https://www.gitpod.io e crie uma conta.
2. Selecione "Configure your own repository"(Configurar seu próprio repositório)
3. Colar o endereço do repositório: https://github.com/rpaskin/hardhat-gitpod
4. Começe a utilizar a IDE


# Começa do mais simples possível

1. Um package.json configurado com o necessário
2. Um .gitpod.yml para executar o npm install
3. Estas instrucões (README.md)
4. Os /contracts, /scripts e /tests

A partir disto você pode desenvolver seus contratos inteligentes, incluindo testes.

Não inclui o deploy em redes externas, apenas [a rede do próprio hardhat](https://hardhat.org/hardhat-network/docs/overview).

## Passos para compilar e testar um contrato

Copie o arquivo .env-example para .env

```bash
$ cp .env-example .env
```

O contract básico está em ./contracts/RedeSocialNotarizada/RedeSocialNotarizada.sol.

Vamos compilar, testar, fazer deploy e interagir com ele. 

```bash
$ npx hardhat compile
$ npx hardhat test tests/RedeSocialNotarizada/testRedeSocialNotarizada.js
```

Se compilou e testou tudo ok, faça o deploy:

```bash
$ npx hardhat run scripts/RedeSocialNotarizada/deployRedeSocialNotarizada.js
```

Se o deploy funcionou, você irá ver um endereço de contrato.

Copie e cole esse endereço, removendo o 0x, no arquivo .env, em RSN_CONTRACT_ADDRESS.

Lembre-se que, na rede hardhat, é apenas uma rede local (similar a VM do Remix).

# Interaja com seu contrato

Examine o programa em ./scripts/RedeSocialNotarizada/interagirRedeSocialNotarizada.js

Ele interage através do endereço do contrato (que você conseguiu acima, no deploy e colocou em .env).

```bash
$ npx hardhat run scripts/RedeSocialNotarizada/interagirRedeSocialNotarizada.js
```
Se funcionou, ele diz "Guardado com sucesso".

## Parabéns, seu ambiente HardHat está funcionando!

Você pode olhar o repositório original (abaixo) para ter mais ideias, ou pode modificar, criar mais testes, etc. com o que já tem aqui.

O que você consegue imaginar?

## Quer aprender mais?

Acesse o [TIC em Trilhas](https://ticemtrilhas.org.br/) que explica esse código e muito mais nos cursos de Blockchain!

## Créditos

Repositório original: https://github.com/tailorvj/hardhat-gitpod
