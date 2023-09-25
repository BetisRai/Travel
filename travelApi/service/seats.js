exports.generateSeats = (seats) => {
  let totalNumberSeats = Number(seats);
  let newSeats = {};

  for (let index = 0; index < totalNumberSeats; index++) {
    newSeats[index] = false;
  }

  return JSON.stringify(newSeats);
};
