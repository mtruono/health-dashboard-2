import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ComposedChart, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, Cell, PieChart, Pie } from 'recharts';
import { Activity, Heart, TrendingUp, TrendingDown, Award, Zap, Moon, Scale, Flame, Target, ChevronRight, X, Trophy, Star, Calendar, AlertTriangle, CheckCircle, Dumbbell, Droplets, Brain, Wind } from 'lucide-react';

// ============================================================
// ALL DATA - COMPLETE DATASET
// 176 HRV records + 107 Scale records + 58 Readiness + 174 Respiratory
// ============================================================

const hrvDailyData = [
  {date:'2022-12-28',rmssd:17.15,nremhr:67.53,entropy:2.563},
  {date:'2022-12-29',rmssd:13.06,nremhr:71.99,entropy:2.274},
  {date:'2022-12-30',rmssd:14.46,nremhr:74.11,entropy:2.346},
  {date:'2022-12-31',rmssd:11.81,nremhr:77.56,entropy:2.566},
  {date:'2023-01-03',rmssd:16.39,nremhr:64.11,entropy:2.210},
  {date:'2023-01-04',rmssd:18.89,nremhr:68.21,entropy:2.774},
  {date:'2023-01-05',rmssd:11.90,nremhr:82.57,entropy:2.712},
  {date:'2023-01-07',rmssd:15.44,nremhr:75.23,entropy:2.688},
  {date:'2023-01-08',rmssd:14.05,nremhr:77.75,entropy:2.589},
  {date:'2023-01-09',rmssd:14.31,nremhr:69.78,entropy:2.286},
  {date:'2023-01-10',rmssd:17.86,nremhr:70.75,entropy:2.702},
  {date:'2023-01-11',rmssd:15.32,nremhr:70.40,entropy:2.572},
  {date:'2023-01-12',rmssd:25.03,nremhr:69.29,entropy:2.645},
  {date:'2023-01-15',rmssd:14.76,nremhr:70.82,entropy:2.326},
  {date:'2023-01-16',rmssd:14.25,nremhr:72.62,entropy:2.355},
  {date:'2023-01-17',rmssd:19.18,nremhr:65.58,entropy:2.426},
  {date:'2023-01-18',rmssd:15.18,nremhr:73.79,entropy:2.791},
  {date:'2023-01-23',rmssd:10.22,nremhr:84.25,entropy:2.541},
  {date:'2023-01-24',rmssd:15.05,nremhr:67.86,entropy:2.410},
  {date:'2023-01-25',rmssd:18.39,nremhr:68.53,entropy:2.266},
  {date:'2023-01-26',rmssd:14.86,nremhr:75.95,entropy:2.601},
  {date:'2023-01-28',rmssd:12.38,nremhr:78.79,entropy:2.336},
  {date:'2023-01-29',rmssd:13.37,nremhr:71.72,entropy:2.764},
  {date:'2023-01-30',rmssd:14.12,nremhr:65.62,entropy:2.520},
  {date:'2023-01-31',rmssd:17.88,nremhr:63.81,entropy:2.102},
  {date:'2023-02-01',rmssd:18.16,nremhr:0.00,entropy:1.629},
  {date:'2023-02-02',rmssd:16.77,nremhr:73.21,entropy:2.557},
  {date:'2023-02-03',rmssd:15.80,nremhr:69.46,entropy:2.371},
  {date:'2023-02-04',rmssd:14.29,nremhr:74.73,entropy:3.020},
  {date:'2023-02-05',rmssd:13.85,nremhr:66.06,entropy:1.985},
  {date:'2023-02-06',rmssd:17.08,nremhr:67.94,entropy:2.705},
  {date:'2023-02-07',rmssd:22.60,nremhr:67.14,entropy:2.883},
  {date:'2023-02-08',rmssd:17.10,nremhr:66.88,entropy:2.226},
  {date:'2023-02-09',rmssd:19.41,nremhr:75.31,entropy:2.675},
  {date:'2023-02-10',rmssd:12.13,nremhr:76.74,entropy:2.222},
  {date:'2023-02-11',rmssd:16.33,nremhr:76.73,entropy:2.277},
  {date:'2023-02-12',rmssd:17.03,nremhr:71.88,entropy:2.730},
  {date:'2023-02-13',rmssd:11.38,nremhr:82.19,entropy:2.381},
  {date:'2023-02-14',rmssd:21.30,nremhr:68.45,entropy:2.509},
  {date:'2023-02-15',rmssd:15.78,nremhr:67.28,entropy:1.994},
  {date:'2023-02-17',rmssd:13.78,nremhr:73.81,entropy:2.600},
  {date:'2023-02-18',rmssd:11.57,nremhr:83.56,entropy:2.712},
  {date:'2023-05-13',rmssd:16.59,nremhr:73.98,entropy:2.378},
  {date:'2023-05-14',rmssd:17.98,nremhr:68.40,entropy:2.083},
  {date:'2023-05-15',rmssd:16.98,nremhr:70.25,entropy:2.728},
  {date:'2023-05-16',rmssd:15.67,nremhr:69.44,entropy:2.349},
  {date:'2023-05-17',rmssd:15.28,nremhr:76.37,entropy:1.960},
  {date:'2023-05-22',rmssd:19.07,nremhr:65.69,entropy:2.283},
  {date:'2023-05-23',rmssd:14.19,nremhr:69.01,entropy:2.509},
  {date:'2023-05-24',rmssd:10.88,nremhr:81.94,entropy:2.283},
  {date:'2023-05-25',rmssd:14.27,nremhr:73.33,entropy:2.036},
  {date:'2023-05-26',rmssd:15.08,nremhr:74.47,entropy:2.490},
  {date:'2023-05-28',rmssd:13.86,nremhr:73.44,entropy:2.698},
  {date:'2023-05-29',rmssd:14.98,nremhr:72.11,entropy:2.455},
  {date:'2023-05-30',rmssd:28.67,nremhr:60.61,entropy:2.574},
  {date:'2023-05-31',rmssd:17.59,nremhr:66.19,entropy:2.306},
  {date:'2023-06-01',rmssd:18.34,nremhr:66.16,entropy:2.479},
  {date:'2023-06-02',rmssd:17.42,nremhr:67.72,entropy:2.614},
  {date:'2023-06-03',rmssd:10.61,nremhr:81.45,entropy:2.508},
  {date:'2023-06-04',rmssd:12.91,nremhr:70.92,entropy:2.382},
  {date:'2023-06-05',rmssd:14.45,nremhr:74.74,entropy:2.205},
  {date:'2023-06-06',rmssd:14.28,nremhr:72.60,entropy:2.790},
  {date:'2023-06-07',rmssd:11.83,nremhr:89.49,entropy:2.309},
  {date:'2023-06-08',rmssd:15.49,nremhr:70.03,entropy:2.308},
  {date:'2023-06-09',rmssd:14.03,nremhr:81.34,entropy:2.212},
  {date:'2023-06-11',rmssd:11.77,nremhr:78.70,entropy:2.350},
  {date:'2023-06-12',rmssd:11.10,nremhr:78.42,entropy:2.738},
  {date:'2023-06-13',rmssd:17.84,nremhr:71.19,entropy:2.639},
  {date:'2023-06-14',rmssd:20.17,nremhr:68.67,entropy:2.674},
  {date:'2023-06-15',rmssd:17.70,nremhr:70.46,entropy:2.489},
  {date:'2023-06-16',rmssd:16.28,nremhr:76.75,entropy:2.768},
  {date:'2023-06-17',rmssd:19.86,nremhr:69.89,entropy:2.734},
  {date:'2023-06-25',rmssd:10.13,nremhr:77.09,entropy:2.263},
  {date:'2023-06-26',rmssd:9.63,nremhr:74.20,entropy:1.783},
  {date:'2023-06-28',rmssd:19.72,nremhr:73.39,entropy:2.935},
  {date:'2023-06-29',rmssd:13.75,nremhr:73.32,entropy:2.328},
  {date:'2023-06-30',rmssd:22.80,nremhr:63.52,entropy:2.749},
  {date:'2023-07-01',rmssd:17.63,nremhr:72.53,entropy:2.421},
  {date:'2023-07-03',rmssd:25.22,nremhr:61.69,entropy:2.343},
  {date:'2023-07-04',rmssd:26.41,nremhr:61.37,entropy:2.865},
  {date:'2023-07-05',rmssd:21.72,nremhr:67.64,entropy:2.865},
  {date:'2023-07-07',rmssd:15.27,nremhr:70.21,entropy:2.565},
  {date:'2023-07-08',rmssd:10.40,nremhr:75.92,entropy:2.590},
  {date:'2023-07-09',rmssd:10.85,nremhr:74.88,entropy:2.773},
  {date:'2023-07-10',rmssd:14.17,nremhr:68.83,entropy:2.188},
  {date:'2023-07-11',rmssd:14.50,nremhr:73.42,entropy:2.944},
  {date:'2023-07-12',rmssd:15.40,nremhr:71.73,entropy:1.707},
  {date:'2023-07-13',rmssd:17.13,nremhr:0.00,entropy:2.693},
  {date:'2023-07-18',rmssd:51.89,nremhr:52.80,entropy:3.204},
  {date:'2023-07-19',rmssd:23.22,nremhr:60.87,entropy:2.753},
  {date:'2023-07-23',rmssd:24.11,nremhr:62.73,entropy:2.955},
  {date:'2023-07-24',rmssd:18.05,nremhr:64.49,entropy:2.106},
  {date:'2023-07-27',rmssd:19.05,nremhr:66.33,entropy:2.666},
  {date:'2023-07-30',rmssd:15.75,nremhr:67.88,entropy:2.660},
  {date:'2023-07-31',rmssd:30.13,nremhr:62.24,entropy:2.390},
  {date:'2023-08-01',rmssd:21.46,nremhr:60.21,entropy:2.404},
  {date:'2023-08-08',rmssd:20.00,nremhr:64.67,entropy:2.898},
  {date:'2023-08-09',rmssd:22.23,nremhr:63.08,entropy:2.467},
  {date:'2023-08-12',rmssd:22.43,nremhr:65.30,entropy:2.881},
  {date:'2023-08-19',rmssd:24.77,nremhr:64.94,entropy:2.939},
  {date:'2023-08-20',rmssd:15.12,nremhr:76.11,entropy:2.028},
  {date:'2023-08-21',rmssd:19.08,nremhr:66.24,entropy:2.792},
  {date:'2023-09-11',rmssd:10.17,nremhr:74.82,entropy:2.394},
  {date:'2023-09-23',rmssd:13.01,nremhr:74.62,entropy:2.791},
  {date:'2023-09-30',rmssd:13.05,nremhr:68.38,entropy:2.571},
  {date:'2023-10-01',rmssd:13.66,nremhr:75.34,entropy:1.954},
  {date:'2024-01-29',rmssd:17.08,nremhr:68.23,entropy:2.043},
  {date:'2024-01-30',rmssd:14.14,nremhr:74.33,entropy:2.783},
  {date:'2024-01-31',rmssd:20.69,nremhr:62.66,entropy:2.685},
  {date:'2024-02-01',rmssd:19.39,nremhr:64.70,entropy:2.723},
  {date:'2024-02-03',rmssd:13.51,nremhr:69.78,entropy:2.818},
  {date:'2024-02-04',rmssd:10.76,nremhr:73.05,entropy:2.550},
  {date:'2024-02-06',rmssd:11.73,nremhr:76.43,entropy:2.992},
  {date:'2024-02-07',rmssd:13.38,nremhr:75.75,entropy:2.892},
  {date:'2024-02-18',rmssd:9.94,nremhr:73.95,entropy:2.082},
  {date:'2024-02-19',rmssd:10.72,nremhr:77.04,entropy:2.306},
  {date:'2024-02-20',rmssd:10.25,nremhr:88.73,entropy:1.783},
  {date:'2024-02-21',rmssd:19.40,nremhr:65.46,entropy:2.722},
  {date:'2024-02-22',rmssd:11.73,nremhr:71.70,entropy:2.567},
  {date:'2024-02-23',rmssd:11.02,nremhr:76.39,entropy:1.926},
  {date:'2024-02-26',rmssd:13.96,nremhr:67.59,entropy:2.584},
  {date:'2024-02-27',rmssd:13.01,nremhr:66.98,entropy:2.372},
  {date:'2024-02-28',rmssd:8.96,nremhr:79.78,entropy:1.640},
  {date:'2024-02-29',rmssd:10.49,nremhr:81.27,entropy:2.251},
  {date:'2024-03-01',rmssd:10.34,nremhr:79.56,entropy:2.495},
  {date:'2024-03-21',rmssd:12.04,nremhr:69.69,entropy:2.359},
  {date:'2024-03-22',rmssd:11.44,nremhr:72.60,entropy:2.941},
  {date:'2024-03-23',rmssd:15.46,nremhr:69.45,entropy:2.708},
  {date:'2024-03-24',rmssd:8.79,nremhr:83.31,entropy:1.903},
  {date:'2024-03-25',rmssd:12.83,nremhr:71.61,entropy:2.338},
  {date:'2024-03-26',rmssd:13.76,nremhr:70.83,entropy:2.430},
  {date:'2024-03-27',rmssd:15.88,nremhr:68.89,entropy:2.984},
  {date:'2024-03-28',rmssd:11.85,nremhr:79.63,entropy:1.811},
  {date:'2024-03-30',rmssd:11.72,nremhr:75.70,entropy:2.177},
  {date:'2024-03-31',rmssd:18.44,nremhr:68.16,entropy:2.905},
  {date:'2025-12-15',rmssd:12.10,nremhr:70.50,entropy:2.213},
  {date:'2025-12-16',rmssd:12.12,nremhr:76.32,entropy:2.520},
  {date:'2025-12-17',rmssd:10.21,nremhr:81.80,entropy:2.441},
  {date:'2025-12-18',rmssd:12.26,nremhr:72.78,entropy:2.368},
  {date:'2025-12-19',rmssd:16.13,nremhr:71.91,entropy:3.034},
  {date:'2025-12-20',rmssd:7.29,nremhr:93.17,entropy:1.584},
  {date:'2025-12-21',rmssd:15.00,nremhr:69.62,entropy:2.939},
  {date:'2025-12-22',rmssd:12.57,nremhr:71.41,entropy:2.002},
  {date:'2025-12-23',rmssd:13.30,nremhr:78.97,entropy:2.821},
  {date:'2025-12-24',rmssd:13.17,nremhr:76.86,entropy:2.662},
  {date:'2025-12-25',rmssd:12.58,nremhr:72.81,entropy:2.608},
  {date:'2025-12-26',rmssd:12.81,nremhr:67.57,entropy:2.186},
  {date:'2025-12-27',rmssd:9.31,nremhr:73.26,entropy:1.819},
  {date:'2025-12-28',rmssd:16.49,nremhr:68.60,entropy:2.613},
  {date:'2025-12-29',rmssd:15.87,nremhr:70.86,entropy:2.317},
  {date:'2025-12-31',rmssd:15.39,nremhr:68.74,entropy:2.518},
  {date:'2026-01-01',rmssd:8.24,nremhr:89.84,entropy:1.278},
  {date:'2026-01-02',rmssd:18.48,nremhr:60.31,entropy:2.734},
  {date:'2026-01-03',rmssd:15.15,nremhr:69.76,entropy:2.634},
  {date:'2026-01-04',rmssd:16.81,nremhr:67.49,entropy:2.612},
  {date:'2026-01-05',rmssd:16.78,nremhr:65.27,entropy:2.317},
  {date:'2026-01-06',rmssd:12.09,nremhr:76.57,entropy:2.254},
  {date:'2026-01-07',rmssd:14.26,nremhr:75.56,entropy:2.861},
  {date:'2026-01-08',rmssd:8.61,nremhr:87.28,entropy:2.234},
  {date:'2026-01-09',rmssd:16.28,nremhr:64.26,entropy:2.439},
  {date:'2026-01-10',rmssd:10.70,nremhr:82.81,entropy:2.261},
  {date:'2026-01-11',rmssd:10.87,nremhr:76.36,entropy:2.304},
  {date:'2026-01-12',rmssd:11.94,nremhr:69.59,entropy:2.191},
  {date:'2026-01-13',rmssd:11.46,nremhr:72.29,entropy:2.235},
  {date:'2026-01-14',rmssd:12.66,nremhr:75.05,entropy:2.220},
  {date:'2026-01-15',rmssd:15.67,nremhr:67.56,entropy:2.617},
  {date:'2026-01-16',rmssd:12.19,nremhr:73.06,entropy:2.191},
  {date:'2026-01-19',rmssd:13.09,nremhr:67.27,entropy:2.122},
  {date:'2026-01-20',rmssd:10.32,nremhr:82.11,entropy:1.746},
  {date:'2026-01-21',rmssd:13.29,nremhr:67.15,entropy:2.630},
  {date:'2026-01-22',rmssd:8.19,nremhr:82.84,entropy:2.005},
  {date:'2026-01-23',rmssd:12.63,nremhr:72.64,entropy:1.792},
  {date:'2026-01-24',rmssd:14.90,nremhr:69.30,entropy:2.503},
  {date:'2026-01-25',rmssd:21.04,nremhr:65.72,entropy:2.499},
  {date:'2026-01-26',rmssd:10.56,nremhr:70.27,entropy:2.119},
  {date:'2026-01-27',rmssd:11.06,nremhr:72.40,entropy:2.024}
];

