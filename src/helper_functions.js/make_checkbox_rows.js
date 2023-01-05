import React from "react";
import Checkbox from "../components/checkbox";
import { makeBeatArray } from "./make_beat_array";

export const MakeCheckboxRows = beatTypes => {
 return beatTypes.map(beatType => {
     return <div className='checkbox-row'> 
         {makeBeatArray().map((n, index) => {return <Checkbox beatType={beatType} n={n} index={index}/>})}
     </div>
 })
}