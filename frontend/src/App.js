import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import FuncionarioScreen from './screens/FuncionarioScreen'
import EmpresaScreen from './screens/EmpresaScreen'
import Welcome from './screens/Welcome'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={Welcome} exact />
          <Route path='/home' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/empresa' component={EmpresaScreen} />
          <Route path='/funcionario' component={FuncionarioScreen} />

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
