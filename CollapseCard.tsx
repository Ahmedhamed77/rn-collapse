import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {listData} from './data';

import Feather from 'react-native-vector-icons/Feather';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface RotateIconType {}

export const CollapseCard: React.FC<RotateIconType> = () => {
  const expand = useSharedValue(1);
  const opacity = useSharedValue(0);

  const [isExpanded, setIsExpanded] = useState(true);

  const onToggle = () => {
    expand.value = expand.value === 0 ? 1 : 0;
    setIsExpanded(prev => !prev);
  };

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(expand.value, [0, 1], [0, 90]);
    return {
      transform: [{rotate: `${rotation}deg`}],
    };
  });

  const expandButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: expand.value === 1 ? SCREEN_WIDTH * 0.33 : SCREEN_WIDTH * 0.3,
    };
  });

  const collapseContentStyle = useAnimatedStyle(() => {
    // TODO: move to dynamic height
    return {
      height: withTiming(expand.value === 1 ? 100 : 0, {
        duration: 320,
      }),

      opacity: withSpring(expand.value),
      overflow: 'hidden',
      transform: [{scale: withSpring(expand.value === 1 ? 1 : 0.95)}],
      marginBottom: withTiming(expand.value ? 12 : 0, {duration: 200}),
    };
  });

  return (
    <Animated.ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transactions</Text>
          <AnimatedPressable
            style={[styles.collapseButton, expandButtonAnimatedStyle]}
            onPress={onToggle}>
            <Text style={styles.collapseText}>
              {isExpanded ? 'Collapse' : 'Expand'}
            </Text>
            <Animated.View style={[iconStyle]}>
              <Feather name="chevron-right" size={24} color="black" />
            </Animated.View>
          </AnimatedPressable>
        </View>

        <Animated.View style={[collapseContentStyle, animatedOpacity]}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
            nesciunt est provident dolorum excepturi incidunt, aperiam tempora
            quos, nobis nihil non temporibus quisquam minus? Eos asperiores
            delectus vel sed in.
          </Text>
        </Animated.View>
      </View>

      <View style={{paddingHorizontal: 22}}>
        {listData.map(item => {
          return <ListItem item={item} key={item.id} />;
        })}
      </View>
    </Animated.ScrollView>
  );
};

interface ListItemProps {
  item: any;
}
export const ListItem: React.FC<ListItemProps> = ({item}) => {
  return (
    <View style={[styles.itemContainer]}>
      <View style={styles.itemLeftContainer}>
        <Image style={styles.itemImage} source={item.image} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={{color: 'gray'}}>{item.subTitle}</Text>
        </View>
      </View>
      <View>
        <Text
          style={[
            styles.itemPrice,
            {color: item.price > 0 ? 'green' : 'black'},
          ]}>
          {item.price > 0 ? '+' : ''}
          {item.price}€
        </Text>
        <Text style={styles.itemDate}>{item.category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    backgroundColor: '#eee6f0',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  collapseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 8,
    width: SCREEN_WIDTH * 0.3,
    height: 45,
    justifyContent: 'center',
  },
  collapseText: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,

    marginBottom: 10,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.5,
    elevation: 5,
  },
  itemLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  itemTextContainer: {
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  },
  itemDate: {
    color: 'gray',
  },
});
