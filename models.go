package main

type User struct {
	Index      int     `json:"index"`
	Name       string  `json:"name"`
	Figure     string  `json:"figure"`
	Gender     string  `json:"gender"`
	Custom     string  `json:"custom"`
	X          int     `json:"x"`
	Y          int     `json:"y"`
	Z          float64 `json:"z"`
	PoolFigure string  `json:"poolFigure"`
	BadgeCode  string  `json:"badgeCode"`
	Type       int     `json:"type"`
}

type Message struct {
	User        User   `json:"user"`
	Message     string `json:"message"`
	MessageType int    `json:"messageType"`
	Color       string `json:"color"`
}
