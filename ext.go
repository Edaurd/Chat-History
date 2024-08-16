package main

import (
	"log"
	"strconv"

	g "xabbo.b7c.io/goearth"
	"xabbo.b7c.io/goearth/shockwave/in"
	"xabbo.b7c.io/nx"
	gd "xabbo.b7c.io/nx/gamedata"
)

var ext = g.NewExt(g.ExtInfo{
	Title:       "Shockwave Chat History",
	Description: "Based on the example project for shockwave",
	Version:     "1.0",
	Author:      "Eduard, b7",
})

var (
	users            = map[int]*User{}
	usersPacketCount = 0
	gdm              = gd.NewGamedataManager("www.habbo.com")
)

func ConnectGE() {
	ext.Initialized(func(e *g.InitArgs) { log.Printf("Extension initialized") })
	ext.Connected(func(e *g.ConnectArgs) {
		log.Printf("Connected (%s)", e.Host)

	})
	ext.Disconnected(func() { log.Println("Disconnected") })
	ext.Intercept(in.OPC_OK).With(handleEnterRoom)
	ext.Intercept(in.USERS).With(handleUsers)
	ext.Intercept(in.LOGOUT).With(handleRemoveUser)
	ext.Intercept(in.CHAT).With(handleChat)
	ext.Intercept(in.CHAT_2).With(handleWhisper)
	ext.Intercept(in.CHAT_3).With(handleShout)
	ext.Run()
}

func handleEnterRoom(e *g.InterceptArgs) {
	usersPacketCount = 0
	clear(users)
}

func handleUsers(e *g.InterceptArgs) {
	usersPacketCount++
	for range e.Packet.ReadInt() {
		var user User
		e.Packet.Read(&user)
		if user.Type == 1 {
			if usersPacketCount >= 3 {
				log.Printf("* %s entered the room", user.Name)
				figure, err := ConvertFigureString(user.Figure)
				if err != nil {
					return
				}
				app.AddMessage(User{Name: user.Name, Figure: figure.String()}, "Entered the room.", getUserColor(figure), 4)
			}
			users[user.Index] = &user
		}
	}
}
func handleChat(e *g.InterceptArgs) {
	addMessage(e, 1)
}
func handleWhisper(e *g.InterceptArgs) {
	addMessage(e, 2)
}
func handleShout(e *g.InterceptArgs) {
	addMessage(e, 3)
}

func addMessage(e *g.InterceptArgs, messageType int) {
	index := e.Packet.ReadInt()
	msg := e.Packet.ReadString()
	if user, ok := users[index]; ok {
		//log.Printf("%s: %s", user.Name, msg)
		figure, err := ConvertFigureString(user.Figure)
		if err != nil {
			return
		}
		app.AddMessage(User{Name: user.Name, Figure: figure.String()}, msg, getUserColor(figure), messageType)
	}
}

func getUserColor(figure nx.Figure) string {
	color := "000000"
	for _, part := range figure.Parts {
		if part.Type == nx.Chest && len(part.Colors) > 0 {
			color = gdm.Figure.PaletteFor(part.Type)[part.Colors[0]].Value
		}
	}
	//fmt.Println(color)
	if color == "" {
		color = "ff0000"
	}
	return "#" + color
}

func handleRemoveUser(e *g.InterceptArgs) {
	s := e.Packet.ReadString()
	index, err := strconv.Atoi(s)
	if err != nil {
		return
	}
	if user, ok := users[index]; ok {
		log.Printf("* %s left the room.", user.Name)
		figure, err := ConvertFigureString(user.Figure)
		if err != nil {
			return
		}
		app.AddMessage(User{Name: user.Name, Figure: figure.String()}, "Left the room.", getUserColor(figure), 5)
		delete(users, index)
	}
}

func (a *App) GetUsersCount() int {
	return len(users)
}
