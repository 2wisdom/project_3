const wrapper = (fn, ...args) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await fn.apply({}, args);
      if (result instanceof Error) throw result;
      resolve();
    } catch (error) {
      reject(error);
    }
  });

exports.wrapper = wrapper;
