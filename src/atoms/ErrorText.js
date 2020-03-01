import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const TitleField = (ErrorStatus,error) => {
  return (
    <View>    
        {ErrorStatus == true ? (
            <Text style={styles.errorText}>{error}</Text>
        ) : null}
    </View>

  );
};

export default TitleField;

const styles = StyleSheet.create({
    errorText: {
        fontWeight: 'bold',
        top: 10,
        color: 'rgb(230, 0, 0)',
        fontSize: 18,
        textAlign: 'center',
        textShadowColor: '#FFFFFF',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
      },
});
