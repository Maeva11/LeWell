import { Button, StyleSheet, Text, View, TextInput, Image} from 'react-native';
import TitleAppli from './Components/TitleAppli';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <TitleAppli></TitleAppli>     
      </Text>
      <View style ={styles.container2}>
        <View style ={styles.subcontainer2}>
        <Text style={styles.title2}>
          Titre de la publication    
        </Text>
        <TextInput
        style={styles.input}
      />
        </View>
      </View>
      <View style ={styles.container3}>
        <Text style={styles.title2}>
          Détail de la publication    
        </Text>
        <TextInput
        style={styles.input2}
      />
        <Button
          title="Choisir une photo"/>
          <Image
        style={styles.tinyLogo}
        source={require('./assets/téléchargement.jpeg')}
      />
      </View>
    </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#3498DB",
    flex:1, 
  }, 
  container2: {
    backgroundColor:"white",
    flex:1, 
  }, 
  container3: {
    backgroundColor:"white",
    flex:3, 
  }, 
 
  title: {
    color: '#FFF',
    textAlign :'center',
    fontSize :"50px",
    flex:1, 
  },
  input : {
    flex: 4
  },
  title2: {
    backgroundColor : "#AED6F1", 
    textAlign: 'center', 
    fontSize: "30px", 
    flex : 1
  }, 
  input2 : {
    flex : 1
  }, 

  button : {
    flex : 4
  }, 
  tinyLogo : {
    width : "150", 
    height: "350", 
    flex :3
  }
});
