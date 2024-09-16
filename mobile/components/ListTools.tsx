import { StyleSheet } from 'react-native'
import React from 'react'
import FlatLists from './FlatLists'

export default function ListTools() {
  return (
    <>
      <FlatLists
        data={{
          title: "Tools",
          data: [...new Array(5).keys()],
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({})