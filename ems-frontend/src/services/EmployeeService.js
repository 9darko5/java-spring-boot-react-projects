import axiosInstance from '../helpers/axiosConfig';

const REST_API_BASE_URL = "https://localhost:443/api/employees";

export const listEmployees = () => axiosInstance.get(REST_API_BASE_URL);

export const createEmployee = (employee) => axiosInstance.post(REST_API_BASE_URL, employee);

export const getEmployee = (employeeId) => axiosInstance.get(REST_API_BASE_URL + '/' + employeeId);

export const updateEmployee = (employeeId, employee) => axiosInstance.put(REST_API_BASE_URL + '/' + employeeId, employee);

export const deleteEmployee = (employeeId) => axiosInstance.delete(REST_API_BASE_URL + '/' + employeeId);