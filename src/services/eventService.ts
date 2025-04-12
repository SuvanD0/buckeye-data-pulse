
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/models/Event';

// Define the type for the data needed to create an event
type CreateEventData = Omit<Event, 'id' | 'created_at' | 'is_google_calendar_event' | 'google_calendar_id'>;

/**
 * Adds a new event to the Supabase events table.
 */
export const addEvent = async (eventData: CreateEventData): Promise<Event> => {
  // Verify user is authenticated before proceeding
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) {
    throw new Error('Authentication required to add events');
  }

  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        title: eventData.title,
        description: eventData.description,
        start_time: eventData.start_time,
        end_time: eventData.end_time || null,
        location: eventData.location,
        image_url: eventData.image_url || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding event:', error);
    throw new Error(`Failed to add event: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to add event: No data returned.');
  }

  return data as Event;
};

/**
 * Fetches all events from the database.
 */
export const fetchEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_time', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching events:', error);
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return data as Event[];
};

/**
 * Updates an existing event.
 */
export const updateEvent = async (eventId: string, eventData: Partial<CreateEventData>): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .update({
      title: eventData.title,
      description: eventData.description,
      start_time: eventData.start_time,
      end_time: eventData.end_time,
      location: eventData.location,
      image_url: eventData.image_url
    })
    .eq('id', eventId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    throw new Error(`Failed to update event: ${error.message}`);
  }

  return data as Event;
};

/**
 * Deletes an event.
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', eventId);

  if (error) {
    console.error('Error deleting event:', error);
    throw new Error(`Failed to delete event: ${error.message}`);
  }
};
