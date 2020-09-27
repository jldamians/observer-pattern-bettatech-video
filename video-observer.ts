interface Observable {
	attach(o: Observer): void;
	detach(o: Observer): void;
	notify(): void;
}

interface Observer {
	update(): void;
}

class YoutubeChannel implements Observable {
	private channelSubscribers: Observer[] = [];
	private lastVideoPosted: string = '';

	get getLastVideoPosted(): string {
		return this.lastVideoPosted;
	}

	attach(o: Observer): void {
		this.channelSubscribers.push(o);
	}
	detach(o: Observer): void {
		// TODO
	}
	addNewVideo(title: string): void {
		this.lastVideoPosted = title;
		this.notify();
		console.log('New youtube video add to channel');
	}
	notify(): void {
		this.channelSubscribers.forEach((subscriber) => {
			subscriber.update();
		});
	}
}

class Subscriber implements Observer {
	private observable: Observable;

	constructor(observable: Observable) {
		this.observable = observable;
	}

	update(): void {
		console.log('New video posted!');
		console.log((this.observable as YoutubeChannel).getLastVideoPosted);
	}
}

const channel = new YoutubeChannel();
const s1 = new Subscriber(channel);
const s2 = new Subscriber(channel);
channel.attach(s1);
channel.attach(s2);
channel.addNewVideo("Bird Box");
