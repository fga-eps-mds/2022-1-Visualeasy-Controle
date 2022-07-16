const { FindHelloWorldResolve } = require('./FindHelloWolrdResolve');

module.exports = {
  findHello() {
    const hello = FindHelloWorldResolve();

    return hello;
  },
};
