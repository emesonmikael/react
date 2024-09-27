import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [currentFile, setCurrentFile] = useState('/src/NetfliSeries.m3u'); // Caminho inicial
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar e ler o conteúdo do arquivo M3U
  const fetchM3U = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Erro ao buscar o arquivo M3U: ${response.statusText}`);
      }
      const text = await response.text();
      parseM3U(text);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Função para interpretar o conteúdo do arquivo M3U
  const parseM3U = (text) => {
    const lines = text.split('\n');
    const parsedItems = [];
    let currentItem = {};

    lines.forEach((line) => {
      line = line.trim();
      if (line.startsWith('#EXTINF')) {
        const titleMatch = line.match(/,(.*)$/);
        currentItem.title = titleMatch ? titleMatch[1].trim() : 'Sem Título';
        const tvgLogoMatch = line.match(/tvg-logo="(.*?)"/);
        currentItem.tvgLogo = tvgLogoMatch ? tvgLogoMatch[1] : '';
      } else if (line.startsWith('#EXTBG')) {
        const bgMatch = line.match(/#EXTBG:\s*(.*)$/);
        currentItem.bg = bgMatch ? bgMatch[1].trim() : '#FFFFFF';
      } else if (line && !line.startsWith('#')) {
        currentItem.link = line;
        parsedItems.push({ ...currentItem });
        currentItem = {};
      }
    });

    setItems(parsedItems);
  };

  useEffect(() => {
    if (currentFile) {
      fetchM3U(currentFile);
    }
  }, [currentFile]);

  // Função para verificar se o conteúdo é M3U
  const isM3UContent = (text) => {
    return text.startsWith('#EXTM3U');
  };

  // Função para tratar o clique no item
  const handleClick = async (item) => {
    setError(null);
    setLoading(true);
    try {
      // Tenta buscar o conteúdo do link
      const response = await fetch(item.link);
      if (!response.ok) {
        throw new Error(`Erro ao acessar o link: ${response.statusText}`);
      }
      const contentType = response.headers.get('content-type');
      const text = await response.text();

      if (isM3UContent(text)) {
        // Se o conteúdo é M3U, parseia e atualiza a lista de itens
        parseM3U(text);
        setCurrentFile(null); // Já atualizamos os itens, então não há um arquivo atual específico
        setVideoUrl(null);
      } else if (item.link.endsWith('.mp4')) {
        // Se o link termina com .mp4, reproduz o vídeo
        setVideoUrl(item.link);
        setItems([]); // Limpa a lista de itens
        setCurrentFile(null);
      } else {
        // Se não for M3U nem MP4, trata como vídeo
        setVideoUrl(item.link);
        setItems([]);
        setCurrentFile(null);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Função para voltar à lista anterior (se necessário)
  const handleBack = () => {
    setVideoUrl(null);
    setCurrentFile('/src/NetfliSeries.m3u'); // Ajuste conforme a lógica de navegação desejada
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Playlists</h1>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {videoUrl ? (
        <div>
          <button onClick={handleBack} style={{ marginBottom: '10px' }}>
            Voltar
          </button>
          <h2>Reproduzindo vídeo</h2>
          <video controls width="800" src={videoUrl}>
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: item.bg || '#f0f0f0',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = item.bg || '#f0f0f0')}
            >
              {item.tvgLogo && (
                <img
                  src={item.tvgLogo}
                  alt={item.title}
                  style={{ width: '50px', height: '50px', marginRight: '15px', borderRadius: '5px' }}
                />
              )}
              <span style={{ fontSize: '18px' }}>{item.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;