export interface Event {
  id: string;
  title: string;
  start_time: string;
  end_time?: string;
  description: string;
  location: string;
  image_url?: string;
  created_at: string;
  is_google_calendar_event?: boolean;
  google_calendar_id?: string;
}
