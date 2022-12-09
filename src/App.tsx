import { useEffect, useState } from 'react'

const apiUrl = {
	tokyo: 'https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json',
	osaka: 'https://www.jma.go.jp/bosai/forecast/data/forecast/270000.json',
	sapporo: 'https://www.jma.go.jp/bosai/forecast/data/forecast/016000.json',
}

type City = 'tokyo' | 'osaka' | 'sapporo'

type WeatherData = {
	area: { code: string; name: string }
	waves: string[]
	weatherCodes: string[]
	weathers: string[]
	winds: string[]
}

const Lis = ({ dt }: { dt: string[] }) => {
	return (
		<ul>
			{dt.map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</ul>
	)
}

function App() {
	const [weatherData, setWeather] = useState<WeatherData[]>()
	const handleChange = async (city: City) => {
		const fetchData = await fetch(apiUrl[city])
    const weather = await fetchData.json()
		const currentData = weather[0].timeSeries[0].areas as WeatherData[]
		setWeather(currentData)
  }
	useEffect(() => {
		handleChange('tokyo')
	}, [])

	return (
		<>
			<h1>Weather</h1>
			<p>今日の天気は</p>
			<select onChange={e => handleChange(e.target.value as City)}>
				<option value="tokyo">東京</option>
				<option value="osaka">大阪</option>
				<option value="sapporo">札幌</option>
			</select>
			<hr />
			<ul>
				{weatherData &&
					weatherData.map((item, index) => (
						<li key={index}>
							<div>city:{item.area.name}</div>
							<div>
								<p>waves:</p>
								<Lis dt={item.waves ?? []} />
							</div>
							<div>
								<p>weatherCodes: </p>
								<Lis dt={item.weatherCodes} />
							</div>
							<div>
								<p>weathers</p>
								<Lis dt={item.weathers} />
							</div>
							<div>
								<p>winds</p>
								<Lis dt={item.winds} />
							</div>
							<hr />
						</li>
					))}
			</ul>
		</>
	)
}

export default App
