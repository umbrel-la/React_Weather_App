import React from 'react';
import styles from './weather.module.sass';

  const API_KEY = "1f90d61e7512ad3605579728b4e5dc94";

export default class extends React.Component{

  state = {
    temperature: '18',
    wind: '9',
    humidity: '70',
    pressure: '745'

  }

  componentDidMount(){
    const icon = new Skycons({ color: '#222' })
    icon.set('icon', 'clear-day')
    icon.play()
  }

  setWeatherData = (date) => {
    let temperature = parseInt(date.main.temp - 273.15);
    let wind = parseInt(date.wind.speed);
    let humidity = date.main.humidity;
    let pressure = date.main.pressure;

    if(temperature > 0)
      temperature = '+' + temperature;
    console.log(date);
    const icon = new Skycons({ color: '#222' });
    let weatherFromApi = date['weather']['0']['main'];
    switch (weatherFromApi) {
      case 'Clouds':
      icon.set('icon', 'cloudy');
        break;
      case 'Snow':
      icon.set('icon', 'snow');
        break;
      case 'clear sky':
      icon.set('icon', 'clear-day')
        break;
      default:
        icon.set('icon', 'rain')
        break;
    }

    icon.play();

    this.setState({
        temperature,
        wind,
        humidity,
        pressure
    });

  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await api_url.json();
    this.setWeatherData(data);

  }
    render(){
        return (
            <div>
            <form onSubmit={this.gettingWeather} className={'d-flex ' + styles.weatherForm}>
              <input type="text" className={'form-control ' +  styles.weatherInput}
                    id="exampleInputEmail1"
                    placeholder="Введите город"
                    name="city"
                    />
              <button className={'btn btn-primary btn-sm ' + styles.weatherBtn}>
                  Получить погоду
              </button>
            </form>
              <div className={'d-flex ' + styles.weatherIcons}>
                  <p className={styles.temperature}>
                    {this.state.temperature}
                  </p>
                  	<canvas id="icon" width="80" height="80"></canvas>
                </div>

                <div className="d-flex">
                  <img src="https://cdn1.savepice.ru/uploads/2019/11/2/7f9b721a74e80475bd398f562d58aa67-full.png"
                       width="30px"
                       height="30px"
                       alt=""
                        />
                  <p className={styles.humidity}>
                    {this.state.humidity}
                        %
                  </p>
                </div>

              <div className="d-flex">
                <img src="https://cdn1.savepice.ru/uploads/2019/11/2/1609f32ac5f4e3c23ed52c0f2f12e4d6-full.png"
                     width="25px"
                     height="25px"
                     alt=""
                     />
                <p className={styles.wind}>
                  {this.state.wind}
                      м/с
                </p>
              </div>

              <div className="d-flex">
                <img src="https://cdn1.savepice.ru/uploads/2019/11/2/9efb13c04c5c103ffaca08297b341833-full.png"
                     width="30px"
                     height="30px"
                     alt=""
                     />
                <p className={styles.weatherPressure}>{this.state.pressure}мм рт.ст</p>
              </div>

            </div>
        );
    }
}
