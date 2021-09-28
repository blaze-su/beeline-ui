import {
    ChangeEventHandler,
    MouseEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Found, Message, PhoneNumber } from "./types";

import { GroupCity } from "./components/group-city/group-city";
import { GroupNumber } from "./components/group-number";
import { Percent } from "./components";
import style from "./app.module.css";

const numbers = new Map()

const App = () => {
    const [number, setNumber] = useState<string>("");
    const [percent, setPercent] = useState<number>(0);
    const [found, setFound] = useState<Found[]>([]);
    const [numbers, setNumbers] = useState(new Map<string, PhoneNumber>())

    const addNumber = useCallback((number: PhoneNumber) => {
            setNumbers((map) => {
                if (map.has(number.value)) return map;

                map.set(number.value, number)

                return new Map(map)
            })
    }, [numbers, setNumbers])


    const socket = useRef<WebSocket>();

    useEffect(() => {
        socket.current = new WebSocket("wss://beeline-core.herokuapp.com");

        socket.current.onopen = () => {
            console.log("socket connected.");
        };

        socket.current.onmessage = (res) => {
            try {
                const message = JSON.parse(res.data) as Message;

                setPercent(message.percent);
                if (message.numbers.length) {
                    setFound((data) => [...data, message]);

                    message.numbers.forEach((number) => {
                        addNumber(number);
                    })
                }
            } catch (error) {
                console.log("Error: parse message", error);
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
                <h1>Beeline</h1>

                <div className={style.field}>
                    <input
                        className={style.input}
                        onChange={handleChange}
                        value={number}
                    />
                </div>

                <button className={style.btn} onClick={handleFind}>
                    Найти номер
                </button>

                <Percent data={percent} />
                
                <GroupNumber data={Array.from(numbers.values())} />
            </div>
        </div>
    );
};

export default App;
