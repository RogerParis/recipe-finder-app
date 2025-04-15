import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HeaderButton } from '@/components/common/header_button.component';

import heartSparkleAnimation from '@/assets/lottie/heart-sparkle.json';
import { Meal } from '@/store/meals/types';
import { useMealStore } from '@/store/meals/useMealStore';
import { COLORS } from '@/theme/colors';
import LottieView from 'lottie-react-native';

const FavoriteToggleButton = ({ meal }: { meal: Meal }) => {
  const { isMealFavorite, toggleFavoriteMeal } = useMealStore();
  const isFavorite = isMealFavorite(meal.idMeal);
  const sparkleRef = useRef<LottieView>(null);
  const [showSparkle, setShowSparkle] = useState(false);

  const handlePress = () => {
    // toggle favorite
    toggleFavoriteMeal(meal);

    // trigger sparkle animation if favoriting
    if (!isFavorite) {
      setShowSparkle(true);
      sparkleRef.current?.play();
      setTimeout(() => setShowSparkle(false), 1000);
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      <HeaderButton
        icon="heart"
        color={isFavorite ? COLORS.red : COLORS.white}
        onPress={handlePress}
      />
      {showSparkle && (
        <LottieView
          source={heartSparkleAnimation}
          autoPlay={true}
          loop={false}
          style={styles.sparkle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sparkle: {
    position: 'absolute',
    top: -33,
    left: -35,
    width: 90,
    height: 90,
    pointerEvents: 'none',
  },
});

export default FavoriteToggleButton;
