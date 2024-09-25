import React, { useState, useEffect } from 'react';

// Carrega o arquivo M3U principal da pasta src
import initialM3uFile from './series.m3u';

const App = () => {
  const [items, setItems] = useState([]);
  const [currentM3uFile, setCurrentM3uFile] = useState(initialM3uFile); // Inicializa com o arquivo principal

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
        currentItem.url = line.trim();  // Limpa espaços extras
        items.push(currentItem);
        currentItem = {};
      }
    });
    return items;
  };

  // Função para carregar o conteúdo do arquivo M3U
  const loadM3UFile = (file) => {
    fetch(file)
      .then((response) => response.text())
      .then((text) => {
        const parsedItems = parseM3U(text);
        setItems(parsedItems);
      })
      .catch((error) => console.error('Erro ao carregar o arquivo M3U:', error));
  };

  // Carrega o arquivo M3U inicial ao montar o componente
  useEffect(() => {
    loadM3UFile(currentM3uFile);
  }, [currentM3uFile]);

  // Quando o usuário clicar no item, ele tentará carregar o próximo arquivo M3U ou, se for um arquivo final (por exemplo, mp4), ele abrirá o link
  const handleClick = (itemUrl) => {
    // Verifica se o link é outro arquivo .m3u
    if (itemUrl.endsWith('.m3u')) {
      setCurrentM3uFile(itemUrl); // Atualiza para carregar o novo arquivo M3U
    } else {
      window.open(itemUrl, '_blank'); // Se for um arquivo final, abre o conteúdo
    }
  };

  return (
    <div style={styles.container}>
      <h1>Playlist de Séries</h1>
      <div style={styles.grid}>
        {items.map((item, index) => (
          <div key={index} style={styles.card} onClick={() => handleClick(item.url)}>
            {item.tvgLogo && (
              <img src={item.tvgLogo} alt={item.title} style={styles.logo} />
            )}
            <h2 style={styles.title}>{item.title}</h2>
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
    cursor: 'pointer',
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