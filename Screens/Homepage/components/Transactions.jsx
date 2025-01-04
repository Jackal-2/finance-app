import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const Transactions = ({ transactionData, renderTransactions }) => {
  return (
    <>
      <View style={styles.transactionView}>
        <Text style={styles.transactionText}>Transactions</Text>
      </View>
      <View style={{ height: 500, paddingHorizontal: 5 }}>
        <View style={{ marginBottom: 130 }}>
          <FlatList
            data={transactionData}
            renderItem={renderTransactions}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.transactionList}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
export default Transactions;
