export interface Profile {
  id: string
  email: string | null
}

export interface Service {
  id: string
  name: string
  description: string | null
  price: number
}

export interface Order {
  id: string
  user_id: string
  service_id: string
  status: 'pending' | 'scheduled' | 'completed'
  scheduled_date: string | null
  created_at: string
}

// This handles the relational data structure returned by your Supabase joins
export interface OrderWithRelations {
  id: string
  status: 'pending' | 'scheduled' | 'completed'
  created_at: string
  profiles: {
    email: string
  } | null
  services: {
    name: string
    price: number
  } | null
}