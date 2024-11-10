/**
 * @typedef {string} ServiceProvider
 * @typedef {string} TimePeriod
 */

/**
 * Service providers and their data plans
 */

export const serviceProviders = {
    mtn: {
      id: 'mtn',
      name: 'MTN',
      icon: 'cellular',
      plans: {
        Daily: [
          { id: 'mtn_d1', data: '50MB', duration: '1 Day', price: 50, cashback: 1 },
          { id: 'mtn_d2', data: '100MB', duration: '1 Day', price: 100, cashback: 2 },
          { id: 'mtn_d3', data: '200MB', duration: '1 Day', price: 200, cashback: 4 },
          { id: 'mtn_d4', data: '500MB', duration: '1 Day', price: 300, cashback: 6 },
          { id: 'mtn_d5', data: '1GB', duration: '1 Day', price: 500, cashback: 10 },
          { id: 'mtn_d6', data: '2GB', duration: '1 Day', price: 800, cashback: 16 },
        ],
        Weekly: [
          { id: 'mtn_w1', data: '500MB', duration: '7 Days', price: 300, cashback: 6 },
          { id: 'mtn_w2', data: '1GB', duration: '7 Days', price: 500, cashback: 10 },
          { id: 'mtn_w3', data: '2GB', duration: '7 Days', price: 800, cashback: 16 },
          { id: 'mtn_w4', data: '3GB', duration: '7 Days', price: 1000, cashback: 20 },
          { id: 'mtn_w5', data: '5GB', duration: '7 Days', price: 1500, cashback: 30 },
          { id: 'mtn_w6', data: '10GB', duration: '7 Days', price: 2500, cashback: 50 },
        ],
        Monthly: [
          { id: 'mtn_m1', data: '1.5GB', duration: '30 Days', price: 1000, cashback: 20 },
          { id: 'mtn_m2', data: '3GB', duration: '30 Days', price: 1500, cashback: 30 },
          { id: 'mtn_m3', data: '6GB', duration: '30 Days', price: 2500, cashback: 50 },
          { id: 'mtn_m4', data: '10GB', duration: '30 Days', price: 3500, cashback: 70 },
          { id: 'mtn_m5', data: '20GB', duration: '30 Days', price: 5000, cashback: 100 },
          { id: 'mtn_m6', data: '40GB', duration: '30 Days', price: 8000, cashback: 160 },
        ],
        '2 Months': [
          { id: 'mtn_2m1', data: '15GB', duration: '60 Days', price: 4000, cashback: 80 },
          { id: 'mtn_2m2', data: '30GB', duration: '60 Days', price: 7000, cashback: 140 },
          { id: 'mtn_2m3', data: '50GB', duration: '60 Days', price: 10000, cashback: 200 },
          { id: 'mtn_2m4', data: '75GB', duration: '60 Days', price: 13000, cashback: 260 },
          { id: 'mtn_2m5', data: '100GB', duration: '60 Days', price: 16000, cashback: 320 },
          { id: 'mtn_2m6', data: '150GB', duration: '60 Days', price: 20000, cashback: 400 },
        ],
        '3 Months': [
          { id: 'mtn_3m1', data: '30GB', duration: '90 Days', price: 7500, cashback: 150 },
          { id: 'mtn_3m2', data: '50GB', duration: '90 Days', price: 10000, cashback: 200 },
          { id: 'mtn_3m3', data: '75GB', duration: '90 Days', price: 13500, cashback: 270 },
          { id: 'mtn_3m4', data: '100GB', duration: '90 Days', price: 17000, cashback: 340 },
          { id: 'mtn_3m5', data: '150GB', duration: '90 Days', price: 22000, cashback: 440 },
          { id: 'mtn_3m6', data: '200GB', duration: '90 Days', price: 27000, cashback: 540 },
        ],
        Yearly: [
          { id: 'mtn_y1', data: '200GB', duration: '365 Days', price: 50000, cashback: 1000 },
          { id: 'mtn_y2', data: '400GB', duration: '365 Days', price: 80000, cashback: 1600 },
          { id: 'mtn_y3', data: '600GB', duration: '365 Days', price: 110000, cashback: 2200 },
          { id: 'mtn_y4', data: '800GB', duration: '365 Days', price: 140000, cashback: 2800 },
          { id: 'mtn_y5', data: '1TB', duration: '365 Days', price: 170000, cashback: 3400 },
          { id: 'mtn_y6', data: '1.5TB', duration: '365 Days', price: 200000, cashback: 4000 },
        ],
      },
    },
    glo: {
      id: 'glo',
      name: 'Glo',
      icon: 'globe',
      plans: {
        Daily: [
          { id: 'glo_d1', data: '75MB', duration: '1 Day', price: 50, cashback: 1 },
          { id: 'glo_d2', data: '150MB', duration: '1 Day', price: 100, cashback: 2 },
          { id: 'glo_d3', data: '350MB', duration: '1 Day', price: 200, cashback: 4 },
          { id: 'glo_d4', data: '750MB', duration: '1 Day', price: 300, cashback: 6 },
          { id: 'glo_d5', data: '1.25GB', duration: '1 Day', price: 500, cashback: 10 },
          { id: 'glo_d6', data: '2.5GB', duration: '1 Day', price: 800, cashback: 16 },
        ],
        Weekly: [
          { id: 'glo_w1', data: '750MB', duration: '7 Days', price: 300, cashback: 6 },
          { id: 'glo_w2', data: '1.6GB', duration: '7 Days', price: 500, cashback: 10 },
          { id: 'glo_w3', data: '3GB', duration: '7 Days', price: 800, cashback: 16 },
          { id: 'glo_w4', data: '4.5GB', duration: '7 Days', price: 1000, cashback: 20 },
          { id: 'glo_w5', data: '7GB', duration: '7 Days', price: 1500, cashback: 30 },
          { id: 'glo_w6', data: '12GB', duration: '7 Days', price: 2500, cashback: 50 },
        ],
        Monthly: [
          { id: 'glo_m1', data: '2GB', duration: '30 Days', price: 1000, cashback: 20 },
          { id: 'glo_m2', data: '4.5GB', duration: '30 Days', price: 1500, cashback: 30 },
          { id: 'glo_m3', data: '8GB', duration: '30 Days', price: 2500, cashback: 50 },
          { id: 'glo_m4', data: '12GB', duration: '30 Days', price: 3500, cashback: 70 },
          { id: 'glo_m5', data: '25GB', duration: '30 Days', price: 5000, cashback: 100 },
          { id: 'glo_m6', data: '50GB', duration: '30 Days', price: 8000, cashback: 160 },
        ],
        '2 Months': [
          { id: 'glo_2m1', data: '18GB', duration: '60 Days', price: 4000, cashback: 80 },
          { id: 'glo_2m2', data: '36GB', duration: '60 Days', price: 7000, cashback: 140 },
          { id: 'glo_2m3', data: '60GB', duration: '60 Days', price: 10000, cashback: 200 },
          { id: 'glo_2m4', data: '90GB', duration: '60 Days', price: 13000, cashback: 260 },
          { id: 'glo_2m5', data: '120GB', duration: '60 Days', price: 16000, cashback: 320 },
          { id: 'glo_2m6', data: '180GB', duration: '60 Days', price: 20000, cashback: 400 },
        ],
        '3 Months': [
          { id: 'glo_3m1', data: '36GB', duration: '90 Days', price: 7500, cashback: 150 },
          { id: 'glo_3m2', data: '60GB', duration: '90 Days', price: 10000, cashback: 200 },
          { id: 'glo_3m3', data: '90GB', duration: '90 Days', price: 13500, cashback: 270 },
          { id: 'glo_3m4', data: '120GB', duration: '90 Days', price: 17000, cashback: 340 },
          { id: 'glo_3m5', data: '180GB', duration: '90 Days', price: 22000, cashback: 440 },
          { id: 'glo_3m6', data: '240GB', duration: '90 Days', price: 27000, cashback: 540 },
        ],
        Yearly: [
          { id: 'glo_y1', data: '240GB', duration: '365 Days', price: 50000, cashback: 1000 },
          { id: 'glo_y2', data: '480GB', duration: '365 Days', price: 80000, cashback: 1600 },
          { id: 'glo_y3', data: '720GB', duration: '365 Days', price: 110000, cashback: 2200 },
          { id: 'glo_y4', data: '960GB', duration: '365 Days', price: 140000, cashback: 2800 },
          { id: 'glo_y5', data: '1.2TB', duration: '365 Days', price: 170000, cashback: 3400 },
          { id: 'glo_y6', data: '1.8TB', duration: '365 Days', price: 200000, cashback: 4000 },
        ],
      },
    },
    airtel: {
      id: 'airtel',
      name: 'Airtel',
      icon: 'wifi',
      plans: {
        Daily: [
          { id: 'airtel_d1', data: '40MB', duration: '1 Day', price: 50, cashback: 1 },
          { id: 'airtel_d2', data: '100MB', duration: '1 Day', price: 100, cashback: 2 },
          { id: 'airtel_d3', data: '200MB', duration: '1 Day', price: 200, cashback: 4 },
          { id: 'airtel_d4', data: '500MB', duration: '1 Day', price: 300, cashback: 6 },
          { id: 'airtel_d5', data: '1GB', duration: '1 Day', price: 500, cashback: 10 },
          { id: 'airtel_d6', data: '2GB', duration: '1 Day', price: 800, cashback: 16 },
        ],
        Weekly: [
          { id: 'airtel_w1', data: '500MB', duration: '7 Days', price: 300, cashback: 6 },
          { id: 'airtel_w2', data: '1.5GB', duration: '7 Days', price: 500, cashback: 10 },
          { id: 'airtel_w3', data: '3GB', duration: '7 Days', price: 800, cashback: 16 },
          { id: 'airtel_w4', data: '4GB', duration: '7 Days', price: 1000, cashback: 20 },
          { id: 'airtel_w5', data: '6GB', duration: '7 Days', price: 1500, cashback: 30 },
          { id: 'airtel_w6', data: '11GB', duration: '7 Days', price: 2500, cashback: 50 },
        ],
        Monthly: [
          { id: 'airtel_m1', data: '2GB', duration: '30 Days', price: 1000, cashback: 20 },
          { id: 'airtel_m2', data: '5GB', duration: '30 Days', price: 1500, cashback: 30 },
          { id: 'airtel_m3', data: '7GB', duration: '30 Days', price: 2500, cashback: 50 },
          { id: 'airtel_m4', data: '11GB', duration: '30 Days', price: 3500, cashback: 70 },
          { id: 'airtel_m5', data: '22GB', duration: '30 Days', price: 5000, cashback: 100 },
          { id: 'airtel_m6', data: '45GB', duration: '30 Days', price: 8000, cashback: 160 },
        ],
        '2 Months': [
          { id: 'airtel_2m1', data: '16GB', duration: '60 Days', price: 4000, cashback: 80 },
          { id: 'airtel_2m2', data: '32GB', duration: '60 Days', price: 7000, cashback: 140 },
          { id: 'airtel_2m3', data: '55GB', duration: '60 Days', price: 10000, cashback: 200 },
          { id: 'airtel_2m4', data: '80GB', duration: '60 Days', price: 13000, cashback: 260 },
          { id: 'airtel_2m5', data: '110GB', duration: '60 Days', price: 16000, cashback: 320 },
          { id: 'airtel_2m6', data: '160GB', duration: '60 Days', price: 20000, cashback: 400 },
        ],
        '3 Months': [
          { id: 'airtel_3m1', data: '32GB', duration: '90 Days', price: 7500, cashback: 150 },
          { id: 'airtel_3m2', data: '55GB', duration: '90 Days', price: 10000, cashback: 200 },
          { id: 'airtel_3m3', data: '80GB', duration: '90 Days', price: 13500, cashback: 270 },
          { id: 'airtel_3m4', data: '110GB', duration: '90 Days', price: 17000, cashback: 340 },
          { id: 'airtel_3m5', data: '160GB', duration: '90 Days', price: 22000, cashback: 440 },
          { id: 'airtel_3m6', data: '220GB', duration: '90 Days', price: 27000, cashback: 540 },
        ],
        Yearly: [
          { id: 'airtel_y1', data: '220GB', duration: '365 Days', price: 50000, cashback: 1000 },
          { id: 'airtel_y2', data: '450GB', duration: '365 Days', price: 80000, cashback: 1600 },
          { id: 'airtel_y3', data: '675GB', duration: '365 Days', price: 110000, cashback: 2200 },
          { id: 'airtel_y4', data: '900GB', duration: '365 Days', price: 140000, cashback: 2800 },
          { id: 'airtel_y5', data: '1.1TB', duration: '365 Days', price: 170000, cashback: 3400 },
          { id: 'airtel_y6', data: '1.6TB', duration: '365 Days', price: 200000, cashback: 4000 },
        ],
      },
    },
    '9mobile': {
      id: '9mobile',
      name: '9Mobile',
      icon: 'phone-portrait',
      plans: {
        Daily: [
          { id: '9mobile_d1', data: '25MB', duration: '1 Day', price: 50, cashback: 1 },
          { id: '9mobile_d2', data: '100MB', duration: '1 Day', price: 100, cashback: 2 },
          { id: '9mobile_d3', data: '250MB', duration: '1 Day', price: 200, cashback: 4 },
          { id: '9mobile_d4', data: '500MB', duration: '1 Day', price: 300, cashback: 6 },
          { id: '9mobile_d5', data: '1GB', duration: '1 Day', price: 500, cashback: 10 },
          { id: '9mobile_d6', data: '2GB', duration: '1 Day', price: 800, cashback: 16 },
        ],
        Weekly: [
          { id: '9mobile_w1', data: '500MB', duration: '7 Days', price: 300, cashback: 6 },
          { id: '9mobile_w2', data: '1GB', duration: '7 Days', price: 500, cashback: 10 },
          { id: '9mobile_w3', data: '2.5GB', duration: '7 Days', price: 800, cashback: 16 },
          { id: '9mobile_w4', data: '4GB', duration: '7 Days', price: 1000, cashback: 20 },
          { id: '9mobile_w5', data: '5.5GB', duration: '7 Days', price: 1500, cashback: 30 },
          { id: '9mobile_w6', data: '10.5GB', duration: '7 Days', price: 2500, cashback: 50 },
        ],
        Monthly: [
          { id: '9mobile_m1', data: '1.5GB', duration: '30 Days', price: 1000, cashback: 20 },
          { id: '9mobile_m2', data: '4GB', duration: '30 Days', price: 1500, cashback: 30 },
          { id: '9mobile_m3', data: '7GB', duration: '30 Days', price: 2500, cashback: 50 },
          { id: '9mobile_m4', data: '10GB', duration: '30 Days', price: 3500, cashback: 70 },
          { id: '9mobile_m5', data: '20GB', duration: '30 Days', price: 5000, cashback: 100 },
          { id: '9mobile_m6', data: '40GB', duration: '30 Days', price: 8000, cashback: 160 },
        ],
        '2 Months': [
          { id: '9mobile_2m1', data: '15GB', duration: '60 Days', price: 4000, cashback: 80 },
          { id: '9mobile_2m2', data: '30GB', duration: '60 Days', price: 7000, cashback: 140 },
          { id: '9mobile_2m3', data: '50GB', duration: '60 Days', price: 10000, cashback: 200 },
          { id: '9mobile_2m4', data: '75GB', duration: '60 Days', price: 13000, cashback: 260 },
          { id: '9mobile_2m5', data: '100GB', duration: '60 Days', price: 16000, cashback: 320 },
          { id: '9mobile_2m6', data: '150GB', duration: '60 Days', price: 20000, cashback: 400 },
        ],
        '3 Months': [
          { id: '9mobile_3m1', data: '30GB', duration: '90 Days', price: 7500, cashback: 150 },
          { id: '9mobile_3m2', data: '50GB', duration: '90 Days', price: 10000, cashback: 200 },
          { id: '9mobile_3m3', data: '75GB', duration: '90 Days', price: 13500, cashback: 270 },
          { id: '9mobile_3m4', data: '100GB', duration: '90 Days', price: 17000, cashback: 340 },
          { id: '9mobile_3m5', data: '150GB', duration: '90 Days', price: 22000, cashback: 440 },
          { id: '9mobile_3m6', data: '200GB', duration: '90 Days', price: 27000, cashback: 540 },
        ],
        Yearly: [
          { id: '9mobile_y1', data: '200GB', duration: '365 Days', price: 50000, cashback: 1000 },
          { id: '9mobile_y2', data: '400GB', duration: '365 Days', price: 80000, cashback: 1600 },
          { id: '9mobile_y3', data: '600GB', duration: '365 Days', price: 110000, cashback: 2200 },
          { id: '9mobile_y4', data: '800GB', duration: '365 Days', price: 140000, cashback: 2800 },
          { id: '9mobile_y5', data: '1TB', duration: '365 Days', price: 170000, cashback: 3400 },
          { id: '9mobile_y6', data: '1.5TB', duration: '365 Days', price: 200000, cashback: 4000 },
        ],
      },
    },
  };

  // Exporting the JSDoc-defined types as descriptions for reference
export const ServiceProvider = undefined;
export const TimePeriod = undefined;
export const { mtn, glo, airtel } = serviceProviders;
