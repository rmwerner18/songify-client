import React from "react";
import Checkbox from "../components/checkbox";
import { numberOfBeatsArray } from "./make_beat_array";

export const MakeCheckboxRows = beatTypes => {
 return beatTypes.map(beatType => {
    console.log("CHECKBOX ROW")

     return <div className='checkbox-row'> 
         {numberOfBeatsArray.map(n => {return <Checkbox 
            beatType={beatType} 
            n={n} 
            />})}
     </div>
 })
}