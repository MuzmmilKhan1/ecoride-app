import { View, StyleSheet, } from "react-native";
import tw, { style } from 'twrnc';

const Card = ({ children, bg = "#eeeeee",flex="flex flex-col",
justify = "justify-center", align = " items-center", cardClass = "p-2", cardBg = "" }) => {
    return(
        <View style={tw`bg-[${bg}]
        ${flex} ${justify} ${align} ${cardClass}`}>
        <View style={[
        tw`y-6 w-full p-6 m-6`,
        styles.card,
        cardBg !== "" ? { backgroundColor: cardBg } : { backgroundColor: "white" },
        ]}>
            {children}
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
      width: "100%",
      borderRadius: 8,
      padding: 16,
      margin: 8,
      borderWidth: 0,
      elevation: 10,
    },
    image:{
      width: 150,
      height: 150,
      resizeMode: 'contain'
    }
  });

export default Card;