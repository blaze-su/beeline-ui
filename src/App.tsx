import {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useRef,
    useState,
} from "react";
import style from "./app.module.css";
import { NumberFormat } from "./components";
import { Found, Message } from "./types";

const App = () => {
    const [number, setNumber] = useState<string>("");
    const [percent, setPercent] = useState<number>(0);
    const [found, setFound] = useState<Found[]>([]);

    const socket = useRef<WebSocket>();

    useEffect(() => {
        socket.current = new WebSocket("ws://beeline-core.herokuapp.com");

        socket.current.onopen = () => {
            console.log("socket connected.");
        };

        socket.current.onmessage = (res) => {
            try {
                const message = JSON.parse(res.data) as Message;

                setPercent(message.percent);
                if (message.numbers.length)
                    setFound((data) => [...data, message]);
            } catch (error) {
                console.log("Error: parce message", error);
            }
        };
    }, []);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNumber(e.target.value);
    };

    const handleFind: MouseEventHandler = () => {
        socket.current?.send(
            JSON.stringify({
                type: "number",
                payload: number,
            })
        );
    };

    return (
        <div className={style.app}>
            <div className={style.box}>
                <h1>Поиск номеров Beeline</h1>

                <div className={style.field}>
                    <input
                        className={style.input}
                        onChange={handleChange}
                        value={number}
                    />
                </div>

                <button className={style.btn} onClick={handleFind}>
                    Найти
                </button>

                {percent > 0 && percent !== 100 ? (
                    <div className={style.progress}>
                        <div
                            className={style.propgressLine}
                            style={{ width: `${percent}%` }}
                        ></div>
                    </div>
                ) : null}

                <div className={style.result}>
                    {found.map(({ city, numbers }) => {
                        return (
                            <div className={style.resultItem} key={city.code}>
                                <div className={style.resultCity}>
                                    {city.title}
                                </div>
                                <div className={style.resultNumbers}>
                                    {numbers.map((currentNumber) => {
                                        return NumberFormat(currentNumber);
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default App;
