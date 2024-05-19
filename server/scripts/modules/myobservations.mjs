// Importing the necessary modules and the WeatherDisplay superclass
import WeatherDisplay from './weatherdisplay.mjs';
import STATUS from './status.mjs';
import { registerDisplay } from './navigation.mjs';

class MyObservations extends WeatherDisplay {
	constructor(navId, elemId) {
		super(navId, elemId, 'My Observations', true);
	}

	async getData(_weatherParameters) {
		// Immediately set the status to loaded to skip data fetching
		this.setStatus(STATUS.loaded);
	}

	async drawCanvas() {
		// Call the base class method to handle any required setup
		super.drawCanvas();
		// Get the container element where the message will be displayed
		const displayElement = this.elem.querySelector('.observation-lines');
		// Set the inner HTML of the container to "Hello World"
		displayElement.innerHTML = 'Hello World';
		// Call finishDraw to handle any required cleanup
		this.finishDraw();
	}
}

// Register the display with an instance of MyObservations
registerDisplay(new MyObservations(11, 'my-observations'));
