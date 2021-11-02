import style from "./percent.module.css";

export type PercentProps = {
   data: number;
};

export const Percent = ({data}: PercentProps) => {
   if (!data || data === 100) return null;

   return (
      <div className={style.box}>
         <div className={style.line} style={{width: `${data}%`}}></div>
      </div>
   );
};
