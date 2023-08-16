
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import AppWrapper from './components/AppWrapper';


const Home = lazy(() => import('./views/Home'));
const Login = lazy(() => import('./views/Auth/Login'))
const Register = lazy(() => import('./views/Auth/Register'))
const Candidat = lazy(() => import('./views/candidats/Candidat'))
const Dashbord = lazy(() => import('./views/candidats/Dashbord'))
const Informations = lazy(() => import('./views/candidats/Informations'))
const Password = lazy(() => import('./views/candidats/Password'))
const Candidature = lazy(() => import('./views/candidats/Candidature'))

const Modif = lazy(() => import('./views/candidats/childInfo/Modif'))

//RECRUTEUR
const Recruteur = lazy(() => import('./views/recruteurs/Recruteur'))
const Profil = lazy(() => import('./views/recruteurs/Profil'))

function App(): JSX.Element {
  const { token, users } = useSelector(({ auth }) => auth)

  return (
    <Router>
      <AppWrapper>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {
              users?.user_role === "candidat" ? (
                <Route path="/candidat/moncompte/" element={token ? <Candidat /> : <Navigate to="/login" />} >
                  <Route path="/candidat/moncompte/dashbord" element={<Dashbord />} />
                  <Route path="/candidat/moncompte/info-candidat" element={<Informations />} />
                  <Route path="/candidat/moncompte/info-candidat/modif" element={<Modif />} />

                  <Route path="/candidat/moncompte/password" element={<Password />} />
                  <Route path="/candidat/moncompte/candidatures" element={<Candidature />} />
                </Route>
              )
              :
              (
                <Route path="/recruteur/" element={token ? <Recruteur /> : <Navigate to="/login" />} >
                  <Route path="/recruteur/dashbord" element={<Dashbord />} />
                  <Route path="/recruteur/profil" element={<Profil />} />
                </Route>
              )
            }

          </Routes>
        </Suspense>
        <Footer />
      </AppWrapper>
    </Router>
  )
}

export default App
