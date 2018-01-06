var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var expect = chai.expect


chai.use(chaiHttp);

//----------------------------first endPoint----------------------------------------------
describe('/GET CountriesByContinent', function() {
  it('should list ALL countries in the continent', function(done) {
    chai.request('http://localhost:3001')
      .get('/api/v1/countries/Oceania')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('body');
        res.body.body.should.be.a('array');
        res.body.body[0].should.have.property('name');
        done();
      });
  });
});

//----------------------------second endPoint----------------------------------------------


describe('/GET searchWeatherByCapital', function() {
  it('should list weather of capitals from the list of countries', function(done) {
    chai.request('http://localhost:3001')
      .get('/api/v1/weather/')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('body');
        res.body.body.should.be.a('array');
        res.body.body[0].should.have.property('Country');
        res.body.body[0].should.have.property('Capital');
        res.body.body[0].should.have.property('Weather');
        res.body.body[0].should.have.property('Celsius');
        done();
      });
  });
});

//----------------------------third endPoint----------------------------------------------

describe('/POST filterSearchedData', function() {
  it('should list the data on the capitals that are not filtered from the list of countries', function(done) {
    chai.request('http://localhost:3001')
      .post('/api/v1/filter')
      .set('content-type', 'application/json')
      .send({type: 'Oceania', filter: {temp:{min:10, max:50}, weather:['Rain']}})
      .end(function(err, res) {
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('body');
          res.body.body[0].should.have.property('Country');
          res.body.body[0].should.have.property('Capital');
          res.body.body[0].should.have.property('Weather');
          res.body.body[0].should.have.property('Celsius');
          expect(res.res.body.body[0].Weather).to.include("Rain");
          done();
      });
  });
});
