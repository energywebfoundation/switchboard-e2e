const CHARACTERS =
  'ABCDEFabcdef0123456789';

export const generateRandomDid = () => {
  let address = '';
  const charactersLength = CHARACTERS.length;
  for (let i = 0; i < 40; i++) {
    address += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
  }

  return `did:ethr:volta:0x${address}`;
};
