import { Leva } from 'leva';
import './App.css';
// import Geometries from './Geometries';
import LivingRoom from './LivingRoom';

function App() {
	return (
		<>
			<Leva />
			{/* <Geometries /> */}
			<LivingRoom />
		</>
	);
}

document.ontouchmove = function (e) {
	e.preventDefault();
};

export default App;
