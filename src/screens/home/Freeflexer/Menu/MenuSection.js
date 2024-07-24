import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { List } from 'react-native-paper';

const MenuSection = ({ sectionTitle, items }) => {
    const navigation = useNavigation();
    return (
        <List.Section style={{}}>
            {
                sectionTitle &&
                <List.Subheader>{sectionTitle}</List.Subheader>
            }
            {
                items.map((item, index) =>
                    <List.Item onPress={() => navigation.navigate(item.navigateTo)} key={index} title={item.title} left={() => <List.Icon icon={item.icon} />} />
                )
            }

        </List.Section>
    );
}

export default MenuSection;