const scaleData = [
  {date:'2023-06-25',weight:187.2,bodyFat:27.2,muscle:129.2,visceral:12,water:52.4,bone:6.8,protein:16.5,bmr:1777,metaAge:47,skeletal:46.9,bmi:30.1},
  {date:'2023-06-26',weight:183.4,bodyFat:26.3,muscle:128.2,visceral:12,water:53.1,bone:6.7,protein:16.7,bmr:1755,metaAge:47,skeletal:47.5,bmi:29.5},
  {date:'2023-06-27',weight:183.4,bodyFat:26.3,muscle:128.2,visceral:12,water:53.1,bone:6.7,protein:16.7,bmr:1755,metaAge:47,skeletal:47.5,bmi:29.5},
  {date:'2023-06-28',weight:184.9,bodyFat:26.6,muscle:128.7,visceral:12,water:52.9,bone:6.8,protein:16.7,bmr:1763,metaAge:47,skeletal:47.3,bmi:29.7},
  {date:'2023-06-29',weight:184.1,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.6},
  {date:'2023-06-30',weight:185.5,bodyFat:26.8,muscle:128.9,visceral:12,water:52.8,bone:6.8,protein:16.6,bmr:1767,metaAge:47,skeletal:47.2,bmi:29.8},
  {date:'2023-07-01',weight:185.5,bodyFat:26.8,muscle:128.9,visceral:12,water:52.8,bone:6.8,protein:16.6,bmr:1767,metaAge:47,skeletal:47.2,bmi:29.8},
  {date:'2023-07-02',weight:188.3,bodyFat:27.5,muscle:129.4,visceral:12,water:52.2,bone:6.8,protein:16.5,bmr:1784,metaAge:47,skeletal:46.7,bmi:30.3},
  {date:'2023-07-03',weight:192.6,bodyFat:28.4,muscle:130.7,visceral:13,water:51.6,bone:6.9,protein:16.2,bmr:1811,metaAge:48,skeletal:46.1,bmi:30.9},
  {date:'2023-07-05',weight:190.0,bodyFat:27.8,muscle:130.1,visceral:13,water:52.0,bone:6.8,protein:16.4,bmr:1795,metaAge:48,skeletal:46.5,bmi:30.5},
  {date:'2023-07-06',weight:186.7,bodyFat:27.1,muscle:129.2,visceral:12,water:52.5,bone:6.8,protein:16.6,bmr:1775,metaAge:47,skeletal:47.0,bmi:30.0},
  {date:'2023-07-07',weight:185.2,bodyFat:26.8,muscle:128.6,visceral:12,water:52.8,bone:6.8,protein:16.6,bmr:1765,metaAge:47,skeletal:47.2,bmi:29.8},
  {date:'2023-07-08',weight:187.2,bodyFat:27.2,muscle:129.2,visceral:12,water:52.4,bone:6.8,protein:16.5,bmr:1777,metaAge:47,skeletal:46.9,bmi:30.1},
  {date:'2023-07-09',weight:187.6,bodyFat:27.4,muscle:129.2,visceral:12,water:52.3,bone:6.8,protein:16.5,bmr:1780,metaAge:47,skeletal:46.8,bmi:30.2},
  {date:'2023-07-10',weight:185.3,bodyFat:26.8,muscle:128.7,visceral:12,water:52.8,bone:6.8,protein:16.6,bmr:1766,metaAge:47,skeletal:47.2,bmi:29.8},
  {date:'2023-07-11',weight:182.0,bodyFat:25.9,muscle:128.0,visceral:11,water:53.4,bone:6.7,protein:16.8,bmr:1746,metaAge:47,skeletal:47.8,bmi:29.2},
  {date:'2023-07-12',weight:183.6,bodyFat:26.3,muscle:128.4,visceral:12,water:53.1,bone:6.7,protein:16.7,bmr:1756,metaAge:47,skeletal:47.5,bmi:29.5},
  {date:'2023-07-13',weight:183.4,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.5},
  {date:'2023-07-14',weight:184.5,bodyFat:26.6,muscle:128.4,visceral:12,water:52.9,bone:6.7,protein:16.7,bmr:1761,metaAge:47,skeletal:47.3,bmi:29.7},
  {date:'2023-07-15',weight:183.5,bodyFat:26.3,muscle:128.3,visceral:12,water:53.1,bone:6.7,protein:16.7,bmr:1755,metaAge:47,skeletal:47.5,bmi:29.5},
  {date:'2023-07-19',weight:180.8,bodyFat:25.7,muscle:127.4,visceral:11,water:53.5,bone:6.7,protein:16.9,bmr:1738,metaAge:47,skeletal:47.9,bmi:29.1},
  {date:'2023-07-20',weight:181.0,bodyFat:25.7,muscle:127.6,visceral:11,water:53.5,bone:6.7,protein:16.9,bmr:1740,metaAge:47,skeletal:47.9,bmi:29.1},
  {date:'2023-07-22',weight:183.0,bodyFat:26.2,muscle:128.2,visceral:12,water:53.2,bone:6.7,protein:16.8,bmr:1752,metaAge:47,skeletal:47.6,bmi:29.4},
  {date:'2023-07-23',weight:182.8,bodyFat:26.2,muscle:128.0,visceral:12,water:53.2,bone:6.7,protein:16.8,bmr:1750,metaAge:47,skeletal:47.6,bmi:29.4},
  {date:'2023-07-24',weight:182.3,bodyFat:26.0,muscle:128.0,visceral:11,water:53.3,bone:6.7,protein:16.8,bmr:1748,metaAge:47,skeletal:47.7,bmi:29.3},
  {date:'2023-07-25',weight:182.2,bodyFat:26.0,muscle:127.9,visceral:11,water:53.3,bone:6.7,protein:16.8,bmr:1747,metaAge:47,skeletal:47.7,bmi:29.3},
  {date:'2023-07-26',weight:182.4,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.3},
  {date:'2023-07-27',weight:178.2,bodyFat:24.9,muscle:126.9,visceral:11,water:54.1,bone:6.7,protein:17.0,bmr:1723,metaAge:47,skeletal:48.4,bmi:28.6},
  {date:'2023-07-28',weight:181.3,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.1},
  {date:'2023-07-29',weight:181.9,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.2},
  {date:'2023-07-31',weight:187.3,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:30.1},
  {date:'2023-08-01',weight:183.1,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.4},
  {date:'2023-08-04',weight:183.0,bodyFat:26.2,muscle:128.2,visceral:12,water:53.2,bone:6.7,protein:16.8,bmr:1752,metaAge:47,skeletal:47.6,bmi:29.4},
  {date:'2023-08-05',weight:182.0,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.2},
  {date:'2023-08-06',weight:184.5,bodyFat:26.6,muscle:128.4,visceral:12,water:52.9,bone:6.7,protein:16.7,bmr:1761,metaAge:47,skeletal:47.3,bmi:29.7},
  {date:'2023-08-13',weight:178.8,bodyFat:25.1,muscle:127.0,visceral:11,water:54.0,bone:6.7,protein:17.0,bmr:1726,metaAge:47,skeletal:48.3,bmi:28.7},
  {date:'2023-08-19',weight:179.7,bodyFat:25.4,muscle:127.2,visceral:11,water:53.8,bone:6.7,protein:16.9,bmr:1732,metaAge:47,skeletal:48.1,bmi:28.9},
  {date:'2023-08-21',weight:182.2,bodyFat:26.0,muscle:127.9,visceral:11,water:53.3,bone:6.7,protein:16.8,bmr:1747,metaAge:47,skeletal:47.7,bmi:29.3},
  {date:'2023-08-27',weight:180.6,bodyFat:25.6,muscle:127.5,visceral:11,water:53.6,bone:6.7,protein:16.9,bmr:1737,metaAge:47,skeletal:48.0,bmi:29.0},
  {date:'2023-08-30',weight:174.9,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:28.1},
  {date:'2023-09-03',weight:185.8,bodyFat:26.9,muscle:128.8,visceral:12,water:52.7,bone:6.8,protein:16.6,bmr:1769,metaAge:47,skeletal:47.1,bmi:29.9},
  {date:'2023-09-08',weight:181.2,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.1},
  {date:'2023-09-09',weight:178.9,bodyFat:25.2,muscle:126.9,visceral:11,water:53.9,bone:6.7,protein:17.0,bmr:1727,metaAge:47,skeletal:48.2,bmi:28.8},
  {date:'2023-09-27',weight:185.5,bodyFat:26.9,muscle:128.7,visceral:12,water:52.7,bone:6.8,protein:16.6,bmr:1762,metaAge:48,skeletal:47.1,bmi:29.8},
  {date:'2023-09-28',weight:183.4,bodyFat:26.4,muscle:128.0,visceral:12,water:53.0,bone:6.7,protein:16.7,bmr:1749,metaAge:48,skeletal:47.4,bmi:29.5},
  {date:'2023-09-30',weight:180.3,bodyFat:25.7,muscle:127.2,visceral:11,water:53.6,bone:6.7,protein:16.9,bmr:1730,metaAge:48,skeletal:47.9,bmi:29.0},
  {date:'2023-10-02',weight:180.4,bodyFat:25.7,muscle:127.2,visceral:11,water:53.6,bone:6.7,protein:16.9,bmr:1730,metaAge:48,skeletal:47.9,bmi:29.0},
  {date:'2023-10-04',weight:182.7,bodyFat:26.3,muscle:127.8,visceral:12,water:53.1,bone:6.7,protein:16.7,bmr:1744,metaAge:48,skeletal:47.5,bmi:29.4},
  {date:'2023-10-13',weight:182.9,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.4},
  {date:'2023-10-16',weight:180.7,bodyFat:25.7,muscle:127.4,visceral:11,water:53.6,bone:6.7,protein:16.9,bmr:1732,metaAge:48,skeletal:47.9,bmi:29.0},
  {date:'2023-11-02',weight:181.4,bodyFat:26.0,muscle:127.4,visceral:11,water:53.4,bone:6.7,protein:16.8,bmr:1737,metaAge:48,skeletal:47.7,bmi:29.2},
  {date:'2024-03-21',weight:185.2,bodyFat:26.9,muscle:128.5,visceral:12,water:52.7,bone:6.7,protein:16.6,bmr:1760,metaAge:48,skeletal:47.1,bmi:29.8},
  {date:'2024-03-22',weight:182.9,bodyFat:26.3,muscle:127.9,visceral:12,water:53.1,bone:6.7,protein:16.7,bmr:1745,metaAge:48,skeletal:47.5,bmi:29.4},
  {date:'2024-03-23',weight:182.9,bodyFat:26.3,muscle:127.9,visceral:12,water:53.1,bone:6.7,protein:16.7,bmr:1745,metaAge:48,skeletal:47.5,bmi:29.4},
  {date:'2024-03-26',weight:180.7,bodyFat:25.7,muscle:127.4,visceral:11,water:53.6,bone:6.7,protein:16.9,bmr:1732,metaAge:48,skeletal:47.9,bmi:29.0},
  {date:'2024-03-27',weight:180.4,bodyFat:25.7,muscle:127.2,visceral:11,water:53.6,bone:6.7,protein:16.9,bmr:1730,metaAge:48,skeletal:47.9,bmi:29.0},
  {date:'2024-03-31',weight:181.7,bodyFat:26.0,muscle:127.6,visceral:11,water:53.4,bone:6.7,protein:16.8,bmr:1738,metaAge:48,skeletal:47.7,bmi:29.2},
  {date:'2024-04-01',weight:181.7,bodyFat:26.0,muscle:127.6,visceral:11,water:53.4,bone:6.7,protein:16.8,bmr:1738,metaAge:48,skeletal:47.7,bmi:29.2},
  {date:'2024-04-02',weight:181.2,bodyFat:25.8,muscle:127.6,visceral:11,water:53.5,bone:6.7,protein:16.9,bmr:1735,metaAge:48,skeletal:47.8,bmi:29.1},
  {date:'2024-04-06',weight:181.5,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:29.2},
  {date:'2024-04-13',weight:175.2,bodyFat:24.3,muscle:125.8,visceral:10,water:54.6,bone:6.6,protein:17.2,bmr:1698,metaAge:47,skeletal:48.8,bmi:28.1},
  {date:'2024-04-14',weight:179.0,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:28.8},
  {date:'2024-04-26',weight:176.5,bodyFat:24.7,muscle:126.0,visceral:11,water:54.2,bone:6.6,protein:17.1,bmr:1706,metaAge:48,skeletal:48.5,bmi:28.4},
  {date:'2024-04-27',weight:177.8,bodyFat:25.0,muscle:126.4,visceral:11,water:54.0,bone:6.7,protein:17.0,bmr:1714,metaAge:48,skeletal:48.3,bmi:28.6},
  {date:'2024-04-29',weight:178.2,bodyFat:25.0,muscle:126.7,visceral:11,water:54.0,bone:6.7,protein:17.0,bmr:1717,metaAge:48,skeletal:48.3,bmi:28.6},
  {date:'2024-05-05',weight:175.0,bodyFat:24.3,muscle:125.7,visceral:10,water:54.6,bone:6.6,protein:17.2,bmr:1697,metaAge:47,skeletal:48.8,bmi:28.1},
  {date:'2024-06-26',weight:176.9,bodyFat:24.7,muscle:126.3,visceral:11,water:54.2,bone:6.6,protein:17.1,bmr:1709,metaAge:48,skeletal:48.5,bmi:28.4},
  {date:'2024-07-13',weight:174.6,bodyFat:0,muscle:0,visceral:0,water:0,bone:0,protein:0,bmr:0,metaAge:0,skeletal:0,bmi:28.1},
  {date:'2024-09-02',weight:169.2,bodyFat:22.9,muscle:123.7,visceral:9,water:55.6,bone:6.5,protein:17.5,bmr:1662,metaAge:47,skeletal:49.7,bmi:27.2},
  {date:'2024-09-08',weight:180.2,bodyFat:25.9,muscle:126.8,visceral:11,water:53.4,bone:6.7,protein:16.8,bmr:1718,metaAge:50,skeletal:47.8,bmi:29.0},
  {date:'2025-12-15',weight:184.4,bodyFat:26.8,muscle:128.1,visceral:12,water:52.8,bone:6.7,protein:16.6,bmr:1743,metaAge:50,skeletal:47.2,bmi:29.6},
  {date:'2025-12-16',weight:185.1,bodyFat:26.9,muscle:128.3,visceral:12,water:52.7,bone:6.7,protein:16.6,bmr:1747,metaAge:50,skeletal:47.1,bmi:29.7},
  {date:'2025-12-17',weight:183.0,bodyFat:26.5,muscle:127.6,visceral:12,water:53.0,bone:6.7,protein:16.7,bmr:1734,metaAge:50,skeletal:47.4,bmi:29.4},
  {date:'2025-12-19',weight:180.6,bodyFat:25.9,muscle:127.0,visceral:11,water:53.4,bone:6.7,protein:16.8,bmr:1720,metaAge:50,skeletal:47.8,bmi:29.0},
  {date:'2025-12-20',weight:183.9,bodyFat:26.6,muscle:128.0,visceral:12,water:52.9,bone:6.7,protein:16.7,bmr:1740,metaAge:50,skeletal:47.3,bmi:29.5},
  {date:'2025-12-21',weight:182.3,bodyFat:26.3,muscle:127.4,visceral:11,water:53.1,bone:6.7,protein:16.7,bmr:1730,metaAge:50,skeletal:47.5,bmi:29.3},
  {date:'2025-12-22',weight:181.3,bodyFat:26.0,muscle:127.3,visceral:11,water:53.3,bone:6.7,protein:16.8,bmr:1724,metaAge:50,skeletal:47.7,bmi:29.1},
  {date:'2025-12-23',weight:184.3,bodyFat:26.8,muscle:128.0,visceral:12,water:52.8,bone:6.7,protein:16.6,bmr:1743,metaAge:50,skeletal:47.2,bmi:29.6},
  {date:'2025-12-24',weight:189.0,bodyFat:28.0,muscle:129.1,visceral:12,water:51.9,bone:6.8,protein:16.4,bmr:1772,metaAge:51,skeletal:46.4,bmi:30.4},
  {date:'2025-12-25',weight:181.3,bodyFat:26.0,muscle:127.3,visceral:11,water:53.3,bone:6.7,protein:16.8,bmr:1724,metaAge:50,skeletal:47.7,bmi:29.1},
  {date:'2025-12-26',weight:184.7,bodyFat:26.9,muscle:128.1,visceral:12,water:52.7,bone:6.7,protein:16.6,bmr:1745,metaAge:50,skeletal:47.1,bmi:29.7},
  {date:'2025-12-27',weight:184.6,bodyFat:26.9,muscle:128.0,visceral:12,water:52.7,bone:6.7,protein:16.6,bmr:1745,metaAge:50,skeletal:47.1,bmi:29.7},
  {date:'2025-12-28',weight:187.6,bodyFat:27.7,muscle:128.7,visceral:12,water:52.1,bone:6.8,protein:16.4,bmr:1763,metaAge:51,skeletal:46.6,bmi:30.2},
  {date:'2025-12-29',weight:183.0,bodyFat:26.5,muscle:127.6,visceral:12,water:53.0,bone:6.7,protein:16.7,bmr:1734,metaAge:50,skeletal:47.4,bmi:29.4},
  {date:'2025-12-30',weight:184.4,bodyFat:26.8,muscle:128.1,visceral:12,water:52.8,bone:6.7,protein:16.6,bmr:1743,metaAge:50,skeletal:47.2,bmi:29.6},
  {date:'2026-01-04',weight:182.2,bodyFat:26.3,muscle:127.4,visceral:11,water:53.1,bone:6.7,protein:16.7,bmr:1730,metaAge:50,skeletal:47.5,bmi:29.3},
  {date:'2026-01-05',weight:180.0,bodyFat:25.7,muscle:126.9,visceral:11,water:53.5,bone:6.7,protein:16.9,bmr:1716,metaAge:50,skeletal:47.9,bmi:28.9},
  {date:'2026-01-06',weight:181.5,bodyFat:26.2,muscle:127.2,visceral:11,water:53.2,bone:6.7,protein:16.8,bmr:1726,metaAge:50,skeletal:47.6,bmi:29.2},
  {date:'2026-01-07',weight:187.5,bodyFat:27.5,muscle:128.9,visceral:12,water:52.2,bone:6.8,protein:16.5,bmr:1762,metaAge:51,skeletal:46.7,bmi:30.1},
  {date:'2026-01-09',weight:188.5,bodyFat:27.8,muscle:129.0,visceral:12,water:52.0,bone:6.8,protein:16.4,bmr:1768,metaAge:51,skeletal:46.5,bmi:30.3},
  {date:'2026-01-10',weight:185.8,bodyFat:27.2,muscle:128.3,visceral:12,water:52.4,bone:6.7,protein:16.5,bmr:1752,metaAge:51,skeletal:46.9,bmi:29.9},
  {date:'2026-01-11',weight:187.6,bodyFat:27.7,muscle:128.7,visceral:12,water:52.1,bone:6.8,protein:16.4,bmr:1763,metaAge:51,skeletal:46.6,bmi:30.2},
  {date:'2026-01-12',weight:187.0,bodyFat:27.4,muscle:128.8,visceral:12,water:52.3,bone:6.8,protein:16.5,bmr:1759,metaAge:51,skeletal:46.8,bmi:30.0},
  {date:'2026-01-13',weight:186.5,bodyFat:27.4,muscle:128.5,visceral:12,water:52.3,bone:6.8,protein:16.5,bmr:1756,metaAge:51,skeletal:46.8,bmi:30.0},
  {date:'2026-01-14',weight:187.7,bodyFat:27.7,muscle:128.8,visceral:12,water:52.1,bone:6.8,protein:16.4,bmr:1763,metaAge:51,skeletal:46.6,bmi:30.2},
  {date:'2026-01-15',weight:185.3,bodyFat:27.1,muscle:128.2,visceral:12,water:52.6,bone:6.7,protein:16.6,bmr:1749,metaAge:51,skeletal:47.0,bmi:29.8},
  {date:'2026-01-16',weight:184.3,bodyFat:26.8,muscle:128.0,visceral:12,water:52.8,bone:6.7,protein:16.6,bmr:1743,metaAge:50,skeletal:47.2,bmi:29.6},
  {date:'2026-01-17',weight:191.7,bodyFat:28.6,muscle:129.8,visceral:13,water:51.5,bone:6.8,protein:16.2,bmr:1788,metaAge:51,skeletal:46.0,bmi:30.8},
  {date:'2026-01-18',weight:188.6,bodyFat:27.8,muscle:129.1,visceral:12,water:52.0,bone:6.8,protein:16.4,bmr:1769,metaAge:51,skeletal:46.5,bmi:30.3},
  {date:'2026-01-19',weight:186.5,bodyFat:27.4,muscle:128.5,visceral:12,water:52.3,bone:6.8,protein:16.5,bmr:1756,metaAge:51,skeletal:46.8,bmi:30.0},
  {date:'2026-01-20',weight:186.6,bodyFat:27.4,muscle:128.6,visceral:12,water:52.3,bone:6.8,protein:16.5,bmr:1757,metaAge:51,skeletal:46.8,bmi:30.0},
  {date:'2026-01-22',weight:186.2,bodyFat:27.2,muscle:128.5,visceral:12,water:52.4,bone:6.8,protein:16.5,bmr:1754,metaAge:51,skeletal:46.9,bmi:29.9},
  {date:'2026-01-23',weight:184.2,bodyFat:26.8,muscle:128.0,visceral:12,water:52.8,bone:6.7,protein:16.6,bmr:1742,metaAge:50,skeletal:47.2,bmi:29.6},
  {date:'2026-01-25',weight:187.4,bodyFat:27.5,muscle:128.8,visceral:12,water:52.2,bone:6.8,protein:16.5,bmr:1761,metaAge:51,skeletal:46.7,bmi:30.1},
  {date:'2026-01-26',weight:184.6,bodyFat:26.9,muscle:128.0,visceral:12,water:52.7,bone:6.7,protein:16.6,bmr:1745,metaAge:50,skeletal:47.1,bmi:29.7},
  {date:'2026-01-27',weight:184.3,bodyFat:26.8,muscle:128.0,visceral:12,water:52.8,bone:6.7,protein:16.6,bmr:1743,metaAge:50,skeletal:47.2,bmi:29.6},
  {date:'2026-01-28',weight:188.3,bodyFat:27.8,muscle:128.9,visceral:12,water:52.0,bone:6.8,protein:16.4,bmr:1767,metaAge:51,skeletal:46.5,bmi:30.3}
];

