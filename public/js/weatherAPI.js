// https://api.weatherbit.io/v2.0/current?city=tehran&key=22e3409e1de9493497e0d281d7377b81&include=minutely
class Weather{
    async weatherAPI(value){
        let url = `https://api.weatherbit.io/v2.0/current?city=${value}&key=22e3409e1de9493497e0d281d7377b81&include=minutely`

        let weatherResponse = await fetch(url)
        let weatherResult = await weatherResponse.json()

        
        return weatherResult;
    }
}