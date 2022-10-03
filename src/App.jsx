import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLayout from './layout/admin/AdminLayout';
import Layout from './layout/Layout';
import AdminAbout from './pages/admin/AdminAbout';
import AdminHome from './pages/admin/AdminHome';
import AdminTours from './pages/admin/AdminTours';
import AdminToursCreate from './pages/admin/AdminToursCreate';
import AdminToursEdit from './pages/admin/AdminToursEdit';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Kontakt from './pages/Kontakt';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Om from './pages/Om';
import Rumfaergen from './pages/Rumfaergen';
import SearchResult from './pages/SearchResult';
import Sikkerhed from './pages/Sikkerhed';
import Ture from './pages/Ture';

function App() {
  return (

    // HUSK at <BrowserRouter> samt <LoginContextProvider> er placeret i index.js!!!!

    <Routes>
      
      {/* ------------------- PUBLIC */}

      <Route path="/" element={ < Layout /> }>

        <Route index element={ < Home /> } />
        <Route path="rumfaergen" element={ < Rumfaergen /> } />
        <Route path="ture" element={ < Ture /> } />
        <Route path="galleri" element={ < Gallery /> } />
        <Route path="sikkerhed" element={ < Sikkerhed /> } />
        <Route path="kontakt" element={ < Kontakt /> } />
        <Route path="login" element={ < Login /> } />
        <Route path="*" element={ < NoMatch /> } />

        {/* SØGMOMG */}
        <Route path="search/:searchWord" element={<SearchResult />} />
        {/* NoMatch skal ligges nedernes, da der køren oppefra og ned, så derigennme forstyrrer den ikke, de andre muligheder */}
        <Route path="*" element={ < NoMatch /> } />

      </Route>

      
      {/* ------------------- ADMIN */}

      <Route path="/admin" element={ < AdminLayout /> }>

        <Route index element={ < AdminHome /> } />
        <Route path="admintours" element={ < AdminTours /> } />
        <Route path="adminabout" element={ < AdminAbout /> } />
        <Route path="admintourscreate" element={ < AdminToursCreate /> } />
        <Route path="admintoursedit/:tourID" element={ < AdminToursEdit /> } /> {/* : = parametre og er ikke en del af path'en */}
        <Route path="*" element={ < NoMatch /> } /> 

      </Route>

    </Routes>

  );
}

export default App;
