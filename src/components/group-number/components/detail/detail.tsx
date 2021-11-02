import {City} from "../../../../types";
import style from "./detail.module.css";

export type DetailProps = {
   cities: City[];
};

export const Detail = ({cities}: DetailProps) => {
   return (
      <div className={style.box}>
         <div className={style.cities}>
            {cities.map(({title, code}) => {
               return (
                  <div className={style.city} key={code}>
                     {title}
                  </div>
               );
            })}
         </div>
      </div>
   );
};
