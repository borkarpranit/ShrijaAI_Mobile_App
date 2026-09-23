import { StyleSheet, View } from "react-native";

type ShrijaSuggestionsProps = {
  onSelect: (text: string) => void;
};

export default function ShrijaSuggestions({
  onSelect,
}: ShrijaSuggestionsProps) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});