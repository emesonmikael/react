import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import M3UPlayer from "./M3UPlayer2";
import PlayerPage from './PlayerPage';

function Home(){

    return(
        <div>
 <h1> pagina home</h1>
 <a href="https://streamer-liard.vercel.app/netfli">
      Netflix Filme e Series 
<p>

</p>
</a>
<a href="https://streamer-liard.vercel.app/Hbo">
HBO Max
</a>

<p>

</p>
<a href="https://streamer-liard.vercel.app/Globoplay">
Globoplay
</a>

 </div>
    

    );
}
export default Home;