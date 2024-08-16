package main

import "context"

type App struct {
	Messages []Message `json:"messages"`
}

func NewApp() *App {
	return &App{
		Messages: []Message{},
	}
}

func (a *App) startup(ctx context.Context) {
	go ConnectGE()
}

func (a *App) GetMessages() []Message {
	return a.Messages
}

func (a *App) AddMessage(user User, message string, color string, messageType int) {
	newMessage := Message{
		User:        user,
		Message:     message,
		MessageType: messageType,
		Color:       color,
	}
	a.Messages = append(a.Messages, newMessage)
}
