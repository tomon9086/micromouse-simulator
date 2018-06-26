const ipc = require("electron").ipcRenderer

setInterval(() => { console.log("hoge") }, 500)

function send() {
	ipc.send("message", "ping")
	circle.fill = "#0000FF"
	setTimeout(() => {
		circle.fill = "#FF0000"
	}, 500)
}

ipc.on("reply", (event, arg) => {
	console.log(arg)
	circle.fill = "#00FF00"
	setTimeout(() => {
		circle.fill = "#FF0000"
	}, 500)
	// send()
})

const maze = new Two({ width: 400, height: 400 }).appendTo(document.getElementById("maze"))
const frame = maze.makeRectangle(maze.width / 2, maze.height / 2, maze.width, maze.height)
frame.linewidth = 2

const circle = maze.makeCircle(0, 0, 50)

circle.fill = "#ff0000"

// const group = maze.makeGroup(circle, rect)
// group.scale = 1
circle.noStroke()

// maze.update()

maze.bind("update", (frameCount) => {
	circle.translation.set(maze.width / 2 + 100 * Math.cos(frameCount / 30), maze.height / 2 + 100 * Math.sin(frameCount / 30))
}).play()
