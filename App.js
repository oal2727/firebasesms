import React from 'react';
import {
  View,
  Text
} from 'react-native';
import PhoneSignIn from "./src/PhoneAuth"


const App = () => {

  return (
   <View style={{marginTop:50}}>
     <PhoneSignIn/>
     </View>
  );
};


export default App;
