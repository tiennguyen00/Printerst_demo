import replace from 'lodash/replace';

const MESS = {
  M01: '<REPLACE> is required.',
  M02: 'No records found.',
  M03: 'Incorrect username or password',

  M04: 'The <REPLACE> you entered already exists.',
  M05: 'Please enter a valid email in the name@mail.com format!',

  // REPLACE is one of MSP/Company/MSP admin/Company
  M06: 'The <REPLACE> admin ID <REPLACE2> successfully added.',
  M07: 'The changes have been saved.',
  M08: 'Are you sure you want to delete the item <REPLACE>?',

  // REPLACE is one of MSP/Company/MSP admin/Company
  M09: 'The <REPLACE> admin ID <REPLACE2> deleted successfully.',
  M10: 'Do you want to save your changes?',
  M11: "You've successfully changed your password.",
  M12: 'Are you sure you want to log out?',
  M13: 'Sign in to View More',
  M14:
    'Please enter a valid Phone number in the following format: +60 11 1234 5678',
  M15: 'Session timeout!',
  M16:
    'Please use only letters, numerals and the following punctuations: underscore (_), dash (-)',
  M17: 'This feature is only available for rotables.',
  M18: 'There is no history of this part.',
};

const getMess = (messId, replace1, replace2) => {
  let mess = replace(MESS[messId], '<REPLACE>', replace1);
  mess = replace(mess, '<REPLACE2>', replace2);
  return mess;
};

export { getMess };