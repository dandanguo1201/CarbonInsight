"use strict";

const fs = require('fs');
const express = require('express');
const aad = require('azure-ad-jwt');
const { TYPES } = require("tedious");
const { callProcedure } = require('./query.js');
const config = require("./config.js");
const embedToken = require('./embedConfigService.js');

const jwtOptions = config.getJWTOptions();

function checkJwt(req, res, next) {
  var authorization = req.headers['authorization']
  if (!authorization) {
    return res.status(401).send('Missing Auth Attr');
  }
  var bearer = authorization.split(" ");
  var jwtToken = bearer[1];
  if (!jwtToken) {
    return res.status(401).send('Missing Token');
  }
  aad.verify(jwtToken, jwtOptions, function(err, result) {
    if (result) {
      next();
    } else {
      res.status(401).send('Invalid Token');
    }
  });
}

function parseDate(fromDate, toDate, intStamp) {
  const parsedFromDate = fromDate.split('-');
  const parsedToDate = toDate.split('-');
  if (parsedFromDate.length !== 2 || parsedToDate.length !== 2) {
    return false
  }
  const fromYear = parseInt(parsedFromDate[0]);
  const fromMonth = parseInt(parsedFromDate[1]);
  const toYear = parseInt(parsedToDate[0]);
  const toMonth = parseInt(parsedToDate[1]);
  if (isNaN(fromYear) || isNaN(fromMonth) || isNaN(toYear) || isNaN(toMonth) ||
      fromYear * 12 + fromMonth > toYear * 12 + toMonth) {
    return false
  }
  if (intStamp) {
    return {
      'from': (fromYear - 1979) * 12 + fromMonth - 2,
      'to': (toYear - 1979) * 12 + toMonth - 1
    };
  }
  return {
    'from': `${fromYear}-${fromMonth}-01`,
    'to': `${toYear}-${toMonth}-01`
  };
}

var router = express.Router();

router.use('*', checkJwt);

router.get('/update/charts', async function (req, res, next) {
  async function updateChartData(procedure, keys, path) {
    try {
      let result = await callProcedure(procedure, []);
      result = result.map(values => {
        const element = {};
        keys.forEach((key, i) => element[key] = values[i]);
        return element;
      });
      fs.writeFileSync(path, JSON.stringify(result, null, '  '));
    } catch(err) {
      throw new Error(err);
    }
  };
  try {
    await updateChartData(
      'get_carbon_emission_data_all',
      ['Time', 'Value'],
      './public/all.json'
    );
    await updateChartData(
      'get_carbon_emission_data_by_sector',
      ['Sector', 'Time', 'Value'], 
      './public/world.json'
    );
    await updateChartData(
      'get_carbon_emission_data_by_continent',
      ['Continent', 'Time', 'Value'],
      './public/sector.json'
    );
    await updateChartData(
      'get_carbon_emission_data_by_continent_sector',
      ['Continent', 'Sector', 'Time', 'Value'],
      './public/charts.json'
    );
  } catch(err) {
    res.status(400);
    throw new Error(err);
  }
  res.send('Charts updated.');
});

router.get('/geo/:sector', function (req, res, next) {
  const sector = ['land', 'ocean', 'all'].find(sec => sec === req.params['sector']);
  if (!sector) return res.status(400).send('Invalid Sector');
  callProcedure(`get_geography_${sector}`, [])
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err));
});

router.get('/grid/:sector,:from,:to', function (req, res, next) {
  const sector = ['land', 'ocean'].find(sec => sec === req.params['sector']);
  if (!sector) return res.status(400).send('Invalid Sector');
  const parsedDate = parseDate(req.params['from'], req.params['to'], true);
  if (!parsedDate) return res.status(400).send('Invalid Date');
  callProcedure('get_carbon_sink_data_grid', [
    {'name': 'sector', 'type': TYPES.Int, 'value': {'land': 1, 'ocean': 0}[sector]},
    {'name': 'fromDate', 'type': TYPES.Int, 'value': parsedDate['from']},
    {'name': 'toDate', 'type': TYPES.Int, 'value': parsedDate['to']}
  ]).then(result => res.send(result)).catch(err => res.status(400).send(err));
});

router.get('/line/:sector,:countryregion,:from,:to', function (req, res, next) {
  const sector = ['land', 'ocean', 'all'].find(sec => sec === req.params['sector']);
  if (!sector) return res.status(400).send('Invalid Sector');
  const parsedDate = parseDate(req.params['from'], req.params['to'], false);
  if (!parsedDate) return res.status(400).send('Invalid Date');
  const countryRegions = req.params['countryregion'].split('&');
  if (!countryRegions.length) return res.status(400).send('Invalid CountryRegions');
  callProcedure(`get_carbon_sink_data_line_${sector}`, [
    {'name': 'countryRegions', 'type': TYPES.TVP, 'value': {
      'columns': [{'name': 'CountryRegion', 'type': TYPES.VarChar, 'length': 32}],
      'rows': countryRegions.map(countryRegion => [countryRegion])
    }},
    {'name': 'fromDate', 'type': TYPES.DateTime, 'value': parsedDate['from']},
    {'name': 'toDate', 'type': TYPES.DateTime, 'value': parsedDate['to']}
  ]).then(result => res.send(result)).catch(err => res.status(400).send(err));
});

router.get('/reports/:reportname', async function (req, res, next) {
  let result = await embedToken.getEmbedInfo(req.params['reportname']);
  res.status(result.status).send(result);
});

module.exports = router;
