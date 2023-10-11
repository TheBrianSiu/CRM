const validator = require('validator');

// customer validation
const validateCustomer = (customerData) => {
  const errors = [];

  if (!customerData.first_name || validator.isEmpty(customerData.first_name)) {
    errors.push('First name is required');
  }
  if (!customerData.last_name || validator.isEmpty(customerData.last_name)) {
    errors.push('Last name is required');
  }
  if (!customerData.email || !validator.isEmail(customerData.email)) {
    errors.push('Email is not valid');
  }
  if (!customerData.phone_number || !validator.isMobilePhone(customerData.phone_number, 'any', { strictMode: false })) {
    errors.push('Phone number is not valid');
  }
  if (!customerData.address_city || validator.isEmpty(customerData.address_city)) {
    errors.push('City is required');
  }
  if (!customerData.address_country || validator.isEmpty(customerData.address_country)) {
    errors.push('Country is required');
  }
  if (!customerData.address_state || validator.isEmpty(customerData.address_state)) {
    errors.push('State is required');
  }
  if (!customerData.address_street || validator.isEmpty(customerData.address_street)) {
    errors.push('Street address is required');
  }
  if (!customerData.address_zip_code || validator.isEmpty(customerData.address_zip_code)) {
    errors.push('Zip code is required');
  }
  if (!customerData.assigned_agent || validator.isEmpty(customerData.assigned_agent)) {
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
  if (!customerData.financing_option || validator.isEmpty(customerData.financing_option)) {
    errors.push('Financing option is required');
  }
  if (!customerData.lead_source || validator.isEmpty(customerData.lead_source)) {
    errors.push('Lead source is required');
  }
  if (!customerData.location_preference || validator.isEmpty(customerData.location_preference)) {
    errors.push('Location preference is required');
  }
  if (!customerData.property_type || validator.isEmpty(customerData.property_type)) {
    errors.push('Property type is required');
  }
  if (!customerData.timeline || validator.isEmpty(customerData.timeline)) {
    errors.push('Timeline is required');
  }

  if (errors.length > 0) {
    return { isValid: false, errors: errors };
  }

  return { isValid: true };
};


// users validation
const validateUser = (userData) => {
  const errors = [];

  if (!userData.first_name || !validator.isAlpha(userData.first_name, 'en-US', { ignore: ' ' })) {
    errors.push('First name is required and should contain only alphabetic characters');
  }
  if (!userData.last_name || !validator.isAlpha(userData.last_name, 'en-US', { ignore: ' ' })) {
    errors.push('Last name is required and should contain only alphabetic characters');
  }
  if (!userData.email || !validator.isEmail(userData.email)) {
    errors.push('Email is not valid');
  }
  if (!userData.phone_number || !validator.isMobilePhone(userData.phone_number, 'any', { strictMode: false })) {
    errors.push('Phone number is not valid');
  }
  if (!userData.address || validator.isEmpty(userData.address)) {
    errors.push('Address is required');
  }
  if (!userData.department || validator.isEmpty(userData.department)) {
    errors.push('Department is required');
  }
  if (!userData.job_title || validator.isEmpty(userData.job_title)) {
    errors.push('Job title is required');
  }
  if (userData.password && !validator.isStrongPassword(userData.password)) {
    errors.push('Password must be strong (8-16 characters, uppercase, lowercase, number, and special character)');
  }
  if (!userData.status || !['active', 'inactive'].includes(userData.status)) {
    errors.push('Status must be either active or inative');
  }
  if (!userData.is_admin || !['yes', 'no'].includes(userData.is_admin)) {
    errors.push('admin option must be either Yes or No');
  }
  if (userData.username && !validator.isAlphanumeric(userData.username, 'en-US')) {
    errors.push('Username is required and should contain only alphanumeric characters');
  }
  if (errors.length > 0) {
    return { isValid: false, errors: errors };
  }

  return { isValid: true };
};

// projects validation
const validateProject = (custData) => {
  const errors = [];

  if (!custData.task_name || !validator.isAlpha(custData.task_name, 'en-US', { ignore: ' ' })) {
    errors.push('Task name is required and should contain only alphabetic characters');
  }
  if (custData.est_hours && !validator.isNumeric(custData.est_hours.toString()) || custData.est_hours && custData.est_hours < 0) {
    errors.push('Estimated hours should be a numeric value and greater than zero');
  }
  if (custData.est_value && !validator.isNumeric(custData.est_value.toString()) || custData.est_value && custData.est_value < 0) {
    errors.push('Estimated value should be a numeric value and greater than zero');
  }

  if (errors.length > 0) {
    return { isValid: false, errors: errors };
  }

  return { isValid: true };
};


module.exports = {
  validateCustomer,
  validateUser,
  validateProject,
};