## Web3 Wallet Recovery App
Recover your web3 wallet using a mnemonic seed phrase. 

The application contains one home screen where the user can enter his mnemonic seed phrase to recover his address and private key. The user address is listed in modal components so far to fulfil the requirements of showing balance along with the address. Private keys are stored in keychains or keychain stores.

Currently, the Home screen contains only one Input to add 12-word phrases but we can provide 12 different input fields for that to give an intuitive interface to the user.

We can also provide better feedback for example adding toast if the wrong seed phrase is entered. Currently, we are showing only an error message.

## Tech Stack
- React Native
- React Native Paper

Furthermore, important packages used are ethers, ethereum-wallet and rn-nodify to deal with web3 blockchain networks for react native applications like this one and react-native-key-chains are used to store secure/api/sensitive keys.

Suggestions: We can go for EXPO GO to build fast in addition we can anytime eject back to `create-react-native-app`.

## Architecture
The root directory contains the `src` folder as the source directory. 
Inside src following directories are as follows
- components: contains screens components
- modules: contains reusable components like BottomTab
- packages: contains hooks, APIs and reusable methods
- redux: contains state management tools like redux

Each folder has its significance where it fulfils the code-separation concern while taking care of scalability. 

## Requirements

- Node version > 8
- React Native > 0.7
- JDK > 12
- SDK > 29

Specific devices will have specific emulator SDKs requirements and in order to run the app on the device we need to take care of it.

## How to run
- Clone the repository
- Make sure JDK and SDK are downloaded and installed in the decide
- Make sure Android Studio is installed with XCode and 
- Make both the emulators are installed
- Install packages using the `yarn` command
- Run `yarn run start` to run the app in the emulator
- Run `yarn run android` to create a build

Run yarn run clean to clean the gradle build in case nothing is working as expected

## Security 
Only one method is used in the repository currently is secure using react-native-key-chain. 

Recommended by [react-native docs](https://reactnative.dev/docs/security#storing-sensitive-info) to store secure keys in keychain services or keychains.

## ENV for sensitive keys 
I've also added a .env file in the root directory and the initial env setup with typescript is completed. All the API keys and URLs and sensitive keys should be added to the env file.

Env file will have 2/3 types both for production and development environment.

## Releasing
For the google play store, we need to sign the APK using the SHA256 key and upload the APK on the play store. 

For apple stores, first, we need a developer account followed by uploading a signed aab. 

We can use Over The Air update to directly release the javascript changes to the user's phone, bypassing the store review. Microsoft CodePush provides this service so far to my knowledge.

## References
For architechture and modules like react-native-paper, refer [this](https://github.com/shreyvijayvargiya/iHateReadingLogs/tree/main/TechLogsMobile) github repositories that contains my react-native examples and experiments
