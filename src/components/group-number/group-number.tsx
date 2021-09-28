import { City, PhoneNumber } from "../../types";

import { MouseEventHandler } from "react";
import { NumberFormat } from "../number-format";
import style from "./group-number.module.css";

export type GroupNumberProps = {
    data: PhoneNumber[]
    getAvailabilityInCities: (value: string) => City[];
}


export const GroupNumber = ({ data, getAvailabilityInCities }: GroupNumberProps) => {
    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
       // const attr = (e.target as HTMLDivElement).getAttribute('data-number-value');
        
        const attr = (e.target as HTMLDivElement).parentElement?.getAttribute('data-number-value')
        console.log(attr)

    }

    return <div className={style.box}>
        {Boolean(data.length) && <div className={style.found}>Найдено {data.length} совпадений:</div>}
        <div className={style.numbers} onClick={handleClick}>
            {
                data.map((currentNumber) => {
                    if (currentNumber.value === "9674334445") {
                        console.log(getAvailabilityInCities(currentNumber.value))
                    }

                    return (
                        <div key={currentNumber.value} data-number-value={currentNumber.value}>
                            <div className={style.item}>{NumberFormat(currentNumber)}</div>
                        </div>)
                })
            }
        </div>
    </div>
}

type DetailProps = {
    cities: City[]
}

const Detail = ({ cities }: DetailProps) => {
    return <div>
        {
            cities.map(({ title, code }) => {
                return <div key={code}>{title}</div>
            })
        }
    </div>
}