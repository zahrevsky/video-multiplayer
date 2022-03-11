let ws = new WebSocket("wss://vzvlad.dev:8080/subscribe")

let video = document.getElementsByTagName('video')[0]

video.onplay = (event) => {
	ws.send('play')
}
video.onpause = (event) => {
	ws.send('pause')
}

ws.onmessage = (event) => {
	if (event.data === "play")
		video.play()
	else if (event.data === "pause")
		video.pause()
	else
		console.warn("Unknown command: " + event.data)
}
