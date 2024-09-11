import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
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
          url: streamUrl.trim(), // Trim para remover espaços em branco
        });
      }
    }

    setChannels(parsedChannels);
  };

  
  useEffect(() => {
    const loadM3UFile = async () => {
      try {
        const response = await fetch('/OiPlay.m3u');
        const content = await response.text();
        processM3U(content);
      } catch (error) {
        console.error('Erro ao carregar o arquivo M3U:', error);
      }
    };

    loadM3UFile();
  }, []);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    // Navega para a página do player passando o nome do canal na URL
    navigate(`player/${encodeURIComponent(channel.name)}?url=${encodeURIComponent(channel.url)}`);
  };

  const handleSaveToFile = () => {
    const blob = new Blob([JSON.stringify(channels, null, 2)], { type: 'application/json' });
    saveAs(blob, 'channels.json');
  };

  return (
    <div>
      <h2>M3U Player</h2>

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
          <button onClick={handleSaveToFile} style={{ marginTop: '20px' }}>
            Save Channels to File
          </button>
        </>
      )}

      {selectedChannel && (
        <div className="player-wrapper" style={{ marginTop: '20px' }}>
          <h3>{selectedChannel.name}</h3>
          {/* Testa a reprodução do vídeo usando o elemento <video> */}
          <video
            src={selectedChannel.url}
            controls
            width="50%"
            height="50%"
            onError={() => alert('Erro ao carregar o vídeo. Tente abrir em outro navegador.')}
          />
        </div>
      )}
    </div>
  );
};

export default M3UPlayerOiPlay;
