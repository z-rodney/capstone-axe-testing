
const axios = require('axios')

const getFIPSCode = async ([lat, lon]) => {
  try {
    const res = await (axios.get(`https://geo.fcc.gov/api/census/area?lat=${lat}&lon=${lon}&format=json`)).data
    const fipsCode = res.results[0].county_fips

    return fipsCode
  } catch (err) {
    console.log(err)
  }
}

const getCovidData = async (fipsCode) => {
  try {
    const res = await (axios.get(`https://api.covidactnow.org/v2/county/${fipsCode}.json?apiKey=${process.env.COVIDACTNOW_API_KEY}`)).data
    const { county, state, metrics, riskLevels, lastUpdatedDate } = res
    return {
      overall: riskLevels.overall,
      asOf: lastUpdatedDate,
      dataLocation: {
        state,
        county
      },
      caseDensity: {
        metric: metrics.caseDensity,
        risk: riskLevels.caseDensity
      },
      infectionRate: {
        metric: metrics.infectionRate,
        risk: riskLevels.infectionRate
      },
      testPositivityRatio: {
        metric: metrics.testPositivityRatio,
        risk: riskLevels.testPositivityRatio
      }
    }
  } catch (err) {
    console.log(err)
  }
}

async function getCovidRiskLevels(coordinates) {
  try {
    const fipsCode = await getFIPSCode(coordinates)
    const covidData = await getCovidData(fipsCode)
    return covidData
  }
  catch (err) {
    console.log(err)
  }
}

module.exports = getCovidRiskLevels
