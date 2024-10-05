import { StyleSheet, Text, View } from "react-native";
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
    <>
      <FormControl
        w="85%"
        maxW="container"
        isRequired
        isInvalid={!data.section}
      >
        <FormControl.Label>Choose Section</FormControl.Label>
        <Select
          minWidth="200"
          accessibilityLabel="Choose Section"
          placeholder="Choose Section"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={3} />,
          }}
          mt="1"
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
          w="85%"
          maxW="container"
          isRequired
          isInvalid={!data.category}
        >
          <FormControl.Label>Choose Category</FormControl.Label>
          <Select
            minWidth="200"
            accessibilityLabel="Choose Section"
            placeholder="Choose Section"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={2} />,
            }}
            mt="1"
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
    </>
  );
}

const styles = StyleSheet.create({});
