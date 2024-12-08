import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DescriptionTextLook from './FinalPageComponents/DescriptionTextLook/DescriptionTextLook';
import HeaderTextLook from './FinalPageComponents/HeaderTextLook/HeaderTextLook';
import RedirectButtonLook from './FinalPageComponents/RedirectButtonLook/RedirectButtonLook';
import UniquePromoLook from './FinalPageComponents/UniquePromoLook/UniquePromoLook';
import { createStyles } from './finalPage.styles';
import { useAppTheme } from '../../context/ThemeContext';
import { FinalPagePropertyName } from '../../types/enums';
import type { FinalPageRequestData } from '../../types/types';
import CopyLinkLook from './FinalPageComponents/CopyLinkLook/CopyLinkLook';

interface FinalPageProps {
  finalPageData?: FinalPageRequestData[];
  respondentId: string;
  userLogo?: string | null;
}

const DefaultThankYouScreen = () => {
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MaterialIcons
          name="check-circle"
          size={60}
          color={theme.status.success}
        />
        <Text style={styles.title}>Thank you!</Text>
        <Text style={styles.subtitle}>We're grateful for your feedback</Text>
      </View>
    </View>
  );
};

const CustomFinalPage = ({ finalPageData, respondentId }: FinalPageProps) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);
  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        {finalPageData &&
          finalPageData.map((element, index) => {
            switch (element.type) {
              case FinalPagePropertyName.HEADER:
                return <HeaderTextLook text={element.text} key={index} />;
              case FinalPagePropertyName.DESC:
                return <DescriptionTextLook text={element.text} key={index} />;
              case FinalPagePropertyName.LINK:
                return <CopyLinkLook text={element.text} key={index} />;
              case FinalPagePropertyName.REDIRECT:
                return (
                  <RedirectButtonLook
                    text={element.text}
                    redirectUrl={element?.redirectUrl}
                    key={index}
                  />
                );
              case FinalPagePropertyName.PROMO:
                return <UniquePromoLook text={respondentId} key={index} />;
              default:
                return null;
            }
          })}
      </View>
    </View>
  );
};

export const FinalPage = ({
  finalPageData,
  respondentId,
  userLogo,
}: FinalPageProps) => {
  if (!finalPageData) {
    return <DefaultThankYouScreen />;
  }

  return (
    <CustomFinalPage
      finalPageData={finalPageData}
      respondentId={respondentId}
      userLogo={userLogo}
    />
  );
};

export default FinalPage;
