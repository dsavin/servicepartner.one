//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Optimize', () => {
  /*
    * Test the /POST optimize route
    */
  describe('/POST optimize', () => {
    it('it POST array with one room value in string type and return 400 error', (done) => {
      let data = {
        rooms: [5, '34'],
        senior: 10,
        junior: 3,
      };
      chai.request(server)
        .post('/api/optimize')
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('Validation Error').eql('At least one element of array in \'rooms\' property is not a number');
          done();
        });
    });

    it('it POST empty rooms array and return 400 error', (done) => {
      let data = {
        rooms: [],
        senior: 10,
        junior: 3,
      };
      chai.request(server)
        .post('/api/optimize')
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('Validation Error').eql('\'rooms\' property is missing or empty');
          done();
        });
    });

    it('it POST request without senior property and return 400 error', (done) => {
      let data = {
        rooms: [23, 45],
        junior: 3,
      };
      chai.request(server)
        .post('/api/optimize')
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('Validation Error').eql('\'senior\' property is missing or not a number');
          done();
        });
    });

    it('it POST request without jenior property and return 400 error', (done) => {
      let data = {
        rooms: [23, 45],
        senior: 3,
      };
      chai.request(server)
        .post('/api/optimize')
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('Validation Error').eql('\'junior\' property is missing or not a number');
          done();
        });
    });

    it('it POST array with one room and return single senior because room is less then senior performance', (done) => {
      let data = {
        rooms: [5],
        senior: 10,
        junior: 3,
      };
      chai.request(server)
        .post('/api/optimize')
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('senior').eql(1);
          done();
        });
    });

    it('it POST array with 3 rooms ([35, 21, 17]) and return 3 propositions for workforce optimization based Code Task description', (done) => {
      let data = {
        rooms: [35, 21, 17],
        senior: 10,
        junior: 6,
      };
      chai.request(server)
        .post('/api/optimize')
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('senior').eql(3);
          res.body[0].should.have.property('junior').eql(1);
          res.body[1].should.be.a('object');
          res.body[1].should.have.property('senior').eql(1);
          res.body[1].should.have.property('junior').eql(2);
          res.body[2].should.be.a('object');
          res.body[2].should.have.property('senior').eql(2);
          res.body[2].should.have.property('junior').eql(0);
          done();
        });
    });

    it('it POST array with 2 rooms ([24, 28]) and return 3 propositions for workforce optimization based Code Task description', (done) => {
      let data = {
        rooms: [24, 28],
        senior: 11,
        junior: 6,
      };
      chai.request(server)
        .post('/api/optimize')
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('senior').eql(2);
          res.body[0].should.have.property('junior').eql(1);
          res.body[1].should.be.a('object');
          res.body[1].should.have.property('senior').eql(2);
          res.body[1].should.have.property('junior').eql(1);
          done();
        });
    });

  });

});