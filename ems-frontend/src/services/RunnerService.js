import axiosInstance from '../helpers/axiosConfig';

const REST_API_BASE_URL = "https://localhost:443/api/runners";

export const listRunners = () => axiosInstance.get(REST_API_BASE_URL);

export const createRunner = (runner) => axiosInstance.post(REST_API_BASE_URL, runner);

export const getRunner = (runnerId) => axiosInstance.get(REST_API_BASE_URL + '/' + runnerId);

export const updateRunner = (runnerId, runner) => axiosInstance.put(REST_API_BASE_URL + '/' + runnerId, runner);

export const deleteRunner = (runnerId) => axiosInstance.delete(REST_API_BASE_URL + '/' + runnerId);
