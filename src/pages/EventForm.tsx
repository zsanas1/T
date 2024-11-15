import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';
import InputField from '../components/forms/InputField';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string(),
  time: z.string(),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  bannerUrl: z.string().url('Please enter a valid image URL'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
});

type EventForm = z.infer<typeof eventSchema>;

export default function EventForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (data: EventForm) => api.post('/events', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
        toast.success('Event created successfully');
        navigate('/events');
      },
      onError: () => {
        toast.error('Failed to create event');
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
      <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
        <InputField
          label="Title"
          {...register('title')}
          error={errors.title?.message}
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Date"
            type="date"
            {...register('date')}
            error={errors.date?.message}
          />
          <InputField
            label="Time"
            type="time"
            {...register('time')}
            error={errors.time?.message}
          />
        </div>
        <InputField
          label="Location"
          {...register('location')}
          error={errors.location?.message}
        />
        <InputField
          label="Banner Image URL"
          {...register('bannerUrl')}
          error={errors.bannerUrl?.message}
        />
        <InputField
          label="Capacity"
          type="number"
          {...register('capacity', { valueAsNumber: true })}
          error={errors.capacity?.message}
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}