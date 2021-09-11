import cn from "classnames";
import { PhoneNumber } from "../../types";
import style from "./number-format.module.css";

export const NumberFormat = ({ formattedValue, value }: PhoneNumber) => {
    const phone = [];
    for (let i = 0; i < formattedValue.length; i += 2) {
        const [mask, value] = formattedValue.substr(i, 2).split("");

        phone.push(
            <span
                key={i}
                className={cn(style.digit, { [style.selected]: mask === "Y" })}
            >
                {value}
            </span>
        );
    }

    return (
        <div key={value} className={style.phone}>
            {phone}
        </div>
    );
};
