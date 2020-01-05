# FRCSensorHub
⚠️ This project is not in a working state right now

FRCSensorHub is a JavaScript powered sensor readout congregator **built for a Raspberry Pi** for use in [FRC](https://www.firstinspires.org/robotics/frc) competitions.

## ✨ Motivation
This project was created to help move the sensor processing to a dedicated unit with the ability to easily insert that into a web application.  Also, who doesn’t love another excuse to play with a Raspberry Pi?

## 🚀 Frameworks
This project was made with [Node.js](https://nodejs.org/en/) using frameworks like:
* [Express](https://expressjs.com)
* [ws](https://www.npmjs.com/package/ws)

## 🧰 Prerequisites
* Node.js (And either [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com/en/) as a byproduct)

## 💿 Install
1. Update your Pi with `sudo apt-get update && sudo apt-get upgrade`
2. Clone the git repository by running `git clone https://github.com/srburk/FRCSensorHub`
3. Navigate into the new directory and install the needed node modules
```
cd FRCSensorHub
npm install 
```

## 🔧 Usage
1. Run using `node index.js`