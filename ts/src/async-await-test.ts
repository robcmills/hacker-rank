function linkExistingPlanGridRFI() {
  return Promise.reject();
}

const onSubmit = async () => {
  await linkExistingPlanGridRFI().finally(() => {
    console.log('finally');
  });
  console.log('after await');
  return 'result';
};

onSubmit().then(
  (result) => {
    console.log('result', result);
  },
  (error) => {
    console.log('error', error);
  }
);
