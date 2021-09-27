import { NumberFormat } from "../number-format";
import { PhoneNumber } from "../../types";
import style from "./group-number.module.css";

export type GroupNumberProps = {
    data: PhoneNumber[]
}


export const GroupNumber = ({data}: GroupNumberProps) => {
    return <div className={style.box}>
        <div className={style.found}>Найдено {data.length} совпадений:</div>
        {
            data.map((currentNumber) => {
                return <div key={currentNumber.value} className={style.item}>{NumberFormat(currentNumber)}</div>;
            })
        }
    </div>
}