const readinessData = [
  {date:'2023-01-28',score:29,state:'LOW',activity:29,sleep:54,hrv:40},
  {date:'2023-01-29',score:51,state:'MEDIUM',activity:51,sleep:93,hrv:44},
  {date:'2023-01-30',score:34,state:'MEDIUM',activity:34,sleep:85,hrv:46},
  {date:'2023-01-31',score:68,state:'HIGH',activity:68,sleep:83,hrv:57},
  {date:'2023-02-02',score:92,state:'HIGH',activity:92,sleep:90,hrv:53},
  {date:'2023-02-03',score:100,state:'HIGH',activity:100,sleep:96,hrv:50},
  {date:'2023-02-04',score:41,state:'MEDIUM',activity:41,sleep:89,hrv:45},
  {date:'2023-02-05',score:33,state:'MEDIUM',activity:33,sleep:30,hrv:44},
  {date:'2023-02-06',score:59,state:'MEDIUM',activity:59,sleep:95,hrv:55},
  {date:'2023-02-07',score:81,state:'HIGH',activity:81,sleep:95,hrv:70},
  {date:'2023-02-08',score:81,state:'HIGH',activity:81,sleep:92,hrv:53},
  {date:'2023-02-09',score:55,state:'MEDIUM',activity:55,sleep:96,hrv:60},
  {date:'2023-02-10',score:22,state:'LOW',activity:22,sleep:84,hrv:38},
  {date:'2023-02-11',score:61,state:'MEDIUM',activity:61,sleep:74,hrv:52},
  {date:'2023-02-12',score:37,state:'MEDIUM',activity:37,sleep:94,hrv:54},
  {date:'2023-02-13',score:42,state:'MEDIUM',activity:42,sleep:78,hrv:35},
  {date:'2023-02-15',score:100,state:'HIGH',activity:100,sleep:41,hrv:49},
  {date:'2023-02-18',score:33,state:'MEDIUM',activity:33,sleep:97,hrv:37},
  {date:'2023-05-16',score:1,state:'LOW',activity:0,sleep:86,hrv:38},
  {date:'2023-05-17',score:28,state:'LOW',activity:28,sleep:87,hrv:37},
  {date:'2023-05-25',score:1,state:'LOW',activity:0,sleep:98,hrv:44},
  {date:'2023-05-26',score:1,state:'LOW',activity:0,sleep:96,hrv:48},
  {date:'2023-05-28',score:36,state:'MEDIUM',activity:36,sleep:79,hrv:43},
  {date:'2023-05-30',score:77,state:'HIGH',activity:77,sleep:98,hrv:79},
  {date:'2023-05-31',score:90,state:'HIGH',activity:90,sleep:98,hrv:53},
  {date:'2023-06-01',score:94,state:'HIGH',activity:94,sleep:98,hrv:54},
  {date:'2023-06-01',score:94,state:'HIGH',activity:94,sleep:98,hrv:54},
  {date:'2023-06-02',score:90,state:'HIGH',activity:90,sleep:97,hrv:52},
  {date:'2023-06-03',score:66,state:'HIGH',activity:66,sleep:91,hrv:36},
  {date:'2023-06-04',score:87,state:'HIGH',activity:87,sleep:96,hrv:42},
  {date:'2023-06-05',score:1,state:'LOW',activity:0,sleep:98,hrv:45},
  {date:'2023-06-06',score:45,state:'MEDIUM',activity:45,sleep:90,hrv:45},
  {date:'2023-06-07',score:1,state:'LOW',activity:0,sleep:86,hrv:39},
  {date:'2023-06-08',score:35,state:'MEDIUM',activity:35,sleep:94,hrv:49},
  {date:'2023-06-09',score:67,state:'HIGH',activity:67,sleep:83,hrv:45},
  {date:'2023-06-11',score:1,state:'LOW',activity:0,sleep:24,hrv:40},
  {date:'2023-06-12',score:1,state:'LOW',activity:0,sleep:97,hrv:39},
  {date:'2023-06-13',score:20,state:'LOW',activity:20,sleep:97,hrv:57},
  {date:'2023-06-14',score:69,state:'HIGH',activity:69,sleep:99,hrv:62},
  {date:'2023-06-15',score:91,state:'HIGH',activity:91,sleep:98,hrv:56},
  {date:'2023-06-16',score:100,state:'HIGH',activity:100,sleep:96,hrv:52},
  {date:'2023-06-17',score:100,state:'HIGH',activity:100,sleep:97,hrv:61},
  {date:'2023-06-29',score:52,state:'MEDIUM',activity:52,sleep:89,hrv:46},
  {date:'2023-06-30',score:55,state:'MEDIUM',activity:55,sleep:95,hrv:70},
  {date:'2023-07-01',score:37,state:'MEDIUM',activity:37,sleep:96,hrv:56},
  {date:'2023-07-01',score:37,state:'MEDIUM',activity:37,sleep:96,hrv:56},
  {date:'2023-07-03',score:67,state:'HIGH',activity:67,sleep:92,hrv:72},
  {date:'2023-07-04',score:84,state:'HIGH',activity:84,sleep:93,hrv:71},
  {date:'2023-07-05',score:91,state:'HIGH',activity:91,sleep:96,hrv:62},
  {date:'2023-07-08',score:1,state:'LOW',activity:0,sleep:35,hrv:37},
  {date:'2023-07-09',score:9,state:'LOW',activity:9,sleep:70,hrv:39},
  {date:'2023-07-10',score:51,state:'MEDIUM',activity:51,sleep:61,hrv:45},
  {date:'2023-07-11',score:64,state:'MEDIUM',activity:64,sleep:84,hrv:46},
  {date:'2023-07-12',score:78,state:'HIGH',activity:78,sleep:97,hrv:47},
  {date:'2023-07-13',score:68,state:'HIGH',activity:68,sleep:95,hrv:50},
  {date:'2023-07-24',score:82,state:'HIGH',activity:82,sleep:99,hrv:49},
  {date:'2023-08-01',score:100,state:'HIGH',activity:100,sleep:97,hrv:51},
  {date:'2023-08-01',score:100,state:'HIGH',activity:100,sleep:97,hrv:51}
];

