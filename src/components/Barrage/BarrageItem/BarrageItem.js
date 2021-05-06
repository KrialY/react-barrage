import { useState, useEffect, useRef } from 'react';
import './BarrageItem.css';

const STOP = 'stop';
const MOVE = 'move';
export default function BarrageItem(props) {
  const { content, state, animationEnd, index } = props;
  const className = state === MOVE ?  'barrage move' : 'barrage';
  const barrageRef = useRef();

  useEffect(() => {
    const barrageNode = barrageRef.current;
    const _animationEnd = (e) => {
      animationEnd && animationEnd(index);
    }
    barrageNode.addEventListener('webkitAnimationEnd', _animationEnd);
    return () => {
      barrageNode.removeEventListener('webkitAnimationEnd', _animationEnd);
    }
  }, [index, animationEnd])
  

  return (
    <div ref={barrageRef} className={className}>
      <span>{content}</span>
    </div>
  )
}
