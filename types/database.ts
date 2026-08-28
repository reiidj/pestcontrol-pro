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
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled' 
  scheduled_date: string | null
  created_at: string
}

export interface OrderWithRelations {
  id: string
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled' 
  created_at: string
  scheduled_date: string | null
  profiles: { email: string } | null
  services: { name: string; price: number } | null
}

