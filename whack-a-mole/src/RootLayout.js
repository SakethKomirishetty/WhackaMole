import { Outlet } from "react-router-dom";
import Header from './components/header/Header';
import { MusicButton } from "./components/music/MusicPlayer";

function RootLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <div 
        style={{ 
          flexGrow: 1,  // Takes remaining space after header
          backgroundImage: "url('https://img.freepik.com/premium-vector/offline-background_679689-47.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="container-fluid">
          <Outlet />
          <MusicButton/>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