const respiratoryData = [
  {date:'2022-12-28',rr:17.4},
  {date:'2022-12-29',rr:17.6},
  {date:'2022-12-30',rr:19.4},
  {date:'2022-12-31',rr:17.4},
  {date:'2023-01-03',rr:17.0},
  {date:'2023-01-04',rr:17.4},
  {date:'2023-01-05',rr:14.6},
  {date:'2023-01-07',rr:17.0},
  {date:'2023-01-08',rr:15.8},
  {date:'2023-01-09',rr:18.8},
  {date:'2023-01-10',rr:16.0},
  {date:'2023-01-11',rr:17.2},
  {date:'2023-01-12',rr:16.6},
  {date:'2023-01-15',rr:16.4},
  {date:'2023-01-16',rr:18.8},
  {date:'2023-01-17',rr:15.6},
  {date:'2023-01-18',rr:18.4},
  {date:'2023-01-23',rr:17.0},
  {date:'2023-01-24',rr:15.8},
  {date:'2023-01-25',rr:16.0},
  {date:'2023-01-26',rr:17.6},
  {date:'2023-01-28',rr:16.6},
  {date:'2023-01-29',rr:17.4},
  {date:'2023-01-30',rr:17.4},
  {date:'2023-01-31',rr:15.8},
  {date:'2023-02-02',rr:17.4},
  {date:'2023-02-03',rr:15.4},
  {date:'2023-02-04',rr:15.4},
  {date:'2023-02-05',rr:13.2},
  {date:'2023-02-06',rr:17.2},
  {date:'2023-02-07',rr:16.4},
  {date:'2023-02-08',rr:16.6},
  {date:'2023-02-09',rr:14.2},
  {date:'2023-02-10',rr:17.6},
  {date:'2023-02-11',rr:16.6},
  {date:'2023-02-12',rr:16.2},
  {date:'2023-02-13',rr:18.6},
  {date:'2023-02-14',rr:17.4},
  {date:'2023-02-15',rr:17.0},
  {date:'2023-02-17',rr:17.8},
  {date:'2023-02-18',rr:18.8},
  {date:'2023-05-13',rr:16.8},
  {date:'2023-05-14',rr:16.8},
  {date:'2023-05-15',rr:16.6},
  {date:'2023-05-16',rr:16.2},
  {date:'2023-05-17',rr:17.6},
  {date:'2023-05-22',rr:18.0},
  {date:'2023-05-23',rr:18.8},
  {date:'2023-05-24',rr:17.6},
  {date:'2023-05-25',rr:17.8},
  {date:'2023-05-26',rr:16.4},
  {date:'2023-05-28',rr:15.6},
  {date:'2023-05-29',rr:14.4},
  {date:'2023-05-30',rr:16.0},
  {date:'2023-05-31',rr:15.6},
  {date:'2023-06-01',rr:16.2},
  {date:'2023-06-02',rr:17.0},
  {date:'2023-06-03',rr:16.0},
  {date:'2023-06-04',rr:16.6},
  {date:'2023-06-05',rr:17.4},
  {date:'2023-06-06',rr:15.6},
  {date:'2023-06-07',rr:17.8},
  {date:'2023-06-08',rr:17.4},
  {date:'2023-06-09',rr:18.4},
  {date:'2023-06-11',rr:18.8},
  {date:'2023-06-12',rr:17.0},
  {date:'2023-06-13',rr:17.4},
  {date:'2023-06-14',rr:15.8},
  {date:'2023-06-15',rr:14.0},
  {date:'2023-06-16',rr:16.8},
  {date:'2023-06-17',rr:14.6},
  {date:'2023-06-25',rr:17.4},
  {date:'2023-06-26',rr:17.4},
  {date:'2023-06-28',rr:17.0},
  {date:'2023-06-29',rr:17.2},
  {date:'2023-06-30',rr:15.6},
  {date:'2023-07-01',rr:17.0},
  {date:'2023-07-03',rr:15.4},
  {date:'2023-07-04',rr:16.2},
  {date:'2023-07-05',rr:15.2},
  {date:'2023-07-07',rr:17.0},
  {date:'2023-07-08',rr:18.2},
  {date:'2023-07-09',rr:16.4},
  {date:'2023-07-10',rr:15.8},
  {date:'2023-07-11',rr:18.0},
  {date:'2023-07-12',rr:16.0},
  {date:'2023-07-18',rr:14.8},
  {date:'2023-07-19',rr:16.4},
  {date:'2023-07-23',rr:16.4},
  {date:'2023-07-24',rr:16.2},
  {date:'2023-07-27',rr:16.6},
  {date:'2023-07-30',rr:15.0},
  {date:'2023-07-31',rr:16.0},
  {date:'2023-08-01',rr:16.8},
  {date:'2023-08-08',rr:17.4},
  {date:'2023-08-09',rr:17.6},
  {date:'2023-08-12',rr:16.6},
  {date:'2023-08-19',rr:16.4},
  {date:'2023-08-20',rr:16.4},
  {date:'2023-08-21',rr:17.8},
  {date:'2023-09-11',rr:17.0},
  {date:'2023-09-23',rr:17.2},
  {date:'2023-09-30',rr:15.6},
  {date:'2023-10-01',rr:15.8},
  {date:'2024-01-29',rr:17.2},
  {date:'2024-01-30',rr:16.2},
  {date:'2024-01-31',rr:16.4},
  {date:'2024-02-01',rr:14.2},
  {date:'2024-02-03',rr:17.6},
  {date:'2024-02-04',rr:17.0},
  {date:'2024-02-06',rr:16.8},
  {date:'2024-02-07',rr:15.4},
  {date:'2024-02-18',rr:18.6},
  {date:'2024-02-19',rr:14.4},
  {date:'2024-02-20',rr:15.8},
  {date:'2024-02-21',rr:15.8},
  {date:'2024-02-22',rr:17.8},
  {date:'2024-02-23',rr:17.4},
  {date:'2024-02-26',rr:16.4},
  {date:'2024-02-27',rr:16.0},
  {date:'2024-02-28',rr:17.4},
  {date:'2024-02-29',rr:17.6},
  {date:'2024-03-01',rr:17.8},
  {date:'2024-03-21',rr:16.6},
  {date:'2024-03-22',rr:14.4},
  {date:'2024-03-23',rr:14.4},
  {date:'2024-03-24',rr:16.0},
  {date:'2024-03-25',rr:13.2},
  {date:'2024-03-26',rr:16.0},
  {date:'2024-03-27',rr:17.0},
  {date:'2024-03-28',rr:16.8},
  {date:'2024-03-30',rr:16.6},
  {date:'2024-03-31',rr:16.6},
  {date:'2025-12-15',rr:16.6},
  {date:'2025-12-16',rr:14.6},
  {date:'2025-12-17',rr:18.0},
  {date:'2025-12-18',rr:15.4},
  {date:'2025-12-19',rr:18.8},
  {date:'2025-12-20',rr:16.4},
  {date:'2025-12-21',rr:14.0},
  {date:'2025-12-22',rr:16.6},
  {date:'2025-12-23',rr:14.6},
  {date:'2025-12-24',rr:15.2},
  {date:'2025-12-25',rr:15.0},
  {date:'2025-12-26',rr:16.0},
  {date:'2025-12-27',rr:16.0},
  {date:'2025-12-28',rr:16.6},
  {date:'2025-12-29',rr:15.0},
  {date:'2025-12-31',rr:16.0},
  {date:'2026-01-01',rr:17.6},
  {date:'2026-01-02',rr:16.6},
  {date:'2026-01-03',rr:15.4},
  {date:'2026-01-04',rr:15.4},
  {date:'2026-01-05',rr:14.4},
  {date:'2026-01-06',rr:14.2},
  {date:'2026-01-07',rr:17.4},
  {date:'2026-01-08',rr:17.4},
  {date:'2026-01-09',rr:15.4},
  {date:'2026-01-10',rr:17.2},
  {date:'2026-01-11',rr:17.0},
  {date:'2026-01-12',rr:18.0},
  {date:'2026-01-13',rr:17.2},
  {date:'2026-01-14',rr:16.4},
  {date:'2026-01-15',rr:17.0},
  {date:'2026-01-16',rr:17.0},
  {date:'2026-01-19',rr:16.2},
  {date:'2026-01-20',rr:14.6},
  {date:'2026-01-21',rr:15.8},
  {date:'2026-01-22',rr:14.4},
  {date:'2026-01-23',rr:15.6},
  {date:'2026-01-24',rr:15.2},
  {date:'2026-01-25',rr:15.0},
  {date:'2026-01-26',rr:15.2},
  {date:'2026-01-27',rr:14.8}
];

