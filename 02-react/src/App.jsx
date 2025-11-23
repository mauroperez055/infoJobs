import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SearchPage } from "./Pages/Search";
import { HomePage } from "./Pages/Home";
import { Route } from "./components/Route";


function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Footer />
    </>
  )
}

export default App;
