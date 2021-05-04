import { useState, useEffect } from 'react';
import './BarrageItem.css';

const STOP = 'stop';
const MOVE = 'move';
export default function BarrageItem(props) {
  const { content, state } = props;
  // const [status, setStatus] = useState(MOVE);
  // const [isIdle, setIdle] = useState(true);
  const className = state === MOVE ?  'barrage move' : 'barrage';
  // console.log(status);

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     setStatus(MOVE);
  //     setIdle(false);
  //   }, 2000);
  //   return () => {
  //     clearInterval(timer);
  //   }
  // }, [status, isIdle])
  

  return (
    <div className={className}>
      <span>{content}</span>
    </div>
  )
}
