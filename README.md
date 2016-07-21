# Pokemon GO GPS Emulator with Built-In Pokemon/Pokestop/Gym Map

Merged with [PokemonMap] (https://github.com/AHAAAAAAA/PokemonGo-Map), we now have a full interactive spoofer plus map of the nearby pokemons.

<img width="1072" src=https://cloud.githubusercontent.com/assets/6434237/16967597/8d5126d4-4dbe-11e6-9c06-3c91f38a8ea2.png>
<img width="480" src=https://cloud.githubusercontent.com/assets/6434237/16934843/3a988d10-4d0f-11e6-84e6-6dffe48a9e30.PNG>

This project uses Xcode Debug mode [Simulating a Location at Runtime](https://developer.apple.com/library/ios/recipes/xcode_help-debugger/articles/simulating_locations.html) to spoof GPS locations for non-jailbroken iOS devices. This allows players of Pokemon GO to send movement commands over a computer as opposed to doing the actual walking.

## Warning: Improper Use of this Tool Will Get You Banned!
As reported on [reddit](https://www.reddit.com/r/pokemongo/comments/4ry7my/psa_spoofing_gps_locations_will_get_you_banned/), spoofing your GPS coordinates in game could get you banned. Anecdotally, when you change your GPS coordinates drastically in a short period of time (say NYC to SF), you will be soft banned for anywhere between 10 mins to 3 hours. However, there have not been cases of permanent ban, so do this at your discretion. My guess is that the Niantic servers compute a delta distance over delta t and sets a threshold on the speed. Anything beyond the threshold will get your banned.

### Workaround
The latest repo has a startup routine that sets your startup location to be your current location. This would save you the hassle of looking up your GPS coordinates. The idea is you want to be as close to your current location as possible to not exceed the threshold. Also shutdown all background apps and refrain from fighting in a gym. The OS would shutdown the spoofing app when there's limited resources, causing you to teleport back to your original location.

## Main Components
- A blank iOS project, used in Debug mode for `Simulate Location`
- A web interface made via Sinatra to interact with PokemonGo from [PokemonGoControllerSuite](https://github.com/adin283/PokemonGoControllerSuite/tree/master/PokemonGoController)
- An AppleScript for sending GPS location signals
- A pokemon map module forked from [PokemonMap] (https://github.com/AHAAAAAAA/PokemonGo-Map)

## System Requirement

- Xcode installed (Obviously you need a Mac, an Apple Developer Account is not needed if you have iOS 9 and above)
- Any iOS device with Pokemon GO installed
- Google Chrome as your browser

## Installation Instructions

### Start web servers

```bash
git clone https://github.com/huacnlee/PokemonGoMove.git
cd PokemonGoMoveAndMap/map
sudo easy_install pip # If you do not have pip
sudo pip install -r requirements.txt
sudo gem install sinatra
python example.py -a google -u [gmail_address] -p [gmail_password] -l "997 Marine Drive, San Fran, CA" -st 5 -ar 2 -dp -dg
```
See the [Map Readme](https://github.com/huacnlee/PokemonGoMove/blob/master/map/README.md) if you have any questions regarding the python arguments above.
You should see the following debug message:
```
[-] register_background_thread called
[-] register_background_thread: not running inside Flask so not starting thread
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
[-] register_background_thread called
[-] register_background_thread: initial registration
[+] Locale is en
 * Debugger is active!
[+] Getting initial location
 * Debugger pin code: 274-525-967
[!] Your given location: 997 Marine Drive, San Fran, CA
[!] lat/long/alt: 37.4029581 -121.9272423 0.0
[!] Google login for: derek@polarr.co
[+] RPC Session Token: eyJhbGciOiJSUzI1NiIsIZ ...
[+] Received API endpoint: https://pgorelease.nianticlabs.com/plfe/40/rpc
[+] Login successful
[+] Username: Derderyan
[+] You started playing Pokemon Go on: 2016-07-13 17:24:40
[+] POKECOIN: 0
[+] STARDUST: 6100
[-] looping: step 1 of 25
[+] Searching pokemons for location 37.4029581 -121.9272423
```
This will start the map server with your credentials, you can look at additional parameters in the [PokemonMap repo] (https://github.com/AHAAAAAAA/PokemonGo-Map) if you would like to ignore certain pokemons, change distance, etc. On your browser, localhost:5000 will look like the following:

<img width="1072" src=https://cloud.githubusercontent.com/assets/6434237/16943416/85ec5e40-4d50-11e6-99d3-abb4ec557701.png>

Now in a separate terminal, you need to start the move server
```
cd PokemonGoMoveAndMap
./start-web 
```

You should see the debug messages below:
```
== Sinatra (v1.4.7) has taken the stage on 3001 for development with backup from Puma
Puma starting in single mode...
* Version 3.4.0 (ruby 2.3.1-p112), codename: Owl Bowl Brawl
* Min threads: 0, max threads: 16
* Environment: development
* Listening on tcp://localhost:3001
Use Ctrl-C to stop
```

Now in your browser go to http://localhost:3001. The default location set by the move server will be based on your IP, so it will not be very accurate. Now go ahead and enter the address, to the address you set the map originally. See screencap below:
<img width="1072" src=https://cloud.githubusercontent.com/assets/6434237/16967597/8d5126d4-4dbe-11e6-9c06-3c91f38a8ea2.png>

Now your two servers are completely sync'd.

### Open foo.xcodeproj

Connect your iOS device and run the project. Remember in to turn simulate location on.
Very important: Debug->Simulate Location->PokemonLocation is checked, otherwise it will not work.

For the very first time of running the project, you will need to allow add terminal to be accessible. System Preferences > Security & Privacy > Privacy > Accessibility > Terminal (checked)

### Go back to localhost:3001

You can now interact with the webpage (try press left, up, right, down arrow keys on your keyboard) and the AppleScript will transmit the new GPS signal to the iOS device. Notice that the Pokemon map will also be updated but you will need to scroll to re-center the map.

### Start Playing!
- Enter an address
- Or enter GPS coordinates
- Press the arrow keys on the keyboard to move around
- Or move the map on the top right corner to move around
- Or click on the map on the top right corner to a location you want to walk to
- Look at all the pokemons, pokestops, gyms around you on the map at the bottom right corner

### Check if Pokemon Go servers are down

Sometimes you are wondering if you got banned or the servers are down. Check via this [link] (http://www.mmoserverstatus.com/pokemon_go)

### Other references
- Pokemon Rarity
  ![Rare](https://codeforx-photos.s3.amazonaws.com/08f53eda-bb36-4c52-8f9a-64cbfb3e0061_df36a6d5-cbff-47f3-a505-85dee758b400.jpeg)
