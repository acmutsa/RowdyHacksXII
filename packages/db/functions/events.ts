import { db, asc, desc, eq, type InferInsertModel } from "..";
import { events } from "../schema";

type EventInsertType = InferInsertModel<typeof events>;
type EventEditType = Omit<EventInsertType, "id">;

interface GetAllEventsOptions {
	descending?: boolean;
}

export function createNewEvent(event: EventInsertType) {
	return db
		.insert(events)
		.values({
			...event,
		})
		.returning({
			eventID: events.id,
		});
}

export function getAllEvents(options?: GetAllEventsOptions) {
	const orderByClause = options?.descending
		? [desc(events.startTime)]
		: [asc(events.startTime)];

	return db.query.events.findMany({
		orderBy: orderByClause,
	});
}

export async function getEventById(eventId: number) {
	return db.query.events.findFirst({ where: eq(events.id, eventId) });
}

export async function editEvent(eventId: number, options: EventEditType) {
	return db.update(events).set(options).where(eq(events.id, eventId));
}
export async function deleteEvent(eventId: number) {
	return db.delete(events).where(eq(events.id, eventId));
}
