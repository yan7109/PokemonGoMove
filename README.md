# Pokemon GO GPS Emulator

This is an English translation of the original ReadMe posted by huacnlee/PokemonGoMove on GitHub. The original ReadMe was written in Chinese...

This project uses Xcode Debug mode [Simulating a Location at Runtime](https://developer.apple.com/library/ios/recipes/xcode_help-debugger/articles/simulating_locations.html) to spoof GPS locations for non-jailbroken iOS devices.

## Main Components
- a blank iOS project, used in Debug mode for `Simulate Location`
- a web interface made via Sinatra to interact with PokemonGo from [PokemonGoControllerSuite](https://github.com/adin283/PokemonGoControllerSuite/tree/master/PokemonGoController)
- an AppleScript for sending GPS location signals

## System Requirement

- Xcode installed and Apple developer account
- Any iOS device with Pokemon GO installed

## Installation Instructions

### Open foo.xcodeproj

Connect your iOS device and run the project.

### Start web server

```bash
sudo gem install sinatra -s http://gems.ruby-china.org
```

Go into the terminal, and run the following

```
./start-web
```

You should see the debug messages below, now in a web browser open http://127.0.0.1:3001

```
== Sinatra (v1.4.7) has taken the stage on 3001 for development with backup from Puma
Puma starting in single mode...
* Version 3.4.0 (ruby 2.3.1-p112), codename: Owl Bowl Brawl
* Min threads: 0, max threads: 16
* Environment: development
* Listening on tcp://localhost:3001
Use Ctrl-C to stop
```

<img width="456" alt="2016-07-13 11 22 11" src="https://cloud.githubusercontent.com/assets/5518/16790893/18843eb2-48ec-11e6-919e-40d9cfb3ca74.png">

You can now interact with the webpage and the AppleScript will transmit the new GPS signal to the iOS device. Now feel free to relax and play the game without moving your legs.

### Screencaps

<img width="1096" alt="2016-07-13 11 22 56" src="https://cloud.githubusercontent.com/assets/5518/16790900/2f3dc9f2-48ec-11e6-85eb-c2efa52699a7.png">

<img width="1072" alt="2016-07-13 11 24 07" src="https://cloud.githubusercontent.com/assets/5518/16790916/54f0d2e8-48ec-11e6-9efc-c8d9f495a76d.png">

<img width="480" src="https://ruby-china-files.b0.upaiyun.com/photo/2016/85aa2df3ded3d77143308f05a0809939.jpg!large" />

### References:

- https://ruby-china.org/topics/30510
