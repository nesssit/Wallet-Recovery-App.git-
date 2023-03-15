Web3 Wallet Recovery App
Recover your web3 wallet using a mnemonic seed phrase.

The application contains one home screen where the user can enter his mnemonic seed phrase to recover his address and private key. The user address is listed in modal components so far to fulfil the requirements of showing balance along with the address. Private keys are stored in keychains or keychain stores.

Tech Stack
React Native
React Native Paper Furthermore, important packages used are ethers, ethereum-wallet and rn-nodify to deal with web3 blockchain networks for react native applications like this one and react-native-key-chains are used to store secure/api/sensitive keys.
Suggestions: We can go for EXPO GO to build fast in addition we can anytime eject back to create-react-native app.

Architecture
The root directory contains the src folder as the source directory.
Inside src following directories are as follows

components: contains screens components
modules: contains reusable components like BottomTab
packages: contains hooks, APIs and reusable methods
redux: contains state management tools like redux
Each folder has its significance where it fulfils the code-separation concern while taking care of scalability.

Security
Only one method is used in the repository currently is secure using react-native-key-chain.

Recommended by react-native docs to store secure keys in keychain services or keychains.

Releasing
For the google play store, we need to sign the APK using the SHA256 key and upload the APK on the play store.

For apple stores, first, we need a developer account followed by uploading a signed aab.

We can use Over The Air update to directly release the javascript changes to the user's phone, bypassing the store review. Microsoft CodePush provides this service so far to my knowledge.