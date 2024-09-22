import { InjectedConnector } from '@web3-react/injected-connector';

// Suporta as redes Ethereum Mainnet (ID 1) e Testnets (ex: Ropsten, ID 3)
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],  // Exemplo de IDs de redes suportadas
});