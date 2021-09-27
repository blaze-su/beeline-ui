import { Found } from "../../types";
import { NumberFormat } from "../number-format";
import style from "./group-city.module.css"

export type GroupCityProps = {
    data: Found[]
}

export const GroupCity = ({ data }: GroupCityProps) => {

    return <div className={style.result}>
        {data.map(({ city, numbers }) => {
            return (
                <div className={style.item} key={city.code}>
                    <div className={style.city}>
                        {city.title}
                    </div>
                    <div className={style.numbers}>
                        {numbers.map((currentNumber) => {
                            return NumberFormat(currentNumber);
                        })}
                    </div>
                </div>
            );
        })}
    </div>
}
 
