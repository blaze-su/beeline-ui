import { City, PhoneNumber } from "../../types";
import { MouseEventHandler, useState } from "react";

import { Detail } from "./components";
import { NumberFormat } from "../number-format";
import style from "./group-number.module.css";

export type GroupNumberProps = {
    data: PhoneNumber[]
    getAvailabilityInCities: (value: string) => City[];
}


export const GroupNumber = ({ data, getAvailabilityInCities }: GroupNumberProps) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleClick: MouseEventHandler<HTMLElement> = (e) => {
       
        let target = e.target as HTMLElement;
        let value = target.getAttribute('data-number-value');
        
        if(!value) {
            while(target.parentElement) {
                target = target.parentElement;
                value = target.getAttribute('data-number-value');
                if(value) break;
            }
        }

        setSelected(selected === value ? null : value);
        console.log("value", value)

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
                            {selected === currentNumber.value && <Detail cities={getAvailabilityInCities(currentNumber.value)} />}
                        </div>)
                })
            }
        </div>
    </div>
}