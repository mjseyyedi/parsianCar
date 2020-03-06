import React, {useEffect, useState} from 'react'

function LoadingLine({width = 269, height = 9}) {
  const [x, setX] = useState(0)

  useEffect(() =>{
    const interval = setInterval(() =>{
      setX(x => x < width ?  x+1 : -(width))
    } , 1)

    return () =>{
       clearInterval(interval)
    }
  } , [])

  const rectWidth = (width - 100 + (x) > 0 ? width - 100 + (x) : 0)

  return <svg width={width} height={height} viewBox="0 0 269 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.5" x="0.201904" y="0.138672" width="267.897" height="7.96496" rx="3.98248" fill="#FED593"/>
    <svg width={rectWidth} height={height}
         viewBox={`0 0 ${rectWidth} 9`}
         fill="none" xmlns="http://www.w3.org/2000/svg" >
      <rect x={x > 0 ? x : 0} y="0.138672"
            width="191.927" height="7.96496" rx="3.98248" fill="#FED593"/>
    </svg>

  </svg>


}

export default LoadingLine
