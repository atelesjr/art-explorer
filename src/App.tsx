import './App.css';

function App() {
	return (
		<div className="container">
			<header className="app-header">
				<h1>Art Explorer</h1>
				<nav>
					<div>Main</div>
					<div>Your Favorites</div>
				</nav>
				<div className="search-bar">
					<input type="text" placeholder="Search artworks..." />
					<button>Search</button>
				</div>
			</header>
			<main>
				<section className="Main">
					<h2>Welcome to Art Explorer</h2>
				</section>
			</main>
		</div>
	);
}

export default App;
