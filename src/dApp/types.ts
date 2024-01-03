type RemapForInpage = {
  // omit fields we don't need on inpage side
  // message id will be fullfilled with transport layer
  // sender id will be fullfilled on background script
  senderId: string;
  messageId: string;
};
