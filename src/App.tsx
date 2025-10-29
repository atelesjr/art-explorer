import { Header } from './components/Header/Header';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favorites from '@/pages/Favorites/Favorites';
import ArtDetails from '@/pages/ArtDetails/ArtDetails';

function App() {
	return (
		<BrowserRouter>
			<div className="container-main">
				<Header />
				<main className="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/item/:id" element={<ArtDetails />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
