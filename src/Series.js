import React, { useState, useEffect } from 'react';
// Importe o arquivo M3U como uma string
import m3uFile from './Series.m3u';

const App = () => {
  const [items, setItems] = useState([]);

  // Função para fazer o parse do conteúdo M3U
  const parseM3U = (content) => {
    const lines = content.split('\n');
    let items = [];
    let currentItem = {};

    lines.forEach((line) => {
      if (line.startsWith('#EXTINF')) {
        const titleMatch = line.match(/,(.*)$/);
        if (titleMatch) currentItem.title = titleMatch[1];

        const logoMatch = line.match(/tvg-logo="(.*?)"/);
        if (logoMatch) currentItem.tvgLogo = logoMatch[1];
      } else if (line.startsWith('#EXTBG')) {
        const bgMatch = line.match(/#EXTBG: (.*)/);
        if (bgMatch) currentItem.background = bgMatch[1];
      } else if (line.startsWith('http') || line.startsWith('/')) {
        currentItem.url = line.trim();  // Para evitar problemas de espaço extra
        items.push(currentItem);
        currentItem = {};
      }
    });
    return items;
  };

  useEffect(() => {
    // Carrega o arquivo M3U diretamente
    fetch(m3uFile)
      .then((response) => response.text())
      .then((text) => {
        const parsedItems = parseM3U(text);
        setItems(parsedItems);
      })
      .catch((error) => console.error('Erro ao carregar o arquivo M3U:', error));
  }, []);

  return (
    <div>
      <h1>Playlist de Séries</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.tvgLogo && <img src={item.tvgLogo} alt={item.title} />}
            <h2>{item.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;