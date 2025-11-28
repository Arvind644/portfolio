---
title: "Running docker image of java application"
publishedAt: 2025-07-20
description: ""
slug: "Running docker image of java application"
isPublish: true
---

**Before Starting**

- I have wsl2 installed in my system and I am using my Linux environment to run this application. I also advised developers to use
- Linux environment as we will be going to use a lot of command line stuff later.
- You can also run it in eclipse or another code editor for demo purposes.

**Software needed :**
- Java
- Maven
- VS Code
- Linux in WSL2

**Sample Application**

Let’s clone the sample application that we’ll be using in this module to our local development machine. Run the following commands in a terminal to clone the repo.

```bash
 $ cd /path/to/working/directory
 $ git clone https://github.com/spring-projects/spring-petclinic.git
 $ cd spring-petclinic
```

**Java and Maven version**

It's the version of maven and java I am using.

![image 1](https://cdn.hashnode.com/res/hashnode/image/upload/v1672669242503/ad80caf8-f713-4e67-b1fc-03276cfda163.png?auto=compress,format&format=webp)

**Steps to run the application locally**

- Go to your directory where your application lies in the command line. Like it's my working directory.

`arvind@DESKTOP-1DEUAEO:/mnt/c/Users/arvin/Desktop/spring-petclinic$`

- Run the application using mvnw spring-boot:run command or mvn spring-boot:run command. It will take some time to run the application for the first time. When I run this first time on my machine, it took almost 16 mins, so wait for a while.

![image 2](https://cdn.hashnode.com/res/hashnode/image/upload/v1672669341326/f6883bf3-9600-4295-8d96-4770931ae394.png?auto=compress,format&format=webp)

**Note:** If while running this command `mvnw spring-boot:run` if it is showing an error, you have to install mvnw using this command `mvn -N wrapper:wrapper` and then try to run the previous command again. In wsl2, mvnw is still not working sometimes due to a windows issue, then run this -

```bash
sudo apt install dos2unix
dos2unix mvnw
```

Now your mvnw will work properly.

- When you get this in your terminal, it means your application is started now. Now visit your http://localhost:8080.

- It will look something like this in your browser.

![Image 3](https://cdn.hashnode.com/res/hashnode/image/upload/v1672669365487/b79fc692-2b47-486e-a608-ba26be0305ea.png?auto=compress,format&format=webp)

### Errors

The error you can get while running the application.

You will get something like this that says execution failed and list some java files.

![image 4](https://cdn.hashnode.com/res/hashnode/image/upload/v1672669396245/82571d9a-897d-4edc-8abd-575cb63cf922.png?auto=compress,format&format=webp)

n this case, just open your application in vs code and convert it from CRLF to LF which you can find at the right bottom of the vs code.

### Maven build and containerize java application

**Before Starting**

-I have wsl2 installed in my system and I am using my Linux environment to run this application. I also advised developers to use a Linux environment as we will be going to use a lot of command line stuff later.

**Maven build**

In the previous step, we run our application normally. Now it's time to do the maven build (using mvnw) and then make its docker container and try to run the application from inside of our container.

In the root directory of your project, run this command - `./mvnw -Dmaven.test.skip=true spring-boot:build-image`

**Note :** If while running this command `./mvnw -Dmaven.test.skip=true spring-boot:build-image` if it is showing an error no such file or directory, it's a wsl 2 problem. In wsl2, mvnw is still not working sometimes due to windows issues, so run this -

```bash
sudo apt install dos2unix
dos2unix mvnw
```

Now your mvnw will works properly.

This command will create a target folder with a jar file. In this example, the name of the jar file will be - `spring-petclinic-2.7.0-SNAPSHOT.jar`

**Dockerfile**

In the root of the folder create a file named Dockerfile and copy the below content in it.

```bash
# Choose your Java image
FROM  openjdk:8-jdk-alpine

# Create volume for the Java jar build process
VOLUME  /tmp

# Copy the jar to the container
COPY  target/*.jar  app.jar

# Set your command to start the Java application
ENTRYPOINT  ["java","-jar","/app.jar"]
```

**Build an image**

Now run this command in the terminal :

```bash
docker build -t myorg/myapp .
```

This will create a docker image of the application.

Now run the following command to run the container :

```bash
docker run -p 8080:8080 myorg/myapp
```

It will take some time and this will be showing in your terminal, and your application is started now. Now go to localhost:8080 and check your application running from inside a container.
