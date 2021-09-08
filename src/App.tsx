import './App.css';

import { useEffect, useState } from 'react';

import axios from 'axios';

const checkAvailableNumber = (cityCode = "moskva", favoriteNumber = "4334445") => {
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const numberUrl = `https://${cityCode}.beeline.ru/fancynumber/favourite/?number=${favoriteNumber}`;
        console.log(cityCode);

    return axios.get(proxyUrl+numberUrl).then((res) => {
        res.data.numbers.forEach((category: any) => {
            category.numbers.forEach(({value}: any) => {
                if(value.includes(favoriteNumber)) {
                    console.log(cityCode, ":: found ", value)
                }
            })
        })
    }).catch((err) => {
		console.log(err, cityCode)
	})
}

const App = () => {
	const [cities, setCities] = useState<any[]>([]);	

  useEffect(() => {
    const fetchCities = async () => { 
		const data = new Map<string, any>()  
		const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const regionsUrl = 'https://moskva.beeline.ru/region/regionsList/?ui-culture=ru-ru';

		await axios.post(proxyUrl+regionsUrl, { clearJson: "true",  })
			.then((res) => {
				return res.data.allRegionGroups;
			})
			.then((regionGroups) => {
				regionGroups.forEach((region: any) => {
					region.forEach(({ items }: any) => {
						items.forEach((city: any) => {
							data.set(city.code, city)
						})
					}) 
				});
			})

		setCities(Array.from(data.values()))

		for (let city of cities) {
			await checkAvailableNumber(city.code)
		}
	}

	fetchCities();
  }, [])

  return (
    <div className="App">
		{cities.map(({code}) => <div key={code}>{code}</div>)}
	</div>
  );
}

export default App;
