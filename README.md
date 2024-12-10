# 🛠 survey-sync-react-native-sdk 

A React Native component designed by [Survey Sync](https://survey-sync.com) for seamlessly integrating surveys into your mobile applications.

## 🤔 How to start?
- Sign in to [Survey Sync](https://survey-sync.com)
- Create Survey;
- Publish Survey;
- Extract alias and follow the instruction below.
  ![](https://github.com/alikri/survey-sync-assets/blob/main/survey-alias.png)

## 🔧 Installation

### npm:

```sh
npm install survey-sync-react-native-sdk
```
or

```sh
npm install survey-sync-react-native-sdk --legacy-peer-deps 
```
‼️ Additional packages may need to be installed to ensure proper functionality

```sh
npm install @react-native-community/datetimepicker expo-document-picker react-native-modal-datetime-picker react-native-toast-message expo-clipboard
```


### yarn:

```sh
yarn add survey-sync-react-native-sdk
```

‼️ Additional packages may need to be installed to ensure proper functionality

```sh
yarn add @react-native-community/datetimepicker expo-document-picker react-native-modal-datetime-picker react-native-toast-message expo-clipboard

```

  
## 📖 Usage

```js
import Survey from 'survey-sync-react-native-sdk';

const App = () => {
  const theme = 'dark';
  const onFinishedSurvey = (respondentId: string) => {
    console.log('Survey finished with respondentId:', respondentId);
  };

  const alias = '7TRpmpzK' // your alias string 

  return (
    <Survey surveyAlias={alias} onFinishedSurvey={onFinishedSurvey} theme={theme} />
  );
};
```

## 🔗 Props
```
interface AppProps {
  surveyAlias: string;
  onFinishedSurvey?: (respondentId: string) => void;
  theme?: 'light' | 'dark';
}
```

## ⚙️ Typescript Settings:
If you encounter issues related to the 'moduleResolution' setting, add the following to your ```tsconfig.json```

```
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "resolvePackageJsonImports": false
  }
}
```


## 💻 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
