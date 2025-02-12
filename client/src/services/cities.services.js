import axios from 'axios';

export const getCities = () => {
    axios.get(`http://localhost:8000/api/cities/`)
      .then(res => {
        const cities = res.data;
        console.log(cities);
        return cities;
      })
}
    