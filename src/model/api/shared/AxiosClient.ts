import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export const AxiosClient = applyCaseMiddleware(axios.create());
