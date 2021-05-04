import React, {useRef, useState, useReducer, useEffect} from 'react';
import './Barrage.css';
import BarrageItem from './BarrageItem/BarrageItem';
/**
 * useEffect内部用了到了外界的变量，那么我应该是将外界变量声明在useEffect内部还是外部呢？
 */
const initialState = {
  barrageData: [
    {value: "弹幕1", status: "stop"},
    {value: "弹幕2", status: "stop"},
    {value: "弹幕3", status: "stop"},
    {value: "弹幕4", status: "stop"},
    {value: "弹幕5", status: "stop"},
    {value: "弹幕6", status: "stop"},
    {value: "弹幕7", status: "stop"},
    {value: "弹幕8", status: "stop"},
    {value: "弹幕9", status: "stop"}],
  num: 0
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': 
      if(state.barrageData.length === 2) {
        return {num: state.num, barrageData: state.barrageData};
      }
      const temp = [...state.barrageData];
      temp[state.num].status = 'move';
      return {num: state.num + 1, barrageData: temp};
  }
}
export default function Barrage(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {num, barrageData} = state;

  useEffect(() => {
    let num = 0;
    let timer = setInterval(() => {
      dispatch({type: 'add'});
      num++;
      if(num >= initialState.barrageData.length) {
        clearInterval(timer);
      }
    }, 1000)
    return () => {
      // clearInterval(timer);
      // barrageWrapperRef.current.removeEventListener('webkitAnimationEnd', releaseRes);
      console.log("release resource");
    }
  }, [])
  // console.log(num, barrageData.length - 5);
  return (
    <div className="container">
      {
        barrageData.map((item, i) => {
          return (
            <BarrageItem state={item.status} key={i} content={item.value} />
          )
        })
      }
    </div>
  )
}
