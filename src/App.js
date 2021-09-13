
import './App.css';
import { BsCaretDownFill,BsCaretUpFill,BsFillPauseFill,BsFillPlayFill,BsArrowRepeat } from 'react-icons/bs';
import React from 'react';

const audio =document.getElementById('beep');
const SetTimer=(props)=>{
  const id= props.title.toLowerCase();
  return(
<div className='timer-container'>
  <h2 id={`${id}-label`}>{`${props.title} Length`}</h2>
  <div className='flex action-wrapper'>
      <button onClick={props.handleDecrease} id={`${id}-decrement`}><BsCaretDownFill /></button>
    <span id={`${id}-length`}>{props.count}</span>
    <button onClick={props.handleIncrease} id={`${id}-increment`}><BsCaretUpFill /></button>
  </div>
</div>

  );}

class App extends React.Component {
  constructor(props){
    super(props);
    this.loop=undefined;
  }
  componentWillUnmount(){
    clearInterval(this.loop);
  }
  state ={
    breakCount:5,
    sessionCount:25,
    clockCount:25*60,
     currentTimer:'Session',
     loop:undefined,
     isPlaying:false
  }

  

  handlePlayPause=()=>{
    const {isPlaying}=this.state;
    if(isPlaying){
      clearInterval(this.loop);
      this.setState({isPlaying:false});
    }else{
    this.setState({isPlaying:true});
    this.loop=setInterval(() => {
      const {clockCount,currentTimer,breakCount,sessionCount}=this.state;
      if(clockCount===0){
        this.setState({currentTimer:currentTimer==="Session"?"Break":"Session",
      clockCount:(currentTimer==='Session')?(breakCount*60):(sessionCount*60)
    })
    audio.play();
      }else{
      this.setState({clockCount:clockCount-1})
    }
    }, 1000);
  }}

  handleReset =() =>{
    this.setState({
      breakCount:5,
   sessionCount:25,
   clockCount:25*60,
    currentTimer:'Session',
    isPlaying:false
    });
    clearInterval(this.loop);
    audio.pause();
    audio.currentTime=0;
  }
  
 
convertToTime=(count)=>{
let minutes=Math.floor(count/60);
let second=count%60;
minutes=minutes < 10? ('0'+ minutes) :minutes;
second=second < 10? ('0'+second) :second;
  return`${minutes}:${second}`;
}

handleBreakDecrease=()=>{
const {breakCount,isPlaying,currentTimer}=this.state;

if(breakCount>1){

  if(!isPlaying &&currentTimer==='Break'){
  this.setState({
    breakCount:breakCount-1,
    clockCount:(breakCount-1)*60
      });
  }else{
  this.setState({breakCount:breakCount-1})
    }
  }
}
handleBreakIncrease=()=>{
  const {breakCount,isPlaying,currentTimer}=this.state;
  
if(breakCount<60){

  if(!isPlaying &&currentTimer==='Break'){
  this.setState({
    breakCount:breakCount+1,
    clockCount:(breakCount+1)*60
      });
  }else{
  this.setState({breakCount:breakCount+1})
    }
  }
}
handleSessionDecrease=()=>{
  const {sessionCount,isPlaying,currentTimer}=this.state;
 
if(sessionCount>1){

  if(!isPlaying &&currentTimer==='Session'){
  this.setState({
    sessionCount:sessionCount-1,
    clockCount:(sessionCount-1)*60
      });
  }else{
  this.setState({sessionCount:sessionCount-1})
    }
  }
}
handleSessionIncrease=()=>{
  const {sessionCount,isPlaying,currentTimer}=this.state;
 
if(sessionCount<60){

  if(!isPlaying &&currentTimer==='Session'){
  this.setState({
    sessionCount:sessionCount+1,
    clockCount:(sessionCount+1)*60
      });
  }else{
  this.setState({sessionCount:sessionCount+1})
    }
  }
}
  render (){
    const {breakCount,sessionCount,clockCount,currentTimer}=this.state;
const breakProps={
  title:'Break',
  count:breakCount,
  handleDecrease:this.handleBreakDecrease,
  handleIncrease:this.handleBreakIncrease
}
const sessionProps={
  title:'Session',
  count:sessionCount,
  handleDecrease:this.handleSessionDecrease,
  handleIncrease:this.handleSessionIncrease
}

  return (
    <div className="App">
      <header className="App-header">
        <div className='flex'>
<SetTimer {...breakProps}/>
<SetTimer {...sessionProps}/>
        </div>

        <div className='clock-container'>
          <h2 id="timer-label">{currentTimer}</h2>
    <span id="time-left">{this.convertToTime(clockCount)}</span>
    
    <div className='flex'>
      <button onClick={this.handlePlayPause} id='start_stop'><BsFillPlayFill /><BsFillPauseFill /></button>
    <button onClick={this.handleReset} id="reset"><BsArrowRepeat /></button>
      </div>
    </div>
      </header>
    </div>
  );
}}

export default App;
