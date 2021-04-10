const axios = require('axios');
const newYorkFIPSCodes = [36005, 36047, 36085, 36081]; // Regional codes for the NY area


/**
 * Returns FIPs code from given latitude and longitude from FCC site
 *
 * @param {*} [lon, lat]
 * @return {*} fipsCode
 */
const getFIPSCode = async ([lon, lat]) => {
  try {
    lat = lat.toFixed(2);
    lon = lon.toFixed(2);
    const res = await axios.get(`https://geo.fcc.gov/api/census/area?lat=${lat}&lon=${lon}&format=json`);
    const fipsCode = res.data.results[0].county_fips;
    if (newYorkFIPSCodes.includes(fipsCode * 1)) {
      return 36061;
    }
    return fipsCode;
  } catch (err) {
    console.log(err);
  }
}


/**
 * Returns selected COVID metrics from Covid Act Now data at given fipsCode
 *
 * @param {*} fipsCode
 * @return {*}
 */
const getCovidData = async (fipsCode) => {
  try {
    const res = await axios.get(`https://api.covidactnow.org/v2/county/${fipsCode}.json?apiKey=${process.env.COVIDACTNOW_API_KEY}`);
    const { metrics, lastUpdatedDate } = res.data;
    return {
      asOf: lastUpdatedDate,
      caseDensity: metrics.caseDensity,
      testPositivityRatio: metrics.testPositivityRatio,
    };
  } catch (err) {
    console.log(err);
  }
}

async function getCovidRiskLevels(coordinates) {
  try {
    const fipsCode = await getFIPSCode(coordinates);
    const covidData = await getCovidData(fipsCode);
    return covidData;
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = getCovidRiskLevels;
