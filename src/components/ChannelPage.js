import React from 'react';
import { useParams } from 'react-router-dom';

function ChannelPage() {
  const { channelName } = useParams();

  return (
    <div>
      <h1>Bem-vindo ao canal {channelName}</h1>
      {/* Aqui você pode exibir mais informações ou carregar o conteúdo do canal */}
    </div>
  );
}

export default ChannelPage;