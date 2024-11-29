import { Collection, ObjectId } from 'mongodb';
import { Flight, FlightModel } from "./type.ts";
import { fromModelToFlight } from "./utils.ts";

export const resolvers = {
    Query: {
        flights: async (
            _: unknown,
            __: unknown,
            context: { FlightCollection: Collection<FlightModel> },
        ): Promise<Flight[]> => {
            const flightsModel = await context.FlightCollection.find().toArray();
            return flightsModel.map((flightModel) =>
              fromModelToFlight(flightModel)
            );
        },
        flight: async (
            _: unknown,
            { id }: { id: string },
            context: { FlightCollection: Collection<FlightModel> },
        ): Promise<Flight | null> => {
            const flightModel = await context.FlightCollection.findOne({
                _id: new ObjectId(id),
            });

            if (!flightModel) {
                return null;
            }

            return fromModelToFlight(flightModel);
        }
    },
    Mutation: {
        addFlight: async (
            _: unknown,
            args: { origin: string; destination: string; timeDate: string },
            context: { FlightCollection: Collection<FlightModel> }, 
        ): Promise<Flight> => {
            const { origin, destination, timeDate } = args;
            const { insertedId } = await context.FlightCollection.insertOne({
                origin,
                destination,
                timeDate,
            });

            const flightModel = {
                _id: insertedId,
                origin,
                destination,
                timeDate,
            }

            return fromModelToFlight(flightModel);
        }
    }
}