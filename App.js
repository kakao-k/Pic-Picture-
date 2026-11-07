import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, TextInput, StatusBar, StyleSheet, Dimensions } from 'react-native';

const purple = '#B58AFF';
const bg = '#100D18';
const card = '#211A30';
const width = Dimensions.get('window').width;
const photos = [
  {id:1, user:'@luna', title:'Ночной город', uri:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800'},
  {id:2, user:'@pixel', title:'Горы и облака', uri:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'},
  {id:3, user:'@flora', title:'Цветы', uri:'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800'},
  {id:4, user:'@sky', title:'Закат', uri:'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=800'},
];
const fasties = [
  {id:'f1',user:'@pixel',title:'Моменты ночного города 🌃',uri:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900',type:'GIF • демо'},
  {id:'f2',user:'@sky',title:'Красота природы 🌄',uri:'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=900',type:'Видео • превью'},
];
export default function App() {
  const [tab,setTab] = useState('Fasty');
  const [likes,setLikes] = useState({});
  const [saved,setSaved] = useState({});
  const [query,setQuery] = useState('');
  const [commentFor,setCommentFor] = useState(null);
  const [comment,setComment] = useState('');
  const [comments,setComments] = useState({});
  const toggle=(setter,values,id)=>setter({...values,[id]:!values[id]});
  const likeButton=(id)=><TouchableOpacity onPress={()=>toggle(setLikes,likes,id)}><Text style={styles.action}>{likes[id]?'💜':'♡'} {likes[id]?'1':'0'}</Text></TouchableOpacity>;
  const commentButton=(id)=><TouchableOpacity onPress={()=>setCommentFor(commentFor===id?null:id)}><Text style={styles.action}>💬 {(comments[id]||[]).length}</Text></TouchableOpacity>;
  const commentArea=(id)=>commentFor===id?<View style={styles.commentBox}><TextInput style={styles.input} placeholder="Напиши комментарий..." placeholderTextColor="#9A91A9" value={comment} onChangeText={setComment}/><TouchableOpacity onPress={()=>{if(comment.trim()){setComments({...comments,[id]:[...(comments[id]||[]),comment.trim()]});setComment('');}}}><Text style={styles.send}>Отправить</Text></TouchableOpacity>{(comments[id]||[]).map((c,i)=><Text key={i} style={styles.muted}>Ты: {c}</Text>)}</View>:null;
  return <SafeAreaView style={styles.root}><StatusBar barStyle="light-content" backgroundColor={bg}/>
    <View style={styles.header}><Text style={styles.logo}>Pic-Picture <Text style={{fontSize:12}}>✦ DEMO</Text></Text><Text style={{color:purple,fontSize:21}}>◉</Text></View>
    {tab==='Pho-To' && <TextInput style={[styles.input,{marginHorizontal:14,marginBottom:8}]} placeholder="Поиск по картинкам..." placeholderTextColor="#9A91A9" value={query} onChangeText={setQuery}/>}
    <ScrollView key={tab} style={{flex:1}} contentContainerStyle={{paddingBottom:25}}>
      {tab==='Fasty' && <><Text style={styles.section}>Fasty <Text style={styles.muted}>• короткие видео и GIF</Text></Text>{fasties.map(p=><View key={p.id} style={styles.fasty}><Image source={{uri:p.uri}} style={styles.fastyImage}/><View style={styles.overlay}><Text style={styles.tag}>{p.type}</Text><Text style={styles.user}>{p.user}</Text><Text style={styles.caption}>{p.title}</Text><View style={styles.actions}>{likeButton(p.id)}{commentButton(p.id)}</View>{commentArea(p.id)}</View></View>)}<Text style={styles.hint}>В демо показаны изображения-превью. Настоящее воспроизведение видео и GIF добавим в следующей версии.</Text></>}
      {tab==='Pho-To' && <><Text style={styles.section}>Pho-To <Text style={styles.muted}>• вдохновение</Text></Text><View style={styles.grid}>{photos.filter(p=>(p.title+p.user).toLowerCase().includes(query.toLowerCase())).map((p,i)=><View key={p.id} style={styles.tile}><Image source={{uri:p.uri}} style={{width:'100%',height:i%2?210:165,borderRadius:14}}/><Text style={styles.tileTitle}>{p.title}</Text><Text style={styles.muted}>{p.user}</Text><View style={styles.actions}>{likeButton(p.id)}<TouchableOpacity onPress={()=>toggle(setSaved,saved,p.id)}><Text style={styles.action}>{saved[p.id]?'🔖 Сохранено':'♧ Сохранить'}</Text></TouchableOpacity></View></View>)}</View></>}
      {tab==='In Is' && <><Text style={styles.section}>In Is <Text style={styles.muted}>• публикации друзей</Text></Text>{photos.map(p=><View key={p.id} style={styles.post}><Text style={styles.user}>● {p.user}</Text><Image source={{uri:p.uri}} style={styles.postImage}/><View style={styles.postBody}><View style={styles.actions}>{likeButton('i'+p.id)}{commentButton('i'+p.id)}</View><Text style={styles.caption}>{p.title} ✨</Text>{commentArea('i'+p.id)}</View></View>)}</>}
      {tab==='Профиль' && <View style={styles.profile}><View style={styles.avatar}><Text style={{fontSize:35}}>💜</Text></View><Text style={styles.profileName}>@pic_user</Text><Text style={styles.muted}>Добро пожаловать в Pic-Picture!</Text><View style={styles.stats}><Text style={styles.stat}>0 публикаций</Text><Text style={styles.stat}>0 подписчиков</Text><Text style={styles.stat}>0 подписок</Text></View><Text style={styles.hint}>Это демоверсия: аккаунты и загрузка публикаций появятся позже.</Text></View>}
    </ScrollView>
    <View style={styles.nav}>{[['Fasty','▶'],['Pho-To','▦'],['In Is','◎'],['Профиль','♙']].map(([name,icon])=><TouchableOpacity key={name} style={styles.navItem} onPress={()=>{setTab(name);setCommentFor(null);}}><Text style={[styles.navIcon,tab===name&&{color:purple}]}>{icon}</Text><Text style={[styles.navText,tab===name&&{color:purple}]}>{name}</Text></TouchableOpacity>)}</View>
  </SafeAreaView>;
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:bg},header:{height:55,paddingHorizontal:16,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#33283D'},logo:{fontSize:23,fontWeight:'900',color:purple},section:{color:'white',fontWeight:'800',fontSize:22,margin:14},muted:{color:'#A9A0B7',fontSize:12,fontWeight:'400'},fasty:{height:Math.min(width*1.25,500),marginHorizontal:14,marginBottom:16,borderRadius:18,backgroundColor:card,overflow:'hidden'},fastyImage:{width:'100%',height:'100%',position:'absolute'},overlay:{flex:1,justifyContent:'flex-end',padding:16,backgroundColor:'rgba(0,0,0,0.23)'},tag:{alignSelf:'flex-start',backgroundColor:'#442B68',color:'#FFF',paddingHorizontal:10,paddingVertical:5,borderRadius:12,marginBottom:8,fontSize:12},user:{color:'white',fontSize:16,fontWeight:'800',marginBottom:7},caption:{color:'white',fontSize:15,marginBottom:9},actions:{flexDirection:'row',alignItems:'center',gap:18,marginTop:6},action:{color:'white',fontSize:15,fontWeight:'600'},hint:{color:'#B9AEC8',paddingHorizontal:18,paddingVertical:12,textAlign:'center',lineHeight:20},grid:{paddingHorizontal:10,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},tile:{width:'48%',backgroundColor:card,borderRadius:16,padding:7,marginBottom:12},tileTitle:{color:'white',fontWeight:'700',marginTop:8,marginBottom:3},post:{backgroundColor:card,marginHorizontal:12,marginBottom:18,borderRadius:16,overflow:'hidden'},postImage:{width:'100%',height:290},postBody:{padding:14},input:{backgroundColor:'#2D233A',color:'white',borderRadius:12,paddingHorizontal:13,paddingVertical:10,flex:1},commentBox:{backgroundColor:'#22182E',padding:10,borderRadius:10,marginTop:10},send:{color:purple,fontWeight:'bold',marginVertical:10},profile:{alignItems:'center',padding:22},avatar:{width:90,height:90,borderRadius:45,backgroundColor:'#39234F',alignItems:'center',justifyContent:'center',marginTop:24},profileName:{color:'white',fontSize:25,fontWeight:'900',marginVertical:14},stats:{flexDirection:'row',gap:13,marginVertical:25},stat:{color:'white',fontSize:12,backgroundColor:card,padding:10,borderRadius:10},nav:{height:67,borderTopWidth:1,borderColor:'#33283D',flexDirection:'row',justifyContent:'space-around',alignItems:'center'},navItem:{alignItems:'center',flex:1},navIcon:{color:'#A79DAF',fontSize:24},navText:{color:'#A79DAF',fontSize:11,marginTop:3}});
    
