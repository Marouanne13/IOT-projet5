import { axiosInstance } from "./axiosInstance";

/* =========================
   AUTH / TOKEN
========================= */

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

/* =========================
   MEASUREMENTS
========================= */

// Tous les measurements
export async function fetchAllMeasurements() {
  const res = await axiosInstance.get("measurements/");
  return res.data;
}

// Dernière mesure
export async function fetchLatestMeasurement(sensorId = 1) {
  const res = await axiosInstance.get("measurements/latest/", {
    params: { sensor: sensorId },
  });
  return res.data;
}

// Measurements par capteur
export async function fetchMeasurements(sensorId = 1) {
  try {
    const res = await axiosInstance.get("measurements/", {
      params: { sensor: sensorId },
    });
    return res.data;
  } catch (error) {
    console.error("Erreur fetchMeasurements:", error);
    return [];
  }
}

// Créer une mesure
export async function createMeasurement(data) {
  try {
    const payload = {
      ...data,
      sensor: 1,
    };
    const res = await axiosInstance.post("measurements/", payload);
    return res.data;
  } catch (error) {
    console.error("Erreur createMeasurement:", error);
    throw error;
  }
}

/* =========================
   SENSORS
========================= */

// Tous les capteurs
export async function fetchSensors() {
  const res = await axiosInstance.get("sensors/");
  return res.data.results ?? res.data;
}

// Un capteur
export async function fetchSensor(sensorId) {
  const res = await axiosInstance.get(`sensors/${sensorId}/`);
  return res.data;
}

// Mise à jour capteur
export async function updateSensor(sensorId, data) {
  const res = await axiosInstance.put(`sensors/${sensorId}/`, data);
  return res.data;
}
