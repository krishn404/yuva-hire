interface ApiResponse<T> {
  data?: T
  error?: string
}

class ApiClient {
  private token: string | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  }

  removeToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
      }

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`
      }

      const url = endpoint.startsWith("/api") ? endpoint : `/api${endpoint}`

      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || "An error occurred" }
      }

      return { data }
    } catch (error) {
      console.error("API request failed:", error)
      return { error: "Network error" }
    }
  }

  // Auth methods
  async register(userData: {
    email: string
    password: string
    name: string
    role: string
    college: string
    studentId?: string
    department?: string
  }) {
    return this.request<{ user: any; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async login(email: string, password: string) {
    return this.request<{ user: any; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async getMe() {
    return this.request<{ user: any }>("/auth/me")
  }

  // Job methods
  async getJobs(
    filters: {
      search?: string
      location?: string
      jobType?: string
      deadline?: string
      page?: number
      limit?: number
    } = {},
  ) {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString())
    })

    return this.request<{
      jobs: any[]
      pagination: { page: number; limit: number; total: number; totalPages: number }
    }>(`/jobs?${params.toString()}`)
  }

  async createJob(jobData: {
    title: string
    description: string
    location: string
    jobType: string
    salary: string
    salaryPeriod: string
    deadline: string
    requirements: string[]
  }) {
    return this.request<{ job: any }>("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    })
  }

  async updateJob(id: string, jobData: any) {
    return this.request<{ job: any }>(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(jobData),
    })
  }

  async deleteJob(id: string) {
    return this.request<{ message: string }>(`/jobs/${id}`, {
      method: "DELETE",
    })
  }

  // Application methods
  async applyToJob(jobId: string) {
    return this.request<{ application: any }>("/applications", {
      method: "POST",
      body: JSON.stringify({ jobId }),
    })
  }

  async getApplications() {
    return this.request<{ applications: any[] }>("/applications")
  }
}

export const apiClient = new ApiClient()
