import React,{useState,useEffect} from "react";
import { View,StyleSheet,Text,FlatList,Image, ActivityIndicator } from 'react-native';

const App = () => {

const [data,setData] = useState([]);
const [isLoading,setIsLoading] = useState(false);
const [pageCurrent,setPageCurrent] = useState(1);

useEffect(() => {
  console.log("useeffect")
  console.log("useeffect pagecurrent",pageCurrent)
  setIsLoading(true)
  this.getData()
  return () => {

  }
},[pageCurrent])

getData = async () => {
  console.log("getData")
  const apiURL = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1" + pageCurrent
  fetch(apiURL).then((res) => res.json())
  .then((resJson) => {
    setData(data.concat(resJson))
    setIsLoading(false)
  })
}

renderItem = ({item}) => {
  return (
    <View style={styles.itemRow}>
      <Image source={{uri:item.url}} style={styles.itemImage}/>
      <Text style={styles.itemText}>{item.title}</Text>
      <Text style={styles.itemText}>{item.id}</Text>
    </View>
  )
}

renderFooter = () => {
  return (
    isLoading ? 
    <View style={styles.loader}>
      <ActivityIndicator size="large"/>
    </View>:null
  )
}

handleLoadMore = () => {
  console.log("handleLoadMore")
  setPageCurrent(pageCurrent + 1)
  setIsLoading(true)
}

  return (
    <FlatList
    style={styles.container}
    data={data}
    renderItem={this.renderItem}
    keyExtractor={(item,index) =>index.toString()}
    ListFooterComponent={this.renderFooter}
    onEndReached={this.handleLoadMore}
    onEndReachedThreshold={0}
    />
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    backgroundColor:'#f5fcff'
  },
  itemRow:{
    borderBottomColor:'#ccc',
    marginBottom:10,
    borderBottomWidth:1
  },
  itemImage:{
    width:'100%',
    height:200,
    resizeMode:'cover'
  },
  itemText:{
    fontSize:16,
    padding:5
  },
  loader:{
    marginTop:10,
    alignItems:'center'
  }
})

