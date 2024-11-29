import { Flight, FlightModel } from "./type.ts";

export const fromModelToFlight = (flightModel: FlightModel): Flight => {
    return {
        id: flightModel._id!.toString(),
        origin: flightModel.origin,
        destination: flightModel.destination,
        timeDate: flightModel.timeDate
    }
}