export default {
  // Utiliza babel-jest para transformar código JS y JSX
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // Ignora la transformación en node_modules
  transformIgnorePatterns: ["/node_modules/"],
};
