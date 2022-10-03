import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLayout from './layout/admin/AdminLayout';
import Layout from './layout/Layout';
import AdminAbout from './pages/admin/AdminAbout';
import AdminHome from './pages/admin/AdminHome';
import AdminTours from './pages/admin/AdminTours';
import AdminToursCreate from './pages/admin/AdminToursCreate';
import AdminToursEdit from './pages/admin/AdminToursEdit';
import Home from './pages/Home';
import Kontakt from './pages/Kontakt';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Om from './pages/Om';
import SearchResult from './pages/SearchResult';

function App() {
  return (

    // HUSK at <BrowserRouter> samt <LoginContextProvider> er placeret i index.js!!!!

    <Routes>
      
      {/* ------------------- PUBLIC */}

      <Route path="/" element={ < Layout /> }>

        <Route index element={ < Home /> } />
        <Route path="kontakt" element={ < Kontakt /> } />
        <Route path="om" element={ < Om /> } />
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
