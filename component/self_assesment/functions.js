const createMessege = (text) => {
  const msg = {
    _id: new Date().getTime(),
    text,
    user: { _id: 1 },
    type: "radio",
  };
  return msg;
};

export const onSelect = (text, handleSelect) => {
  const msg = createMessege(text);
  handleSelect(msg);
};
