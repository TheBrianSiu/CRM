const validator = require('validator');

// customer validation
const validateCustomer = (customerData) => {
  const errors = [];

  if (!customerData.firstName || validator.isEmpty(customerData.firstName)) {
    errors.push('First name is required');
  }
  if (!customerData.lastName || validator.isEmpty(customerData.lastName)) {
    errors.push('Last name is required');
  }
  if (!customerData.email || !validator.isEmail(customerData.email)) {
    errors.push('Email is not valid');
  }
  if (!customerData.phoneNumber || !validator.isMobilePhone(customerData.phoneNumber, 'any', { strictMode: false })) {
    errors.push('Phone number is not valid');
  }
  if (!customerData.addressCity || validator.isEmpty(customerData.addressCity)) {
    errors.push('City is required');
  }
  if (!customerData.addressCountry || validator.isEmpty(customerData.addressCountry)) {
    errors.push('Country is required');
  }
  if (!customerData.addressState || validator.isEmpty(customerData.addressState)) {
    errors.push('State is required');
  }
  if (!customerData.addressStreet || validator.isEmpty(customerData.addressStreet)) {
    errors.push('Street address is required');
  }
  if (!customerData.addressZipCode || validator.isEmpty(customerData.addressZipCode)) {
    errors.push('Zip code is required');
  }
  if (!customerData.assignedAgent || validator.isEmpty(customerData.assignedAgent)) {
    errors.push('Assigned agent is required');
  }
  if (!customerData.bathrooms || !validator.isInt(customerData.bathrooms.toString(), { min: 0 })) {
    errors.push('Bathrooms must be a non-negative integer');
  }
  if (!customerData.bedrooms || !validator.isInt(customerData.bedrooms.toString(), { min: 0 })) {
    errors.push('Bedrooms must be a non-negative integer');
  }
  if (!customerData.budget || !validator.isDecimal(customerData.budget.toString(), { min: 0 })) {
    errors.push('Budget must be a non-negative decimal number');
  }
  if (!customerData.financingOption || validator.isEmpty(customerData.financingOption)) {
    errors.push('Financing option is required');
  }
  if (!customerData.leadSource || validator.isEmpty(customerData.leadSource)) {
    errors.push('Lead source is required');
  }
  if (!customerData.locationPreference || validator.isEmpty(customerData.locationPreference)) {
    errors.push('Location preference is required');
  }
  if (!customerData.propertyType || validator.isEmpty(customerData.propertyType)) {
    errors.push('Property type is required');
  }
  if (!customerData.timeline || validator.isEmpty(customerData.timeline)) {
    errors.push('Timeline is required');
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true };
};


// users validation
const validateUser = (userData) => {
  const errors = [];

  if (!userData.firstName || !validator.isAlpha(userData.firstName, 'en-US', { ignore: ' ' })) {
    errors.push('First name is required and should contain only alphabetic characters');
  }
  if (!userData.lastName || !validator.isAlpha(userData.lastName, 'en-US', { ignore: ' ' })) {
    errors.push('Last name is required and should contain only alphabetic characters');
  }
  if (!userData.email || !validator.isEmail(userData.email)) {
    errors.push('Email is not valid');
  }
  if (!userData.phoneNumber || !validator.isMobilePhone(userData.phoneNumber, 'any', { strictMode: false })) {
    errors.push('Phone number is not valid');
  }
  if (!userData.address || validator.isEmpty(userData.address)) {
    errors.push('Address is required');
  }
  if (!userData.department || validator.isEmpty(userData.department)) {
    errors.push('Department is required');
  }
  if (!userData.jobTitle || validator.isEmpty(userData.jobTitle)) {
    errors.push('Job title is required');
  }
  if (!userData.status || !['active', 'inactive'].includes(userData.status)) {
    errors.push('Status must be either active or inactive');
  }
  if (!userData.isAdmin || !['yes', 'no'].includes(userData.isAdmin)) {
    errors.push('Admin option must be either Yes or No');
  }
  if (userData.username && !validator.isAlphanumeric(userData.username, 'en-US')) {
    errors.push('Username is required and should contain only alphanumeric characters');
  }
  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true };
};

// projects validation
const validateProject = (custData) => {
  const errors = [];

  if (!custData.taskName || !validator.isAlpha(custData.taskName, 'en-US', { ignore: ' ' })) {
    errors.push('Task name is required and should contain only alphabetic characters');
  }
  if (custData.estHours && (!validator.isNumeric(custData.estHours.toString()) || custData.estHours < 0)) {
    errors.push('Estimated hours should be a numeric value and greater than zero');
  }
  if (custData.estValue && (!validator.isNumeric(custData.estValue.toString()) || custData.estValue < 0)) {
    errors.push('Estimated value should be a numeric value and greater than zero');
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true };
};


module.exports = {
  validateCustomer,
  validateUser,
  validateProject,
};
