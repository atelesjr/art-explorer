import { useState } from 'react';

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="container-main">
			<header className="header">
				<div className="font-bold flex  flex-col items-center">
					<div className="text-[45px] leading-none">ART</div>
					<div className="text-[20px]">Explorer</div>
				</div>

				<div
					className={`hamburger sm:hidden ${isMenuOpen ? 'active' : ''}`}
					onClick={toggleMenu}
				>
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
				</div>

				<div className="hidden sm:flex">
					<nav className="flex">
						<div>Main</div>''
						<div>Your Favorites</div>
					</nav>
					<div className="search-bar">
						<button>Search</button>
					</div>
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
