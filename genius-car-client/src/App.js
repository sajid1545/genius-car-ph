import { router } from './Router/Routes/Routes';
import './App.css';
import { RouterProvider } from 'react-router-dom';

function App() {
	return (
		<div className="max-w-screen-xl mx-auto">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
