const weatherCodeToString: {
  [key: number]: {
    icon: string;
    label: string;
  };
} = {
  0: {
    icon: "c01d",
    label: "Klarer Himmel",
  },
  1: {
    icon: "c02d",
    label: "Hauptsächlich klar",
  },
  2: {
    icon: "c03d",
    label: "Teilweise bewölkt",
  },
  3: {
    icon: "c04d",
    label: "Bedeckt",
  },
  45: {
    icon: "a05d",
    label: "Nebel",
  },
  48: {
    icon: "s05d",
    label: "Ablagerungsreifnebel",
  },
  51: {
    icon: "d01d",
    label: "Leichter Nieselregen",
  },
  53: {
    icon: "d02d",
    label: "Mäßiger Nieselregen",
  },
  55: {
    icon: "d03d",
    label: "Dichter Nieselregen",
  },
  56: {
    icon: "d01d",
    label: "Leichter Gefrier-Nieselregen",
  },
  57: {
    icon: "d03d",
    label: "Dichter Gefrier-Nieselregen",
  },
  61: {
    icon: "r01d",
    label: "Leichter Regen",
  },
  63: {
    icon: "r02d",
    label: "Mäßiger Regen",
  },
  65: {
    icon: "r03d",
    label: "Starker Regen",
  },
  66: {
    icon: "f01d",
    label: "Leichter Gefrierregen",
  },
  67: {
    icon: "r03d",
    label: "Starker Gefrierregen",
  },
  71: {
    icon: "s01d",
    label: "Leichter Schneefall",
  },
  73: {
    icon: "s02d",
    label: "Schneefall",
  },
  75: {
    icon: "s03d",
    label: "Starker Schneefall",
  },
  77: {
    icon: "s02d",
    label: "Schneekörner",
  },
  80: {
    icon: "r04d",
    label: "Leichter Regenschauer",
  },
  81: {
    icon: "r05d",
    label: "Regenschauer",
  },
  82: {
    icon: "r06d",
    label: "Starker Regenschauer",
  },
  85: {
    icon: "s01d",
    label: "Schneeschauer",
  },
  86: {
    icon: "s02d",
    label: "Starker Schneeschauer",
  },
  95: {
    icon: "t03d",
    label: "Gewitter",
  },
  96: {
    icon: "t04d",
    label: "Gewitter mit leichtem Hagel",
  },
  99: {
    icon: "t05d",
    label: "Gewitter mit starkem Hagel",
  },
};

export default weatherCodeToString;
