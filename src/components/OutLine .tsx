import { stat } from "fs";
import { NextPage } from "next";
import { useEffect, useState } from 'react'


type Props ={
  content :string
}

type OutLineObj = {
  h2: Map<number, Outline>
  h3: Map<number, Outline[]>
}

type Outline = {
  id: string
  text: string
  tagName: string
}

export const OutLine:React.FC<Props> = ({content})=>{
  const h2Map = new Map<number, Outline>()
  const h3Map = new Map<number, Outline[]>()
  const iniTialValue: OutLineObj = {
    h2: h2Map,
    h3: h3Map,
  }
  const [outLineObj, setOutLineObj] = useState<OutLineObj>(iniTialValue)
  const [isVisible, setVisible] = useState<boolean>(true)
  useEffect(() => {
    const htmlElement = new DOMParser().parseFromString(
      content,
      'text/html'
    )
    const headingElement = Array.from(htmlElement!.querySelectorAll('h2,h3'))
    const h2Map = outLineObj.h2
    const h3Map = outLineObj.h3
    var count = 0;
    headingElement.map((head) => {
      var outLine: Outline = {
        id: head.id,
        text: head.textContent!,
        tagName: head.tagName,
      }
      if (head.tagName === "H2"){
        count = count + 1
        h2Map.set(count, outLine)
      }else{
        h3Map.has(count) ? h3Map.get(count)?.push(outLine) : h3Map.set(count, [outLine])
      }
    })
    const obj: OutLineObj = {
      h2: h2Map,
      h3: h3Map,
    }
    setOutLineObj(obj)
  }, [])
  const h2List = Array.from(outLineObj!.h2.entries())
  return (
    <div className="c-outline">
      <p className="c-outline__title">目次  <span className="hide" onClick={()=>{setVisible(!isVisible)}}>{isVisible ? "[閉じる]" : "[表示]"}</span></p>
      {isVisible ? 
            <div className="c-outline__contents">
            <ul className="top">
             {h2List.map((eH2) => (
               <li className={"outline" + "--" + eH2[1].tagName} key={eH2[1].id}>
                 <div className="area">
                   <div className="number">{eH2[0].toString()}</div>
                   <a href={'#'+ eH2[1].id} className="text">{eH2[1].text}</a>
                 </div>
                 {outLineObj!.h3.has(eH2[0]) ? 
                                 <ul className="lower">
                                 {outLineObj!.h3.get(eH2[0])?.map((eH3)=>(
                                   <li key={eH3.id} className={"outline" + "--" + eH3.tagName}>
                                     <a href={"#" + eH3.id} className="text">{eH3.text}</a>
                                   </li>
                                 ))}
                               </ul> : <></> 
                }
               </li>
             ))}
            </ul>
            </div>
            :
            <></>  
    }
    </div>          
  )
}