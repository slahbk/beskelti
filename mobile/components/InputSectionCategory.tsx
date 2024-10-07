import { StyleSheet, View } from "react-native";
import React from "react";
import {
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
} from "native-base";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function InputSectionCategory({ data, setData }: any) {
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const isDarkText = Colors[useColorScheme() ?? "light"].text;

  return (
    <View style={styles.container}>
      <FormControl
        style={styles.formControl}
        isRequired
        isInvalid={!data.section}
      >
        <FormControl.Label>Choose Section</FormControl.Label>
        <Select
          accessibilityLabel="Choose Section"
          placeholder="Choose Section"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={3} />,
          }}
          onValueChange={(value: any) => setData({ ...data, section: value })}
          color={isDarkText}
        >
          <Select.Item label="Bikes" value="Bikes" />
          <Select.Item label="Accessories" value="Accessories" />
          <Select.Item label="Tools" value="Tools" />
        </Select>
        {data.section === "" && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      {data.section === "Bikes" && (
        <FormControl
          style={styles.formControl}
          isRequired
          isInvalid={!data.category}
        >
          <FormControl.Label>Choose Category</FormControl.Label>
          <Select
            accessibilityLabel="Choose Category"
            placeholder="Choose Category"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={2} />,
            }}
            onValueChange={(value: any) =>
              setData({ ...data, category: value })
            }
            color={isDarkText}
            selectedValue={data.category}
          >
            <Select.Item label="Normal" value="normal" />
            <Select.Item label="Electric" value="electric" />
          </Select>
          {data.category === "" && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please make a selection!
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
  },
  formControl: {
    marginBottom: 16,
  },
});
