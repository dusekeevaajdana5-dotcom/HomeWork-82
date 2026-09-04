import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists.tsx";
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import Album from "./features/albums/Album.tsx";
import Tracks from "./features/tracks/Tracks.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";

const  App = () => {


  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container component="main" maxWidth="xl">
        <Routes>
            <Route path="/" element={<Artists/>} />
            <Route path= "/album" element={<Album/>}/>
            <Route path="/artists/:artistId/albums" element={<Album />} />
            <Route path="/albums/:albumId/tracks" element={<Tracks />} />
            <Route path="/register" element={<Register/>}/>
            <Route path= "/login" element={<Login/>}/>
        </Routes>
      </Container>

    </>
  )
}

export default App
