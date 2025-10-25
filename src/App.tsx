import { Header } from './components/Header/Header';
import Home from './pages/Home';

function App() {
	return (
		<div className="container-main">
			<Header />
			<main className="main-content">
				<Home />
			</main>
		</div>
	);
}

export default App;
