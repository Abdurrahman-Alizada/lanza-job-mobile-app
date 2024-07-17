import { TouchableOpacity, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ContractorHomeScreenAppbar from '../../../components/Appbars/ContractorHomeScreenAppbar';

const ContractorHomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const cards = [
    { icon: "chart-box-outline", title: "Dashbaord", navigateTo: "ContractorDashboard" },
    { icon: "book-open-outline", title: "Planning", navigateTo: "ContractorPlanning" },
    { icon: "shopping-outline", title: "Businesses", navigateTo: "ContractorBusinesese" },
    { icon: "folder-open-outline", title: "Projects", navigateTo: "ContractorProjects" },
    { icon: "credit-card-outline", title: "Checkouts", navigateTo: "ContractorCheckouts" },
    { icon: "account-group", title: "Flexpool", navigateTo: "ContractorFlexpool" }
  ]

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ContractorHomeScreenAppbar />

      <View style={{ flexWrap: "wrap", paddingVertical: "5%", flexDirection: "row", justifyContent: "space-evenly" }}>
        {cards.map((card, index) =>
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(card.navigateTo)}
            style={{
              height: 132,
              width: '42%',
              marginTop: "4%",
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              borderWidth: 0.3,
              borderColor: theme.colors.onBackground
            }}>
            <Avatar.Icon
              icon={card.icon}
              style={{ backgroundColor: theme.colors.lightBlue, alignSelf: 'center' }}
              size={60}
              color={theme.colors.onBackground}
            />
            <Text
              style={{
                marginTop: '6%',
                fontWeight: 'bold',
                textAlign: "center",
                fontSize: 16
              }}>
              {card.title}
            </Text>
          </TouchableOpacity>
        )}


      </View>

    </View>
  );
};

export default ContractorHomeScreen;
