import {
    ChangeEventHandler,
    MouseEventHandler,
    useCallback,
    useRef,
    useState,
} from "react";
import { City, Message, PhoneNumber } from "./types";

import { GroupNumber } from "./components/group-number";
import { Header } from "./components/header";
import { Percent } from "./components";
import cn from "classnames"
import style from "./app.module.css";

const App = () => {
    const [number, setNumber] = useState<string>("");
    const [percent, setPercent] = useState<number>(0);
    const [messages, setMessages] = useState<Message[]>([]);
    const [numbers, setNumbers] = useState(new Map<string, PhoneNumber>())

    const getAvailabilityInCities = useCallback((value: string) => {
        const cities: City[] = [];
        messages.forEach(({ city, numbers }) => {
            const found = numbers.find((number) => number.value === value);
            if(found) cities.push(city);
        })

        return cities;
    }, [messages])

    const addNumber = useCallback((phoneNumber: PhoneNumber) => {
        const { value } = phoneNumber;

        setNumbers((map) => {
            if (map.has(value)) return map;

            map.set(value, phoneNumber)

            return new Map(map)
        })
        
    }, [numbers, setNumbers])


    const socket = useRef<WebSocket>();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNumber(e.target.value);
    };

    const handleFind: MouseEventHandler = () => {
        setNumbers(new Map());
        socket.current?.close();

        const client = new WebSocket("wss://beeline-core.herokuapp.com");

        client.onopen = () => {
            console.log("socket connected.");
        };

        client.onmessage = (res) => {
            try {
                const message = JSON.parse(res.data) as Message;
                const { percent, numbers, city } = message;

                setPercent(percent);

                if (numbers.length) {
                    setMessages((data) => [...data, message]);

                    numbers.forEach((number) => {
                        addNumber(number);
                    })
                }

            } catch (error) {
                console.log("Error: parse message", error);
                const res = JSON.stringify({
                    type: "number",
                    payload: number,
                })
    
                client.send(res)       
            }
        };

        socket.current = client;
    };

    const handleStop: MouseEventHandler = () => {
        setPercent(0);
        socket.current?.close();
        socket.current = undefined;
    }

    return (
        <div className={style.app}>
            <div className={style.box}>
                <Header />

                <div className={style.field}>
                    <input
                        className={style.input}
                        onChange={handleChange}
                        value={number}
                    />
                </div>

                {!percent || percent === 100 ? (<button className={style.btn} onClick={handleFind}>
                    Найти номер
                </button>
                ) : (<button className={cn(style.btn, style['btn-light'])} onClick={handleStop}>
                    <Percent data={percent} />
                    <span className={style.btnContent}>Остановить поиск</span>
                </button>)}
                
                <GroupNumber data={Array.from(numbers.values())} getAvailabilityInCities={getAvailabilityInCities} />
            </div>
        </div>
    );
};

export default App;
