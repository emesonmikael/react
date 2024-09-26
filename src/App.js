import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [currentFile, setCurrentFile] = useState('/NetfliSeries.m3u'); // Começa com o primeiro arquivo M3U
  const [videoUrl, setVideoUrl] = useState(null);

  // Função para buscar e ler o conteúdo do arquivo M3U
  const fetchM3U = async (file) => {
    const response = await fetch(file);
    const text = await response.text();
    parseM3U(text);
  };

  // Função para interpretar o arquivo M3U
  const parseM3U = (text) => {
    const lines = text.split('\n');
    const parsedItems = [];
    let currentItem = {};

    lines.forEach((line) => {
      if (line.startsWith('#EXTINF')) {
        const title = line.split(',')[1];
        currentItem = { title };
      } else if (line.startsWith('#EXTBG')) {
        currentItem.bg = line.split(' ')[1];
      } else if (line.startsWith('#EXTINF')) {
        currentItem.tvgLogo = line.match(/tvg-logo="(.*?)"/)[1];
      } else if (line.trim().length > 0 && !line.startsWith('#')) {
        currentItem.link = line.trim();
        parsedItems.push(currentItem);
        currentItem = {};
      }
    });

    setItems(parsedItems);
  };

  useEffect(() => {
    fetchM3U(currentFile);
  }, [currentFile]);

  // Função para tratar o clique no item
  const handleClick = (item) => {
    if (item.link.endsWith('.m3u')) {
      setCurrentFile(item.link); // Carrega outro arquivo M3U
      setVideoUrl(null);
    } else if (item.link.endsWith('.mp4')) {
      setVideoUrl(item.link); // Carrega o vídeo MP4
    }
  };

  return (
    <div>
      <h1>Playlists</h1>
      {videoUrl ? (
        <div>
          <h2>Reproduzindo vídeo</h2>
          <video controls width="600" src={videoUrl} />
        </div>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleClick(item)}>
              <img src={item.tvgLogo} alt={item.title} style={{ width: '50px' }} />
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;