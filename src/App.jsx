import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import RouteTransition from "./components/RouteTransition";
import Homepage from "./Pages/Homepage";
import Overwatch from "./Pages/Overwatch";
import OverwatchTeam from "./Pages/OverwatchTeam";
import Minecraft from "./Pages/Minecraft";
import FFXIV from "./Pages/FFXIV";
import OtherGames from "./Pages/OtherGames";
import Palworld from "./Pages/Palworld";
import Satisfactory from "./Pages/Satisfactory";
import Staff from "./Pages/Staff";

const withTransition = (page) => <RouteTransition>{page}</RouteTransition>;

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={withTransition(<Homepage />)} />
        <Route path="/overwatch" element={withTransition(<Overwatch />)} />
        <Route path="/overwatch/team/:teamSlug" element={withTransition(<OverwatchTeam />)} />
        <Route path="/staff" element={withTransition(<Staff />)} />
        <Route path="/palworld" element={withTransition(<Palworld />)} />
        <Route path="/satisfactory" element={withTransition(<Satisfactory />)} />
        <Route path="/minecraft" element={withTransition(<Minecraft />)} />
        <Route path="/ffxiv" element={withTransition(<FFXIV />)} />
        <Route path="/othergames" element={withTransition(<OtherGames />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
