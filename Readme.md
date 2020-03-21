## Description

This project has been bootstrapped using the react native cli as specified in the requirements. To run the app locally, do the following:

Drive Download Link: https://drive.google.com/drive/folders/1xqNwiqYt3ZrIxy7jhvvZtwSG2DUa1ECx?usp=sharing

## Deployment

#### Prerequisites for running the react-native app
- Install node v10.19.0. We have used node10 as specified in the doc.

#### Prerequisites for running the app in Android
- Ensure that java is setup properly. Else, install java8 jdk and set JAVA_HOME to the installed location
	
- Ensure that android sdk is setup properly. Else, download and install the sdk using https://developer.android.com/studio#downloads. Also, ensure that the ANDROID_HOME is correctly

	export ANDROID_HOME=$HOME/Library/Android/sdk
	export PATH=$PATH:$ANDROID_HOME/emulator
	export PATH=$PATH:$ANDROID_HOME/tools
	export PATH=$PATH:$ANDROID_HOME/tools/bin
	export PATH=$PATH:$ANDROID_HOME/platform-tools

#### Prerequisites for running the app in iOS
- Please install XCode. Also install Xcode Command Line Tools. 
- Install cocoapods using brew.

## Running the app 

Before running the app, let's start the mock server to serve mock data from the swagger.yaml that was shared. Make sure that the emulator/device in which the app is running has to be on the same network as of the mock server

#### Mock server
- Inside mock-server project, run
	* npm start
- Inside Ausweis project, change BASE_URL in src/api/Configuration.js to the ip of your localhost. 

#### Android
- Inside Ausweis project, run
	* yarn install
	* cd android
	* ./gradlew clean
	* cd ..
	* yarn android

#### iOS
- Inside Ausweis project, run
	* yarn install
	* cd ios
	* pod install
	* cd ..
	* yarn ios
