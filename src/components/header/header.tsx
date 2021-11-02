import BeelineLogo from "./images/beeline.png";
import style from "./header.module.css";

export const Header = () => {
   return (
      <header className={style.box}>
         <img src={BeelineLogo} className={style.image} />
         <h1 className={style.title}>Beeline</h1>
      </header>
   );
};
