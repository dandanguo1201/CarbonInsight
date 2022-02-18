import axios from 'axios';
import GLOBAL from './global';
import authentication from './authentication';

// let baseUrl = '';
// if (process.env.NODE_ENV === 'development') {
//   baseUrl = '/api'
// } else {
//   baseUrl = GLOBAL.serviceBaseURL + '/api'
// }

// axios.defaults.baseURL = baseUrl;

axios.defaults.baseURL = GLOBAL.serviceBaseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class API {

  async GetGeography(sector) {
    const accessToken = await authentication.acquireToken();
    return axios({
      method: 'get',
      url: `/api/geo/${sector}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  };

  async GetCarbonSinkDataGridChart(sector, fromDate, toDate) {
    const accessToken = await authentication.acquireToken();
    return axios({
      method: 'get',
      url: `/api/grid/${sector},${fromDate},${toDate}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  };

  async GetCarbonSinkDataLineChart(sector, countryRegions, fromDate, toDate) {
    const accessToken = await authentication.acquireToken();
    return axios({
      method: 'get',
      url: `/api/line/${sector},${countryRegions.join('&')},${fromDate},${toDate}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  };

  async GetPowerBIReport(reportName) {
    const accessToken = await authentication.acquireToken();
    return axios({
      method: 'get',
      url: `/api/reports/${reportName}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  };

}

const api = new API();
export default api;
