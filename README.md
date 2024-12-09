# survey-sync-react-native-sdk

A React Native component designed by [Survey Sync](https://survey-sync.com) for seamlessly integrating surveys into your mobile applications.

## How to start?
- Sign in to [Survey Sync](https://survey-sync.com)
- Create Survey;
- Publish Survey;
- Extract alias and follow the instruction below.
  ![](https://github.com/alikri/survey-sync-assets/blob/main/survey-alias.png)

## Installation

```sh
npm install survey-sync-react-native-sdk
```
  
## Usage

```js
import { Survey } from 'survey-sync-react-native-sdk';

const App = () => {
  const theme = 'dark';
  const onFinishedSurvey = (respondentId: string) => {
    console.log('Survey finished with respondentId:', respondentId);
  };

  const aliasString = '7TRpmpzK' // your alias string 

  return (
    <Survey surveyAlias={aliasString} onFinishedSurvey={onFinishedSurvey} theme={theme} />
  );
};
```

## Props
```
interface AppProps {
  surveyAlias: string;
  onFinishedSurvey?: (respondentId: string) => void;
  theme?: 'light' | 'dark';
}
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
