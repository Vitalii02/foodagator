const { CALCULATE_DELIVERY } = require("./constants");

exports.deliveryСalculation = (price) => {
  if ((!price && price !== 0) || price < 0) {
    throw new Error(" Cost does not exist");
  }

  if (price === 0) {
    return 0;
  }

  const buff = CALCULATE_DELIVERY.filter(
    (item) => item.deliveryLimits <= price
  ).pop();
  return buff ? buff.costOfDelivery : 0;
};
