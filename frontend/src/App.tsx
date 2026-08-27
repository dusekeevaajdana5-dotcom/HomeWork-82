import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists.tsx";
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import Album from "./features/albums/Album.tsx";

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
        </Routes>
      </Container>

    </>
  )
}

export default App
