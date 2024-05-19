import STATUS from './status.mjs';
import { json } from './utils/fetch.mjs';
import WeatherDisplay from './weatherdisplay.mjs';
import { registerDisplay } from './navigation.mjs';

class Xkcd extends WeatherDisplay {
	constructor(navId, elemId) {
		super(navId, elemId, 'Xkcd', true);
	}

	async getData(_weatherParameters) {
		// Check if the display is enabled and if other initial conditions are met
		if (!super.getData(_weatherParameters)) return;

		try {
			// Fetch the latest XKCD comic
			const comicData = await json('https://xkcd.com/info.0.json', { cors: true });
			this.comicData = comicData;
			this.setStatus(STATUS.loaded);
		} catch (error) {
			console.error('Failed to fetch XKCD comic:', error);
			this.setStatus(STATUS.failed); // Corrected status constant
			// Return undefined to other subscribers if data callback pattern is used elsewhere in your code
			if (this.getDataCallback) this.getDataCallback(undefined);
			return;
		}

		// If a data callback pattern is used, handle the data availability notification
		if (this.getDataCallback) this.getDataCallback();
	}

	async drawCanvas() {
		super.drawCanvas(); // Ensure any base drawing logic is applied

		if (!this.comicData) {
			console.error('No XKCD comic data available');
			return;
		}

		// Get the container element where the comic will be displayed
		const displayElement = this.elem.querySelector('.content');
		if (!displayElement) {
			console.error('.content element not found');
			return;
		}

		// Set the inner HTML of the container to include the comic image, title, and alt text as a caption
		displayElement.innerHTML = `<img src="${this.comicData.img}" alt="${this.comicData.alt}" title="${this.comicData.title}" style="max-width:100%; height:auto;">
                                    <p>${this.comicData.alt}</p>`; // Adding alt text as a caption for accessibility and additional context

		// Call finishDraw if there's any cleanup or final steps needed
		this.finishDraw();
	}

	// Optional: Implement showCanvas if dynamic display logic is required
	showCanvas() {
		super.showCanvas();
		this.drawCanvas(); // Ensure the canvas is updated when shown
	}
}

// Register the display with an instance of Xkcd
registerDisplay(new Xkcd(11, 'xkcd'));
