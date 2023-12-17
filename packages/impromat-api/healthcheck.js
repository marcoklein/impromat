fetch(`http://localhost:${process.env.PORT}/graphql`, {
  method: 'POST',
  body: JSON.stringify({ query: '{googleAuthUrl}' }),
  headers: {
    'Content-type': 'application/json',
  },
})
  .then((response) => {
    console.log('STATUS: ', response.status);
    if (response.ok) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('ERROR', error);
    process.exit(1);
  });
