import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEvent } from '@/services/supabaseEvents';
import { Event } from '@/models/Event';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client'; // Import supabase client for storage

// --- Zod Schema Update --- 
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

const eventSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  description: z.string().optional(),
  start_time: z.string().refine((val) => !isNaN(Date.parse(val)), { 
    message: "Invalid start date/time format. Use YYYY-MM-DDTHH:MM" 
  }),
  end_time: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid end date/time format. Use YYYY-MM-DDTHH:MM"
  }),
  location: z.string().optional(),
  // Changed from image_url string to image_file FileList
  image_file: z.instanceof(FileList)
    .optional()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    ),
});

// Infer the type from the schema
type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSuccess?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSuccess }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting }
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      start_time: '',
      end_time: '',
      location: '',
      image_file: undefined, // Default value for file input
    }
  });

  const mutation = useMutation({
    mutationFn: addEvent,
    onSuccess: (newEvent) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      reset();
      setServerError(null);
      onSuccess?.();
      toast.success("Event Added Successfully!", {
        description: `"${newEvent.title}" has been added to the calendar.`,
      });
    },
    onError: (error) => {
      setServerError(error.message);
      console.error('Error in mutation process:', error);
      toast.error("Failed to Add Event", {
        description: error.message || "An unexpected error occurred.",
      });
    },
  });

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    setServerError(null);
    let imageUrl: string | undefined = undefined;
    const imageFile = data.image_file?.[0];

    // 1. Handle Image Upload (if file exists)
    if (imageFile) {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `public/${fileName}`; // Store in a 'public' folder within the bucket

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('event-images') // Use the bucket name
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        // Get Public URL
        const { data: urlData } = supabase.storage
          .from('event-images')
          .getPublicUrl(filePath);
        
        if (!urlData?.publicUrl) {
          throw new Error('Could not get public URL for uploaded image.');
        }
        imageUrl = urlData.publicUrl;

      } catch (uploadError: any) {
        console.error("Image Upload Error:", uploadError);
        toast.error("Image Upload Failed", { description: uploadError.message });
        setServerError(uploadError.message); // Show error near form
        return; // Stop submission if upload fails
      }
    }

    // 2. Prepare data for addEvent mutation
    const submissionData: Omit<Event, 'id' | 'created_at' | 'is_google_calendar_event' | 'google_calendar_id'> = {
      title: data.title,
      description: data.description || undefined,
      start_time: new Date(data.start_time).toISOString(), 
      end_time: data.end_time ? new Date(data.end_time).toISOString() : undefined,
      location: data.location || undefined,
      image_url: imageUrl, // Use the uploaded image URL (or undefined)
    };

    // 3. Execute the mutation to add event data to the database
    mutation.mutate(submissionData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Event</CardTitle>
        <CardDescription>Fill in the details for the new event.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" {...register('title')} placeholder="e.g., Python Workshop" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_time">Start Date & Time</Label>
              <Input id="start_time" type="datetime-local" {...register('start_time')} />
              {errors.start_time && <p className="text-red-500 text-sm mt-1">{errors.start_time.message}</p>}
            </div>
            <div>
              <Label htmlFor="end_time">End Date & Time (Optional)</Label>
              <Input id="end_time" type="datetime-local" {...register('end_time')} />
               {errors.end_time && <p className="text-red-500 text-sm mt-1">{errors.end_time.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location (Optional)</Label>
            <Input id="location" {...register('location')} placeholder="e.g., Enarson Classroom Building 100" />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" {...register('description')} placeholder="Details about the event..." />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="image_file">Event Image (Optional, Max 5MB)</Label>
            <Input 
              id="image_file" 
              type="file" 
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif" 
              {...register('image_file')} 
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
            />
            {errors.image_file && <p className="text-red-500 text-sm mt-1">{errors.image_file.message}</p>}
          </div>

          {serverError && <p className="text-red-500 text-sm mt-1">Error: {serverError}</p>}

          <Button type="submit" disabled={isSubmitting || mutation.isPending} className="w-full">
            {isSubmitting || mutation.isPending ? 'Processing...' : 'Add Event'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm; 