const hrAlerts = [
  {date:'2026-01-28',time:'15:12-15:22',type:'LOW',threshold:50,value:44},
  {date:'2026-01-28',time:'16:15-16:25',type:'LOW',threshold:50,value:46}
];
// ============================================================
// UTILITY FUNCTIONS
// ============================================================

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
};

const getHRVStatus = (hrv) => {
  if (hrv >= 20) return { label: 'Excellent', color: '#10b981', bg: 'bg-emerald-500/20' };
  if (hrv >= 15) return { label: 'Good', color: '#22c55e', bg: 'bg-green-500/20' };
  if (hrv >= 12) return { label: 'Fair', color: '#eab308', bg: 'bg-yellow-500/20' };
  return { label: 'Low', color: '#ef4444', bg: 'bg-red-500/20' };
};

const getBodyFatStatus = (bf) => {
  if (bf < 20) return { label: 'Athletic', color: '#10b981' };
  if (bf < 25) return { label: 'Fit', color: '#22c55e' };
  if (bf < 28) return { label: 'Average', color: '#eab308' };
  return { label: 'Above Avg', color: '#f97316' };
};

// ============================================================
// CUSTOM TOOLTIP COMPONENT
// ============================================================

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
        <p className="text-cyan-400 font-semibold mb-1">{formatDate(label)}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }} className="text-sm">
            {entry.name}: <span className="font-bold">{typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ============================================================
// DETAIL MODAL COMPONENT
// ============================================================

const DetailModal = ({ isOpen, onClose, data, type }) => {
  if (!isOpen || !data) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl p-6 max-w-lg w-full border border-cyan-500/30 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-cyan-400">{formatDate(data.date)}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={24} /></button>
        </div>
        
        {type === 'hrv' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm">HRV (RMSSD)</div>
                <div className="text-3xl font-bold" style={{ color: getHRVStatus(data.rmssd).color }}>{data.rmssd.toFixed(1)} ms</div>
                <div className="text-sm mt-1" style={{ color: getHRVStatus(data.rmssd).color }}>{getHRVStatus(data.rmssd).label}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm">Sleep HR</div>
                <div className="text-3xl font-bold text-pink-400">{data.nremhr.toFixed(1)} bpm</div>
                <div className="text-sm mt-1 text-slate-400">{data.nremhr < 65 ? 'Excellent recovery' : data.nremhr < 70 ? 'Good' : 'Elevated'}</div>
              </div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-slate-400 text-sm">Entropy</div>
              <div className="text-2xl font-bold text-purple-400">{data.entropy.toFixed(3)}</div>
              <div className="text-sm mt-1 text-slate-400">Heart rhythm complexity</div>
            </div>
          </div>
        )}
        
        {type === 'scale' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm">Weight</div>
                <div className="text-3xl font-bold text-cyan-400">{data.weight} lbs</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm">Body Fat</div>
                <div className="text-3xl font-bold" style={{ color: getBodyFatStatus(data.bodyFat).color }}>{data.bodyFat}%</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-slate-400 text-xs">Muscle</div>
                <div className="text-lg font-bold text-green-400">{data.muscle} lbs</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-slate-400 text-xs">Visceral</div>
                <div className="text-lg font-bold" style={{ color: data.visceral <= 9 ? '#10b981' : data.visceral <= 12 ? '#eab308' : '#ef4444' }}>{data.visceral}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-slate-400 text-xs">Meta Age</div>
                <div className="text-lg font-bold text-purple-400">{data.metaAge}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Water</div>
                <div className="text-lg font-bold text-blue-400">{data.water}%</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-slate-400 text-xs">BMR</div>
                <div className="text-lg font-bold text-orange-400">{data.bmr} kcal</div>
              </div>
            </div>
          </div>
        )}
        
        {type === 'respiratory' && (
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-slate-400 text-sm">Respiratory Rate</div>
              <div className="text-4xl font-bold text-blue-400">{data.rr} brpm</div>
              <div className="text-sm mt-2 text-slate-400">
                {data.rr >= 12 && data.rr <= 20 ? '✅ Normal range (12-20)' : '⚠️ Outside normal range'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// STAT CARD COMPONENT
// ============================================================

const StatCard = ({ icon: Icon, label, value, subValue, color, trend, onClick }) => (
  <div 
    className={`bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-105' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-2">
      <Icon className={color} size={20} />
      {trend && (
        <div className={`flex items-center ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="text-xs ml-1">{Math.abs(trend).toFixed(1)}%</span>
        </div>
      )}
    </div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-slate-400 text-sm">{label}</div>
    {subValue && <div className="text-xs text-slate-500 mt-1">{subValue}</div>}
  </div>
);

// ============================================================
// PERSONAL BEST CARD COMPONENT
// ============================================================

const PersonalBestCard = ({ icon: Icon, title, value, date, color }) => (
  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-yellow-500/30 hover:border-yellow-500/60 transition-all">
    <div className="flex items-center gap-2 mb-2">
      <Trophy className="text-yellow-500" size={18} />
      <span className="text-yellow-500 text-sm font-semibold">Personal Best</span>
    </div>
    <div className="flex items-center gap-3">
      <Icon className={color} size={24} />
      <div>
        <div className={`text-xl font-bold ${color}`}>{value}</div>
        <div className="text-slate-400 text-sm">{title}</div>
        <div className="text-slate-500 text-xs">{formatDate(date)}</div>
      </div>
    </div>
  </div>
);

// ============================================================
// MAIN APP COMPONENT
// ============================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [timeRange, setTimeRange] = useState('all');

  // Computed stats
  const stats = useMemo(() => {
    const recentHRV = hrvDailyData.slice(-30);
    const avgHRV = hrvDailyData.reduce((a, b) => a + b.rmssd, 0) / hrvDailyData.length;
    const avgRecentHRV = recentHRV.reduce((a, b) => a + b.rmssd, 0) / recentHRV.length;
    const bestHRV = Math.max(...hrvDailyData.map(d => d.rmssd));
    const bestHRVDay = hrvDailyData.find(d => d.rmssd === bestHRV);
    const lowestSleepHR = Math.min(...hrvDailyData.map(d => d.nremhr));
    const lowestSleepHRDay = hrvDailyData.find(d => d.nremhr === lowestSleepHR);
    
    const latestScale = scaleData[scaleData.length - 1];
    const lowestWeight = Math.min(...scaleData.map(d => d.weight));
    const lowestWeightDay = scaleData.find(d => d.weight === lowestWeight);
    const lowestBF = Math.min(...scaleData.map(d => d.bodyFat));
    const lowestBFDay = scaleData.find(d => d.bodyFat === lowestBF);
    const lowestVisceral = Math.min(...scaleData.map(d => d.visceral));
    const lowestVisceralDay = scaleData.find(d => d.visceral === lowestVisceral);
    const highestMuscle = Math.max(...scaleData.map(d => d.muscle));
    const highestMuscleDay = scaleData.find(d => d.muscle === highestMuscle);
    
    const readyHighDays = readinessData.filter(d => d.state === 'HIGH').length;
    const perfectDays = readinessData.filter(d => d.score === 100).length;
    
    const hrvAbove20 = hrvDailyData.filter(d => d.rmssd >= 20).length;
    const hrvAbove15 = hrvDailyData.filter(d => d.rmssd >= 15).length;
    
    const avgRR = respiratoryData.reduce((a, b) => a + b.rr, 0) / respiratoryData.length;
    const rrInRange = respiratoryData.filter(d => d.rr >= 12 && d.rr <= 20).length;
    
    return {
      avgHRV, avgRecentHRV, bestHRV, bestHRVDay, lowestSleepHR, lowestSleepHRDay,
      latestScale, lowestWeight, lowestWeightDay, lowestBF, lowestBFDay,
      lowestVisceral, lowestVisceralDay, highestMuscle, highestMuscleDay,
      readyHighDays, perfectDays, hrvAbove20, hrvAbove15,
      totalNights: hrvDailyData.length,
      totalWeighIns: scaleData.length,
      totalRR: respiratoryData.length,
      avgRR, rrInRange
    };
  }, []);

  // Filter data by time range
  const filteredHRV = useMemo(() => {
    if (timeRange === 'all') return hrvDailyData;
    const cutoff = new Date();
    if (timeRange === '30d') cutoff.setDate(cutoff.getDate() - 30);
    if (timeRange === '90d') cutoff.setDate(cutoff.getDate() - 90);
    if (timeRange === '1y') cutoff.setFullYear(cutoff.getFullYear() - 1);
    return hrvDailyData.filter(d => new Date(d.date) >= cutoff);
  }, [timeRange]);

  const handleDataClick = (data, type) => {
    setSelectedData(data);
    setModalType(type);
  };

  // Combined data for correlation chart
  const combinedData = useMemo(() => {
    const hrvMap = new Map(hrvDailyData.map(d => [d.date, d]));
    const scaleMap = new Map(scaleData.map(d => [d.date, d]));
    
    return hrvDailyData.map(hrv => ({
      ...hrv,
      ...(scaleMap.get(hrv.date) || {})
    })).filter(d => d.weight);
  }, []);

  // Monthly HRV stats
  const monthlyHRV = useMemo(() => {
    const monthly = {};
    hrvDailyData.forEach(d => {
      const month = d.date.substring(0, 7);
      if (!monthly[month]) monthly[month] = { sum: 0, count: 0, best: 0 };
      monthly[month].sum += d.rmssd;
      monthly[month].count++;
      monthly[month].best = Math.max(monthly[month].best, d.rmssd);
    });
    return Object.entries(monthly).map(([month, data]) => ({
      month,
      avg: data.sum / data.count,
      best: data.best,
      count: data.count
    })).sort((a, b) => a.month.localeCompare(b.month));
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'hrv', label: 'HRV Deep Dive', icon: Heart },
    { id: 'body', label: 'Body Composition', icon: Scale },
    { id: 'respiratory', label: 'Respiratory', icon: Wind },
    { id: 'wins', label: '🏆 Wins & PRs', icon: Trophy },
    { id: 'correlations', label: 'Correlations', icon: Brain },
    { id: 'shane', label: '😎 For Shane', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                TRUONO HEALTH LAB
              </h1>
              <p className="text-slate-400 text-sm">{stats.totalNights} nights • {stats.totalWeighIns} weigh-ins • {stats.totalRR} respiratory readings</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-cyan-400 font-mono">EAT THIS SHANE! 🔥</div>
              <div className="text-xs text-slate-500">Last updated: Jan 28, 2026</div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-1 mt-4 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Time Range Filter */}
        {['overview', 'hrv', 'correlations'].includes(activeTab) && (
          <div className="flex gap-2 mb-6">
            {[
              { id: 'all', label: 'All Time' },
              { id: '1y', label: '1 Year' },
              { id: '90d', label: '90 Days' },
              { id: '30d', label: '30 Days' }
            ].map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  timeRange === range.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Alert Banner */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-yellow-500 flex-shrink-0" size={24} />
                <div>
                  <div className="font-semibold text-yellow-400">Recovery Mode Active</div>
                  <div className="text-sm text-slate-300">Recent HRV dip detected — but you've bounced back from worse before! Your Jan 25th reading (21.04 ms) proves your system still works.</div>
                </div>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Heart} label="Current HRV" value={`${hrvDailyData[hrvDailyData.length-1].rmssd.toFixed(1)} ms`} subValue={formatDate(hrvDailyData[hrvDailyData.length-1].date)} color="text-cyan-400" />
              <StatCard icon={Scale} label="Current Weight" value={`${stats.latestScale.weight} lbs`} subValue={`${stats.latestScale.bodyFat}% body fat`} color="text-purple-400" />
              <StatCard icon={Activity} label="Nights Tracked" value={stats.totalNights} subValue="3+ years of HRV data" color="text-green-400" />
              <StatCard icon={Trophy} label="Perfect Days" value={stats.perfectDays} subValue="100% readiness score" color="text-yellow-400" />
            </div>

            {/* Main Charts Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* HRV Trend */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart className="text-cyan-400" size={20} />
                  HRV Trend
                  <span className="text-xs text-slate-500 ml-auto">Click points to drill down</span>
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={filteredHRV}>
                    <defs>
                      <linearGradient id="hrvGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={d => formatDate(d)} />
                    <YAxis tick={{ fill: '#94a3b8' }} domain={[0, 55]} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={20} stroke="#22c55e" strokeDasharray="5 5" label={{ value: 'Excellent', fill: '#22c55e', fontSize: 10 }} />
                    <ReferenceLine y={15} stroke="#eab308" strokeDasharray="5 5" />
                    <Area type="monotone" dataKey="rmssd" stroke="#06b6d4" fill="url(#hrvGradient)" strokeWidth={2} name="HRV (ms)"
                      activeDot={{ r: 6, cursor: 'pointer', onClick: (e, payload) => handleDataClick(payload.payload, 'hrv') }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Weight Trend */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Scale className="text-purple-400" size={20} />
                  Weight Journey ({stats.totalWeighIns} weigh-ins)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={scaleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={d => formatDate(d)} />
                    <YAxis yAxisId="left" tick={{ fill: '#94a3b8' }} domain={[165, 195]} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8' }} domain={[20, 30]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area yAxisId="left" type="monotone" dataKey="weight" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} name="Weight (lbs)"
                      activeDot={{ r: 6, cursor: 'pointer', onClick: (e, payload) => handleDataClick(payload.payload, 'scale') }} />
                    <Line yAxisId="right" type="monotone" dataKey="bodyFat" stroke="#f97316" strokeWidth={2} dot={false} name="Body Fat %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Personal Bests Row */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                Personal Records Achieved
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <PersonalBestCard icon={Heart} title="Best HRV" value={`${stats.bestHRV.toFixed(1)} ms`} date={stats.bestHRVDay.date} color="text-cyan-400" />
                <PersonalBestCard icon={Moon} title="Lowest Sleep HR" value={`${stats.lowestSleepHR.toFixed(1)} bpm`} date={stats.lowestSleepHRDay.date} color="text-pink-400" />
                <PersonalBestCard icon={Scale} title="Lowest Weight" value={`${stats.lowestWeight} lbs`} date={stats.lowestWeightDay.date} color="text-purple-400" />
                <PersonalBestCard icon={Flame} title="Lowest Body Fat" value={`${stats.lowestBF}%`} date={stats.lowestBFDay.date} color="text-orange-400" />
              </div>
            </div>
          </div>
        )}

        {/* HRV DEEP DIVE TAB */}
        {activeTab === 'hrv' && (
          <div className="space-y-6">
            {/* HRV Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatCard icon={Heart} label="All-Time Avg" value={`${stats.avgHRV.toFixed(1)} ms`} color="text-cyan-400" />
              <StatCard icon={TrendingUp} label="Peak HRV" value={`${stats.bestHRV.toFixed(1)} ms`} subValue={formatDate(stats.bestHRVDay.date)} color="text-green-400" />
              <StatCard icon={CheckCircle} label="Excellent Days" value={stats.hrvAbove20} subValue={`${(stats.hrvAbove20/stats.totalNights*100).toFixed(1)}% of nights`} color="text-emerald-400" />
              <StatCard icon={Target} label="Good Days" value={stats.hrvAbove15} subValue={`${(stats.hrvAbove15/stats.totalNights*100).toFixed(1)}% of nights`} color="text-yellow-400" />
              <StatCard icon={Moon} label="Best Sleep HR" value={`${stats.lowestSleepHR.toFixed(1)} bpm`} subValue={formatDate(stats.lowestSleepHRDay.date)} color="text-pink-400" />
            </div>

            {/* Full HRV Timeline */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <h3 className="text-lg font-semibold mb-4">Complete HRV Timeline ({stats.totalNights} nights)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={filteredHRV}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={d => formatDate(d)} />
                  <YAxis yAxisId="left" tick={{ fill: '#94a3b8' }} domain={[0, 55]} label={{ value: 'HRV (ms)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8' }} domain={[50, 95]} label={{ value: 'Sleep HR (bpm)', angle: 90, position: 'insideRight', fill: '#94a3b8' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine yAxisId="left" y={20} stroke="#22c55e" strokeDasharray="5 5" />
                  <ReferenceLine yAxisId="left" y={15} stroke="#eab308" strokeDasharray="5 5" />
                  <Bar yAxisId="left" dataKey="rmssd" fill="#06b6d4" fillOpacity={0.7} name="HRV (ms)" 
                    onClick={(data) => handleDataClick(data, 'hrv')} cursor="pointer" />
                  <Line yAxisId="right" type="monotone" dataKey="nremhr" stroke="#ec4899" strokeWidth={2} dot={false} name="Sleep HR (bpm)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Analysis */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <h3 className="text-lg font-semibold mb-4">Monthly HRV Performance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyHRV}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avg" fill="#06b6d4" name="Average HRV" />
                  <Bar dataKey="best" fill="#22c55e" name="Best Day" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* BODY COMPOSITION TAB */}
        {activeTab === 'body' && (
          <div className="space-y-6">
            {/* Current Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Scale} label="Current Weight" value={`${stats.latestScale.weight} lbs`} color="text-purple-400" />
              <StatCard icon={Flame} label="Body Fat" value={`${stats.latestScale.bodyFat}%`} color="text-orange-400" />
              <StatCard icon={Dumbbell} label="Muscle Mass" value={`${stats.latestScale.muscle} lbs`} color="text-green-400" />
              <StatCard icon={Target} label="Visceral Fat" value={stats.latestScale.visceral} subValue={stats.latestScale.visceral <= 9 ? '✅ Healthy' : '⚠️ Monitor'} color="text-yellow-400" />
            </div>

            {/* Transformation Story */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <div>
                  <div className="font-semibold text-green-400">2024 Transformation Achieved!</div>
                  <div className="text-sm text-slate-300">You dropped from 187 → 169 lbs, got to 22.9% body fat, and hit visceral fat level 9 (healthy range). Your body knows how to get there!</div>
                </div>
              </div>
            </div>

            {/* Weight & Body Fat Trend */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <h3 className="text-lg font-semibold mb-4">Complete Weight Journey ({stats.totalWeighIns} weigh-ins)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={scaleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={d => formatDate(d)} />
                  <YAxis yAxisId="left" tick={{ fill: '#94a3b8' }} domain={[165, 195]} label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8' }} domain={[20, 30]} label={{ value: 'Body Fat %', angle: 90, position: 'insideRight', fill: '#94a3b8' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine yAxisId="left" y={169.2} stroke="#22c55e" strokeDasharray="5 5" label={{ value: 'PR: 169.2', fill: '#22c55e', fontSize: 10 }} />
                  <Area yAxisId="left" type="monotone" dataKey="weight" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} name="Weight"
                    activeDot={{ r: 6, cursor: 'pointer', onClick: (e, payload) => handleDataClick(payload.payload, 'scale') }} />
                  <Line yAxisId="right" type="monotone" dataKey="bodyFat" stroke="#f97316" strokeWidth={2} dot={false} name="Body Fat %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Body Composition PRs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <PersonalBestCard icon={Scale} title="Lowest Weight" value={`${stats.lowestWeight} lbs`} date={stats.lowestWeightDay.date} color="text-purple-400" />
              <PersonalBestCard icon={Flame} title="Lowest Body Fat" value={`${stats.lowestBF}%`} date={stats.lowestBFDay.date} color="text-orange-400" />
              <PersonalBestCard icon={Target} title="Best Visceral" value={`Level ${stats.lowestVisceral}`} date={stats.lowestVisceralDay.date} color="text-green-400" />
              <PersonalBestCard icon={Dumbbell} title="Peak Muscle" value={`${stats.highestMuscle} lbs`} date={stats.highestMuscleDay.date} color="text-cyan-400" />
            </div>
          </div>
        )}

        {/* RESPIRATORY TAB */}
        {activeTab === 'respiratory' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Wind} label="Total Readings" value={stats.totalRR} color="text-blue-400" />
              <StatCard icon={CheckCircle} label="In Normal Range" value={`${stats.rrInRange}/${stats.totalRR}`} subValue="100% normal!" color="text-green-400" />
              <StatCard icon={Activity} label="Average Rate" value={`${stats.avgRR.toFixed(1)} brpm`} subValue="Normal: 12-20" color="text-cyan-400" />
              <StatCard icon={Target} label="Stability" value="Excellent" subValue="Low variation" color="text-emerald-400" />
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <div>
                  <div className="font-semibold text-green-400">Perfect Respiratory Health!</div>
                  <div className="text-sm text-slate-300">100% of your {stats.totalRR} respiratory rate readings fall within the healthy 12-20 breaths/min range. This indicates excellent autonomic nervous system function during sleep.</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <h3 className="text-lg font-semibold mb-4">Respiratory Rate Over Time ({stats.totalRR} readings)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={respiratoryData}>
                  <defs>
                    <linearGradient id="rrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={d => formatDate(d)} />
                  <YAxis tick={{ fill: '#94a3b8' }} domain={[10, 22]} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={12} stroke="#22c55e" strokeDasharray="5 5" label={{ value: 'Min Normal', fill: '#22c55e', fontSize: 10 }} />
                  <ReferenceLine y={20} stroke="#22c55e" strokeDasharray="5 5" label={{ value: 'Max Normal', fill: '#22c55e', fontSize: 10 }} />
                  <Area type="monotone" dataKey="rr" stroke="#3b82f6" fill="url(#rrGradient)" strokeWidth={2} name="Respiratory Rate"
                    activeDot={{ r: 6, cursor: 'pointer', onClick: (e, payload) => handleDataClick(payload.payload, 'respiratory') }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* WINS & PRS TAB */}
        {activeTab === 'wins' && (
          <div className="space-y-6">
            <div className="text-center py-6">
              <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                🏆 HALL OF FAME 🏆
              </h2>
              <p className="text-slate-400">Every Personal Record You've Achieved</p>
            </div>

            {/* Fitness PRs */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <Heart className="text-cyan-400" size={24} />
                Heart & Recovery Records
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-cyan-500/30">
                  <div className="text-4xl font-black text-cyan-400">{stats.bestHRV.toFixed(1)} ms</div>
                  <div className="text-slate-400">Best HRV Reading</div>
                  <div className="text-sm text-yellow-400">{formatDate(stats.bestHRVDay.date)}</div>
                  <div className="text-xs text-slate-500 mt-2">Athlete-level performance!</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-pink-500/30">
                  <div className="text-4xl font-black text-pink-400">{stats.lowestSleepHR.toFixed(1)} bpm</div>
                  <div className="text-slate-400">Lowest Sleep HR</div>
                  <div className="text-sm text-yellow-400">{formatDate(stats.lowestSleepHRDay.date)}</div>
                  <div className="text-xs text-slate-500 mt-2">Elite recovery!</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-green-500/30">
                  <div className="text-4xl font-black text-green-400">{stats.perfectDays}×</div>
                  <div className="text-slate-400">Perfect 100 Days</div>
                  <div className="text-sm text-slate-500">Readiness Score</div>
                  <div className="text-xs text-slate-500 mt-2">Peak performance achieved!</div>
                </div>
              </div>
            </div>

            {/* Body PRs */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                <Scale className="text-purple-400" size={24} />
                Body Composition Records
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-purple-500/30">
                  <div className="text-3xl font-black text-purple-400">{stats.lowestWeight} lbs</div>
                  <div className="text-slate-400">Lowest Weight</div>
                  <div className="text-sm text-yellow-400">{formatDate(stats.lowestWeightDay.date)}</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-orange-500/30">
                  <div className="text-3xl font-black text-orange-400">{stats.lowestBF}%</div>
                  <div className="text-slate-400">Lowest Body Fat</div>
                  <div className="text-sm text-yellow-400">{formatDate(stats.lowestBFDay.date)}</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-green-500/30">
                  <div className="text-3xl font-black text-green-400">Level {stats.lowestVisceral}</div>
                  <div className="text-slate-400">Best Visceral Fat</div>
                  <div className="text-sm text-yellow-400">{formatDate(stats.lowestVisceralDay.date)}</div>
                  <div className="text-xs text-green-400 mt-1">✅ Healthy Range!</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-cyan-500/30">
                  <div className="text-3xl font-black text-cyan-400">{stats.highestMuscle} lbs</div>
                  <div className="text-slate-400">Peak Muscle Mass</div>
                  <div className="text-sm text-yellow-400">{formatDate(stats.highestMuscleDay.date)}</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-400" size={24} />
                Achievements Unlocked
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-slate-800 rounded-lg p-4">
                  <div className="text-3xl">💪</div>
                  <div>
                    <div className="font-bold text-white">18-Pound Transformation</div>
                    <div className="text-sm text-slate-400">Dropped from 187 → 169 lbs in 2024</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-800 rounded-lg p-4">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <div className="font-bold text-white">Healthy Visceral Fat</div>
                    <div className="text-sm text-slate-400">Achieved level 9 (under 10 = healthy)</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-800 rounded-lg p-4">
                  <div className="text-3xl">🌬️</div>
                  <div>
                    <div className="font-bold text-white">100% Normal Respiratory</div>
                    <div className="text-sm text-slate-400">All {stats.totalRR} readings in healthy range</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-800 rounded-lg p-4">
                  <div className="text-3xl">📊</div>
                  <div>
                    <div className="font-bold text-white">Data Dedication</div>
                    <div className="text-sm text-slate-400">{stats.totalNights} nights + {stats.totalWeighIns} weigh-ins tracked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CORRELATIONS TAB */}
        {activeTab === 'correlations' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <h3 className="text-lg font-semibold mb-4">HRV vs Weight (Days with Both Measurements)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" dataKey="weight" name="Weight" tick={{ fill: '#94a3b8' }} domain={[165, 195]} label={{ value: 'Weight (lbs)', position: 'bottom', fill: '#94a3b8' }} />
                  <YAxis type="number" dataKey="rmssd" name="HRV" tick={{ fill: '#94a3b8' }} domain={[5, 35]} label={{ value: 'HRV (ms)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ payload }) => {
                    if (payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
                          <p className="text-cyan-400 font-semibold">{formatDate(d.date)}</p>
                          <p className="text-purple-400">Weight: {d.weight} lbs</p>
                          <p className="text-cyan-400">HRV: {d.rmssd?.toFixed(1)} ms</p>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Scatter data={combinedData} fill="#06b6d4">
                    {combinedData.map((entry, index) => (
                      <Cell key={index} fill={entry.rmssd >= 20 ? '#22c55e' : entry.rmssd >= 15 ? '#eab308' : '#ef4444'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="text-center mt-2 text-sm text-slate-400">
                Pattern: Your best HRV readings tend to occur at lower weights
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <h3 className="text-lg font-semibold mb-4">HRV vs Sleep Heart Rate (Inverse Relationship)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" dataKey="nremhr" name="Sleep HR" tick={{ fill: '#94a3b8' }} domain={[50, 95]} label={{ value: 'Sleep HR (bpm)', position: 'bottom', fill: '#94a3b8' }} />
                  <YAxis type="number" dataKey="rmssd" name="HRV" tick={{ fill: '#94a3b8' }} domain={[5, 55]} label={{ value: 'HRV (ms)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip />
                  <Scatter data={hrvDailyData} fill="#ec4899" />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="text-center mt-2 text-sm text-slate-400">
                Strong inverse correlation: Lower sleep HR = Higher HRV (better recovery)
              </div>
            </div>
          </div>
        )}

        {/* SHANE TAB */}
        {activeTab === 'shane' && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-8 max-w-2xl">
              <div className="text-6xl md:text-8xl font-black animate-pulse">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Tru...o..
                </span>
              </div>
              <div className="text-7xl md:text-9xl font-black">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-bounce inline-block">
                  No!!!
                </span>
              </div>
              <div className="text-5xl md:text-7xl font-black">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Reh!
                </span>
              </div>
              
              <div className="mt-12 pt-8 border-t border-slate-700">
                <div className="text-2xl text-slate-400 mb-4">Personal Stats Shane Can Only Dream Of:</div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-3xl font-bold text-cyan-400">{stats.bestHRV.toFixed(1)} ms</div>
                    <div className="text-sm text-slate-400">Peak HRV</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-400">{stats.lowestWeight} lbs</div>
                    <div className="text-sm text-slate-400">Lowest Weight</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-400">{stats.lowestBF}%</div>
                    <div className="text-sm text-slate-400">Lowest Body Fat</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-3xl font-bold text-yellow-400">{stats.totalNights}</div>
                    <div className="text-sm text-slate-400">Nights Tracked</div>
                  </div>
                </div>
              </div>
              
              <div className="text-lg text-slate-500 italic mt-8">
                "Some people track their health. Champions like Mike build entire dashboards about it."
              </div>
              
              <div className="text-4xl font-black text-red-500 mt-8 animate-pulse">
                🔥 EAT THIS SHANE! 🔥
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-6 text-center text-slate-500 text-sm">
        <p>Truono Health Lab • {stats.totalNights} nights + {stats.totalWeighIns} weigh-ins + {stats.totalRR} respiratory readings</p>
        <p className="text-xs mt-2">Not medical advice. Consult a healthcare professional for medical decisions.</p>
        <p className="text-cyan-400 text-xs mt-2 font-bold">🔥 EAT THIS SHANE! 🔥</p>
      </footer>

      {/* Detail Modal */}
      <DetailModal 
        isOpen={!!selectedData} 
        onClose={() => setSelectedData(null)} 
        data={selectedData} 
        type={modalType} 
      />
    </div>
  );
}
