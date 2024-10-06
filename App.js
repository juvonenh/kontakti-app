import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contact, setContact] = useState([]);
  // console.log(contact);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        pageSize: 10,
      });
      if (data.length > 0) {
        console.log(data);
        setContact(data);
        // console.log(data[0]);
        // setContact(data[0]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contact}
        renderItem={({ item }) => (
          <Text>
            {item.name} {[item.phoneNumbers[0].number]}
          </Text>
        )}
      />
      {/* <Text>
        {contact.name} {[contact.phoneNumbers[0].number]}
      </Text> */}
      <Button title="Get Contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 50,
  },
});
