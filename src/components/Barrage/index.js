import React, {useRef, useState, useEffect} from 'react';
import './Barrage.css';
import {addClass} from '../utils';

export default function Barrage(props) {
  // const { data } = props;
  const [h, setH] = useState(0);
  const data = ['弹幕1', '弹幕2', '弹幕3', '弹幕4', '弹幕5', '弹幕6', '弹幕7', '弹幕8', '弹幕9'];
  const tracks = 2;
  const trackLength = 2;
  const interval = 1000;
  const barrageWrapperRef = useRef();
  const barragesRef = useRef();
  let barrages = null;
  let timer = null;
  let num = 0;
  
  useEffect(() => {
    const height = barrageWrapperRef.current.offsetHeight;
    setH(height);
    barrages = barrageWrapperRef.current.children;

    const barrageLaunch = () => {
      timer = setInterval(() => {
        addClass(barrages[num], 'move');
        console.log(barrages[num]);
        num++;
        if(num >= barrages.length) {
          clearInterval(timer);
        }
      }, interval);
    }

    barrageLaunch();



    return () => {
      clearInterval(timer);
    }
  }, [])

  return (
    <div className="container" ref={barrageWrapperRef}>
      <div className="barrage">
        <span>弹幕</span>
      </div>
      {
        data.map((item, i) => {
          return (
            <div ref={barragesRef} key={`barrage-${i}`} className="barrage">
              <span>{item}</span>
            </div>
          )
        })
      }
    </div>
  )
}
