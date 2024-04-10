// import { Leva } from 'leva';
import './App.css';
// import Geometries from './Geometries';
// import LivingRoom from './LivingRoom';
import Keyboard from './Keyboard';

function App() {
	return (
		<>
			{/* <Leva collapsed /> */}
			{/* <Geometries /> */}
			{/* <LivingRoom /> */}
			<Keyboard />
		</>
	);
}

document.ontouchmove = function (e) {
	e.preventDefault();
};

export default App;
