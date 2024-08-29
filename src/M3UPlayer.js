import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { saveAs } from 'file-saver';

const M3UPlayer = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  // Função para processar o conteúdo do arquivo M3U e extrair links e metadados
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
          url: streamUrl,
        });
      }
    }

    setChannels(parsedChannels);
  };

  // Função para lidar com o upload de arquivos
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      processM3U(content);
    };
    reader.readAsText(file);
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  const handleSaveToFile = () => {
    const blob = new Blob([JSON.stringify(channels, null, 2)], { type: 'application/json' });
    saveAs(blob, 'channels.json');
  };

  return (
    <div>
      <h2>M3U Player</h2>
      <input type="file" accept=".txt" onChange={handleFileUpload} />

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
          <button onClick={handleSaveToFile} style={{ marginTop: '20px' }}>Save Channels to File</button>
        </>
      )}

      {selectedChannel && (
        <div className="player-wrapper" style={{ marginTop: '20px' }}>
          <h3>{selectedChannel.name}</h3>
          <ReactPlayer url={selectedChannel.url} controls width="100%" height="100%" />
        </div>
      )}
    </div>
  );
};

export default M3UPlayer;