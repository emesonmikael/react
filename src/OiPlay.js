import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

// Substitua pelo seu Infura Project ID
const YOUR_INFURA_PROJECT_ID = '94ccd8f7f0ee41678d5a0590e5692762';

// Configuração do WalletConnect
const walletConnect = new WalletConnectConnector({
  rpc: { 1:' https://mainnet.infura.io/v3/94ccd8f7f0ee41678d5a0590e5692762'},
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

const M3UPlayerOiPlay = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  // Função para conectar à carteira usando MetaMask ou WalletConnect
  const connectWallet = async () => {
    try {
      let provider;

      // Tenta usar MetaMask primeiro
      if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
      } else {
        // Se MetaMask não estiver disponível, usa WalletConnect
        provider = new ethers.providers.Web3Provider(await walletConnect.getProvider());
      }

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address); // Define o endereço da carteira conectada
    } catch (error) {
      console.error('Erro ao conectar a carteira:', error);
      alert('Não foi possível conectar a carteira. Verifique se você possui uma carteira instalada.');
    }
  };

  // Função para processar o arquivo M3U
  const processM3U = (m3uContent) => {
    const lines = m3uContent.split('\n');
    const parsedChannels = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const metadata = lines[i];
        const streamUrl = lines[i + 1];
        const nameMatch = metadata.match(/,([^\r\n]+)/);
        const logoMatch = metadata.match(/tvg-logo="([^"]+)"/);

        parsedChannels.push({
          name: nameMatch ? nameMatch[1] : 'Unknown',
          logo: logoMatch ? logoMatch[1] : null,
          url: streamUrl.trim(),
        });
      }
    }

    setChannels(parsedChannels);
  };

  // Carrega o arquivo M3U automaticamente ao montar o componente
  useEffect(() => {
    const loadM3UFile = async () => {
      try {
        const response = await fetch('/playlist.m3u'); // Ajuste o caminho conforme necessário
        const content = await response.text();
        processM3U(content);
      } catch (error) {
        console.error('Erro ao carregar o arquivo M3U:', error);
      }
    };

    loadM3UFile();
  }, []);

  // Função para selecionar um canal
  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    window.open(channel.url, '_blank'); // Abre o vídeo em uma nova aba do navegador padrão
  };

  return (
    <div>
      {!walletAddress ? (
        <button onClick={connectWallet}>Conectar com a Carteira</button>
      ) : (
        <>
          <h2>M3U Player - Conectado: {walletAddress}</h2>

          {channels.length > 0 && (
            <>
              <div>
                <h3>Selecione um Canal:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {channels.map((channel, index) => (
                    <div
                      key={index}
                      onClick={() => handleChannelSelect(channel)}
                      style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        width: '120px',
                      }}
                    >
                      {channel.logo && (
                        <img src={channel.logo} alt={channel.name} style={{ width: '100%' }} />
                      )}
                      <p>{channel.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedChannel && (
            <div className="player-wrapper" style={{ marginTop: '20px' }}>
              <h3>{selectedChannel.name}</h3>
              <video
                src={selectedChannel.url}
                controls
                width="100%"
                height="100%"
                onError={() => alert('Erro ao carregar o vídeo. Tente abrir em outro navegador.')}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default M3UPlayerOiPlay;