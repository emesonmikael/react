import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const M3UPlayerOiPlay = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    // Carrega o arquivo M3U automaticamente do projeto
    const loadM3UFile = async () => {
      try {
        const response = await fetch('/OiPlay.m3u'); // Altere o caminho conforme necessário
        const content = await response.text();
        processM3U(content);
      } catch (error) {
        console.error('Erro ao carregar o arquivo M3U:', error);
      }
    };

    loadM3UFile();
  }, []);

  const handleChannelSelect = (channel) => {
    // Usando o proxy para evitar problemas com links HTTP
    const proxiedUrl = `http://localhost:3001/proxy?url=${encodeURIComponent(channel.url)}`;

    setSelectedChannel({
      ...channel,
      url: proxiedUrl, // Substituímos o URL original pelo URL do proxy
    });
  };

  return (
    <div>
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
      {channels.length > 0 && (
        <>
          <div>
            <h3>Select a Channel:</h3>
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
    </div>
  );
};

export default M3UPlayerOiPlay;