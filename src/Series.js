import React, { useState, useEffect } from 'react';
// Importe o arquivo M3U como uma string
import m3uFile from './series.m3u';

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
    <div style={styles.container}>
      <h1>Playlist de Séries</h1>
      <div style={styles.grid}>
        {items.map((item, index) => (
          <div key={index} style={styles.card}>
            {item.tvgLogo && (
              <img src={item.tvgLogo} alt={item.title} style={styles.logo} />
            )}
            <h2 style={styles.title}>{item.title}</h2>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Assistir
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos para o layout responsivo
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  title: {
    fontSize: '18px',
    margin: '10px 0',
  },
};

export default App;