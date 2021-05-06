import React, {useRef, useState, useReducer, useEffect} from 'react';
import './Barrage.css';
import BarrageItem from './BarrageItem/BarrageItem';
/**
 * useEffect内部用了到了外界的变量，那么我应该是将外界变量声明在useEffect内部还是外部呢？
 */
const data = [
  {value: "弹幕1", status: "stop"},
  {value: "弹幕2", status: "stop"},
  {value: "弹幕3", status: "stop"},
  {value: "弹幕4", status: "stop"},
  {value: "弹幕5", status: "stop"},
  {value: "弹幕6", status: "stop"},
  {value: "弹幕7", status: "stop"},
  {value: "弹幕8", status: "stop"},
  {value: "弹幕9", status: "stop"}];
const initialState = {
  barrageData: data.slice(0, 5),
  num: 0
}

function reducer(state, action) {
  const data = action.data;
  const findIdle = (idleQueue) => {
    for(let i = 0;i < idleQueue.length;i++) {
      if(idleQueue[i].status === 'stop') {
        return i;
      }
    }
    return -1;
  }
  switch (action.type) {
    case 'add': 
      let temp = [...state.barrageData];
      const num = state.num;
      
      if(num >= data.length) {
        return state;
      }
      if(num >= state.barrageData.length) {
        const i = findIdle(state.barrageData);
        if(i !== -1) {
          /**
           * 这里采用将data修改后再赋值
           */
          data[num].status = 'move';
          temp[i] = data[num];
          /**
           * 如果这里像下方一样操作会导致num无法递增
           */
          // temp[i].status = data[num].status;
          console.log(temp[i], "numnum", i);
          return {num: num + 1, barrageData: temp};
        } else {
          return state;
        }
      }
      
      if(num < temp.length){
        temp[state.num].status = 'move';
      }
      
      return {num: num + 1, barrageData: temp};
    case 'release':
      const tempRelease = [...state.barrageData];
      tempRelease[action.index].status = 'stop';
      return {...state, barrageData: tempRelease};
    
  }
}
export default function Barrage(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {num, barrageData} = state;
  const barrageWrapperRef = useRef();
  let timer = useRef();
  
  const animationEnd = (index) => {
    dispatch({type: 'release', index});
  }

  useEffect(() => {
    console.log(barrageWrapperRef);
    timer.current = setInterval(() => {
      dispatch({type: 'add', data});
    }, 1000)
    
    return () => {
      clearInterval(timer.current);
      console.log("release resource");
    }
  }, [])
  console.log("render");
  return (
    <div className="container" ref={barrageWrapperRef}>
      {
        barrageData.map((item, i) => {
          return (
            <BarrageItem animationEnd={animationEnd} index={i} state={item.status} key={i} content={item.value} />
          )
        })
      }
    </div>
  )
}
