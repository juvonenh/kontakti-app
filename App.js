import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        // pageSize: 10,
      });
      if (data.length > 0) {
        // console.log(data);
        setContact(data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Contacts" onPress={getContacts} />
      <FlatList
        data={contact}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { name, phoneNumbers } = item;
          return (
            <Text>{`${name} ${
              phoneNumbers ? phoneNumbers[0].number : "(no phonenumber)"
            }`}</Text>
          );
        }}
        ListEmptyComponent={<Text>Get some contacts!</Text>}
      />
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
