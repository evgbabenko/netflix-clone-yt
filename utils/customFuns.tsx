const toDate = (date: string) => {
  const newDate = new Date(date);

  return newDate.toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export { toDate };