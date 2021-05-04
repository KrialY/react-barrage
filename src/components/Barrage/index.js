import React, {useRef, useState, useEffect} from 'react';
import './Barrage.css';
import {addClass, addStyle, removeClass} from '../utils';
/**
 * useEffect内部用了到了外界的变量，那么我应该是将外界变量声明在useEffect内部还是外部呢？
 */
export default function Barrage(props) {
  // const { data } = props;
  const [renderNum, setRenderNum] = useState(0);
  const data = ['弹幕1', '弹幕2', '弹幕3', '弹幕4', '弹幕5', '弹幕6', '弹幕7', '弹幕8', '弹幕9'];
  const trackLength = 2;
  const trackHeight = 50;
  const interval = 1000;
  const barrageWrapperRef = useRef();
  const barragesRef = useRef();
  
  useEffect(() => {
    let barrages = null;
    let timer = null;
    const height = barrageWrapperRef.current.offsetHeight;
    const maxTracks = Math.floor(height / trackHeight);
    let tracks = Math.min(2, maxTracks);
    const queue = new Array(tracks).fill(0).map(item => new Array(trackLength).fill(true));
    const renderNum = tracks * trackLength;
    setRenderNum(renderNum);
    barrages = barrageWrapperRef.current.children;
    let barrageIdleList = [];
    let num = 0;

    /**
     * 计算出空闲的轨道
     */
    const computeTrack = (queue) => {
      for(let i = 0;i < queue.length;i++) {
        for(let j = 0;j < queue[i].length;j++) {
          if(queue[i][j]) {
            return {i, j};
          }
        }
      }
      return null;
    }

    /**
     * 当每个弹幕移出屏幕时，释放轨道资源
     */
    const releaseRes = (e) => {
      let target = e.target;
      const i = target.getAttribute('i');
      const j = target.getAttribute('j');
      queue[i][j] = true;
      removeClass(target, 'move');
      barrageIdleList.push(target);
    }
    barrageWrapperRef.current.addEventListener('webkitAnimationEnd', releaseRes);

    const barrageLaunch = () => {
      timer = setInterval(() => {
        const pos = computeTrack(queue);
        console.log(pos, renderNum);
        /**
         * 查看轨道资源是否空闲
         */
        if(pos) {
          let barrageItem = null;
          /**
           * 查看初始队列是否有资源
           */
          if(num < renderNum) {
            barrageItem = barrages[num];
            console.log(num, renderNum);
          } else {
            /**
             * 查看空闲队列是否有资源
             */
            barrageItem = barrageIdleList.shift();
            // 可能无资源
            if(barrageItem) {
              barrageItem.innerHTML = data[num];
              console.log(barrageItem);
            }
          }
          /**
           * 如果空闲队列和初始队列没有可用资源，如果有那么发送弹幕，否则等待一个弹幕生命周期
           */
          if(barrageItem) {
            addClass(barrageItem, 'move');
            const {i, j} = pos;
            queue[i][j] = false;
            addStyle(barrageItem, 'top', `${i * trackHeight}px`);
            barrageItem.setAttribute('i', i);
            barrageItem.setAttribute('j', j);
          } else {
            num--;
          }
        } else {
          console.log("end");
          num--;
        }        
        num++;
        if(num >= data.length) {
          clearInterval(timer);
        }
      }, interval);
    }
    barrageLaunch();

    return () => {
      clearInterval(timer);
      barrageWrapperRef.current.removeEventListener('webkitAnimationEnd', releaseRes);
      console.log("release resource");
    }
  }, [])

  return (
    <div className="container" ref={barrageWrapperRef}>
      {
        data.slice(0, renderNum).map((item, i) => {
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
