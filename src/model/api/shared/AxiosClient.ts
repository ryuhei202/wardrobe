import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export const axiosClient = applyCaseMiddleware(axios.create());
