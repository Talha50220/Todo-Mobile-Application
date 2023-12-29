import React from 'react';
import { Image, View } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const YourImageComponent = ({ source }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={source}
        style={{ width: 200, height: 200, marginBottom: 20 }} // adjust the style as needed
      />
    </View>
  );
};

const OnBoardingScreen = ({ navigation }) => {
  const onDone = () => {
    // Navigate to the signup screen when onboarding is completed
    navigation.navigate('SignUp');
  };

  const pages = [
    {
      backgroundColor: '#6499ED',
      title: 'TODO-LIST APP',
      image: <YourImageComponent source={require("../../assets/SocialMediaIcons/OnBoardingScreenn1.png")} />,
      subtitle: 'Welcome' ,
      description: 'Description of the first screen.',
    },
    {
      backgroundColor: '#6499ED',
      image: <YourImageComponent source={require("../../assets/SocialMediaIcons/OnBoardingScreenn2.png")} />,
      title: 'ADD YOUR DAILY TASK TO COMPLETE',
      subtitle: 'TODO-LIST APP TO ADD TASKS.',
    },
    {
      backgroundColor: '#6499ED',
      image: <YourImageComponent source={require("../../assets/SocialMediaIcons/OnBoardingScreenn3.png")} />,
      title: 'Get Started',
      subtitle: 'READY TO MARK YOUR DAILY TODO-LIST',
    },
  ];

  return (
    <Onboarding
      onDone={onDone}
      pages={pages}
      showSkip={false}
      controlStatusBar={false}
    />
  );
};

export default OnBoardingScreen;
