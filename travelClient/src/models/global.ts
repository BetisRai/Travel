function wait(time: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
