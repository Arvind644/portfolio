---
title: "Hot Reload in Golang Using Air"
publishedAt: 2024-04-07
description: "Hot reload in golang app while development using Air"
slug: "hot-reload-in-golang-using-air"
isPublish: true
---

### Hot Reload in Golang Using Air

Prerequisites :

1. Golang version 1.22 or higher
2. I tested it on wsl2 in both windows and linux environment

#### Hot reload without docker container

1. Create a golang gin application

    - Create a project directory and install gin-gonic :

    ```golang
    go get -u github.com/gin-gonic/gin
    ```

    - Now install Air :

    ```golang
    go get -u github.com/cosmtrek/air
    ```

    - Create a simple Gin application

    ```go
    // main.go
    package main
    
    import (
    "github.com/gin-gonic/gin"
    )
    
    func main() {
    // Create a new Gin router
    router := gin.Default()
    
    // Define a route
    router.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{
        "message": "Hello, Gin!",
    })
    })
    
    // Run the server on port 8080
    router.Run(":8080")
    }
    ```

2. initialize the `.air.toml` configuration file by running this command

    ```golang
    air init
    ```

3. After this, you can just run the air command without additional arguments and it will use the .air.toml file for configuration.

    ```golang
    air
    ```

#### Hot reload in docker container

1. We are going to use the above application. Create a `Dockerfile` with following content :

    ```Dockerfile
    FROM golang:1.22-alpine
    
    WORKDIR /app
    
    RUN go install github.com/cosmtrek/air@latest
    
    COPY go.mod go.sum ./
    RUN go mod download
    
    CMD ["air", "-c", ".air.toml"]
    ```

2. Now create a `docker-compose.yaml` file :

    ```yaml
    version: "3.8"
    services:
    web:
        build:
        context: .
        # Correct the path to your Dockerfile
        dockerfile: Dockerfile
        ports:
        - 8080:8080
        # Important to bind/mount your codebase dir to /app dir for live reload
        volumes:
        - ./:/app
    ```

3. Now run `docker-compose up` and check `localhost:8080` in browser.

4. If your live reload is not working, try `poll = true` in .air.toml file and rebuild the docker image.
